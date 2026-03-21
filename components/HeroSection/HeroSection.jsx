"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import styles from "./HeroSection.module.scss";
import AnimatedButton from "../AnimatedButton/AnimatedButton";
import { useViewTransition } from "../../hooks/useViewTransition";

gsap.registerPlugin(SplitText);

const SCORES = [
  { label: "Communication", value: 84 },
  { label: "Technical Depth", value: 71 },
  { label: "Problem Solving", value: 89 },
];

const QUESTIONS = [
  "How would you architect a system for 10M concurrent users?",
  "Describe a critical production incident you have resolved.",
  "How do you balance engineering speed vs. code quality?",
  "Walk me through your approach to code reviews.",
];

const HeroSection = () => {
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subRef = useRef(null);
  const ctasRef = useRef(null);
  const statsRef = useRef(null);
  const cardRef = useRef(null);
  const floatingBadgeRef = useRef(null);
  const scoreFillRefs = useRef([]);
  const questionChipRef = useRef(null);
  const questionTextRef = useRef(null);
  const qIntervalRef = useRef(null);

  const { navigateWithTransition } = useViewTransition();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states via JS so CSS doesn't need to know about animation
      gsap.set(badgeRef.current, { opacity: 0, y: 18 });
      gsap.set([line1Ref.current, line2Ref.current], { y: "110%" });
      gsap.set(subRef.current, { opacity: 0, y: 18 });
      gsap.set(ctasRef.current, { opacity: 0, y: 18 });
      gsap.set(statsRef.current, { opacity: 0, y: 18 });
      gsap.set(cardRef.current, { opacity: 0, x: 36, y: 16 });
      gsap.set(floatingBadgeRef.current, { opacity: 0, scale: 0.78 });
      gsap.set(scoreFillRefs.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(questionChipRef.current, { opacity: 0, y: 10 });

      // Main entrance timeline
      const tl = gsap.timeline();

      tl.to(badgeRef.current,       { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, 0.25)
        .to([line1Ref.current, line2Ref.current], { y: "0%", duration: 0.9, stagger: 0.13, ease: "power4.out" }, 0.42)
        .to(subRef.current,         { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0.82)
        .to(ctasRef.current,        { opacity: 1, y: 0, duration: 0.6,  ease: "power3.out" }, 0.94)
        .to(statsRef.current,       { opacity: 1, y: 0, duration: 0.6,  ease: "power3.out" }, 1.04)
        .to(cardRef.current,        { opacity: 1, x: 0, y: 0, duration: 0.9, ease: "power3.out" }, 0.5)
        .to(floatingBadgeRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, 1.08)
        .to(scoreFillRefs.current,  { scaleX: 1, duration: 1.05, stagger: 0.14, ease: "power3.out" }, 1.22)
        .to(questionChipRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, 1.38);

      // Continuous idle float — card and badge breathe independently
      gsap.to(cardRef.current, {
        y: -10, duration: 3.8, ease: "sine.inOut",
        yoyo: true, repeat: -1, delay: 1.5,
      });
      gsap.to(floatingBadgeRef.current, {
        y: -7, duration: 2.9, ease: "sine.inOut",
        yoyo: true, repeat: -1, delay: 2.0,
      });

      // Cycle interview questions
      gsap.delayedCall(2.4, () => {
        let qIndex = 0;
        const tick = () => {
          qIndex = (qIndex + 1) % QUESTIONS.length;
          if (!questionTextRef.current) return;
          gsap.to(questionTextRef.current, {
            opacity: 0, y: -4, duration: 0.22, ease: "power2.in",
            onComplete: () => {
              if (questionTextRef.current) {
                questionTextRef.current.textContent = QUESTIONS[qIndex];
              }
              gsap.to(questionTextRef.current, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
            },
          });
        };
        qIntervalRef.current = setInterval(tick, 3500);
      });
    });

    return () => {
      ctx.revert();
      if (qIntervalRef.current) clearInterval(qIntervalRef.current);
    };
  }, []);

  return (
    <section className={styles.hero}>
      {/* Background layers */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.glow} />
        <div className={styles.grid} />
        <div className={styles.noise} />
      </div>
      <div className={styles.bottomFade} aria-hidden="true" />

      <div className={styles.content}>
        {/* ── LEFT COLUMN ── */}
        <div className={styles.left}>

          <div className={styles.badge} ref={badgeRef}>
            <span className={styles.dot} />
            AI-Powered Hiring Platform
          </div>

          <h1 className={styles.headline} ref={headlineRef}>
            <span className={styles.lineWrap}>
              <span ref={line1Ref}>Hire <em>Smarter</em>.</span>
            </span>
            <span className={styles.lineWrap}>
              <span ref={line2Ref}>Interview at Scale.</span>
            </span>
          </h1>

          <p className={styles.sub} ref={subRef}>
            Automate screening, scheduling &amp; AI interviews —
            cut hiring costs by <strong>75%</strong> and fill roles <strong>10× faster</strong>.
          </p>

          <div className={styles.ctas} ref={ctasRef}>
            <AnimatedButton label="Start for free" route="/connect" animate={false} />
            <button
              className={styles.ghostBtn}
              onClick={() => navigateWithTransition("/features")}
            >
              See how it works
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className={styles.statsRow} ref={statsRef}>
            <div className={styles.stat}>
              <span className={styles.statNum}>10×</span>
              <span className={styles.statLabel}>Faster hiring</span>
            </div>
            <span className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>75%</span>
              <span className={styles.statLabel}>Cost reduction</span>
            </div>
            <span className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>500+</span>
              <span className={styles.statLabel}>Companies</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN — Live Interview Card ── */}
        <div className={styles.right}>
          <div className={styles.card} ref={cardRef}>

            {/* Card header */}
            <div className={styles.cardHeader}>
              <div className={styles.livePill}>
                <span className={styles.liveDot} />
                Live
              </div>
              <span className={styles.cardTitle}>AI Interview Session</span>
              <span className={styles.timer}>14:32</span>
            </div>

            {/* Candidate row */}
            <div className={styles.candidate}>
              <div className={styles.avatar}>SC</div>
              <div className={styles.candidateInfo}>
                <p className={styles.candidateName}>Sarah Chen</p>
                <p className={styles.candidateRole}>Senior Frontend Engineer</p>
              </div>
              <div className={styles.waveform} aria-hidden="true">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={styles.bar}
                    style={{
                      animationDelay: `${(i * 0.07).toFixed(2)}s`,
                      animationDuration: `${(0.45 + (i % 4) * 0.13).toFixed(2)}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* AI score bars */}
            <div className={styles.scoresSection}>
              <p className={styles.scoresHeader}>AI Analysis</p>
              {SCORES.map((item, i) => (
                <div key={item.label} className={styles.scoreRow}>
                  <span className={styles.scoreLabel}>{item.label}</span>
                  <div className={styles.scoreTrack}>
                    <div
                      className={styles.scoreFill}
                      ref={(el) => el && (scoreFillRefs.current[i] = el)}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                  <span className={styles.scoreVal}>{item.value}%</span>
                </div>
              ))}
            </div>

            {/* Card footer */}
            <div className={styles.cardFooter}>
              <span>✓ Auto-transcribed</span>
              <span>✓ Bias-free scoring</span>
              <span>✓ GDPR compliant</span>
            </div>
          </div>

          {/* Floating "interviews today" badge */}
          <div className={styles.floatingBadge} ref={floatingBadgeRef}>
            <span className={styles.badgeNum}>128</span>
            <span className={styles.badgeLabel}>Interviews today</span>
          </div>

          {/* AI question chip — cycles live interview questions */}
          <div className={styles.questionChip} ref={questionChipRef}>
            <span className={styles.questionChipLabel}>
              <span className={styles.aiDot} />
              Aptahire AI is asking
            </span>
            <p className={styles.questionText} ref={questionTextRef}>
              {QUESTIONS[0]}
            </p>
            <span className={styles.cursor} aria-hidden="true" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
