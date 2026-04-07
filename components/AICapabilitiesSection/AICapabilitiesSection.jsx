"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AICapabilitiesSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  {
    id: "analysis",
    num: "01",
    title: "Real-time Voice Analysis",
    desc: "AI processes vocal tone, pacing, and clarity as the interview unfolds — flagging hesitation, confidence spikes, and emotional shifts in real time.",
    panel: {
      tag: "Live Analysis",
      label: "Candidate: Sarah Chen",
      metrics: [
        { name: "Confidence", val: 87, color: "#5CBC79" },
        { name: "Clarity", val: 91, color: "#5CBC79" },
        { name: "Engagement", val: 78, color: "#8DD4A0" },
        { name: "Hesitation", val: 14, color: "#3DA55A", invert: true },
      ],
      tags: ["Positive tone", "Strong delivery", "On-topic"],
    },
  },
  {
    id: "questions",
    num: "02",
    title: "Smart Question Generation",
    desc: "Aptahire AI reads your job description and auto-generates role-specific, adaptive interview questions — adjusting in real time based on candidate responses.",
    panel: {
      tag: "AI is generating",
      label: "Frontend Engineer — Round 2",
      prompts: [
        "How do you approach micro-frontend architecture in large teams?",
        "Walk me through how you would optimize LCP for a Next.js app.",
        "Describe a time you had to refactor a critical production module.",
      ],
    },
  },
  {
    id: "scoring",
    num: "03",
    title: "Bias-Free Scoring",
    desc: "Multi-dimensional scoring across technical depth, communication, and culture fit — with anonymized evaluation to eliminate unconscious bias entirely.",
    panel: {
      tag: "Evaluation Report",
      label: "Overall fit score: 91/100",
      dimensions: [
        { name: "Technical Depth", val: 88 },
        { name: "Communication", val: 92 },
        { name: "Problem Solving", val: 95 },
        { name: "Culture Fit", val: 84 },
      ],
      badge: "Bias Risk: Low",
    },
  },
  {
    id: "report",
    num: "04",
    title: "Instant Hiring Reports",
    desc: "Full candidate reports are ready seconds after the interview ends — complete with transcript, video highlights, AI scores, and a hiring recommendation.",
    panel: {
      tag: "Report Ready",
      label: "Sarah Chen · Frontend Engineer",
      summary: [
        { k: "Duration", v: "28 min" },
        { k: "Questions covered", v: "12 / 12" },
        { k: "AI Recommendation", v: "Strong Hire" },
        { k: "Transcript", v: "Available" },
      ],
      highlight: "Strong Hire",
    },
  },
];

export default function AICapabilitiesSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);
  const panelRef = useRef(null);
  const autoRef = useRef(null);

  const switchTab = (idx) => {
    if (!panelRef.current) return;
    gsap.to(panelRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.18,
      ease: "power2.in",
      onComplete: () => {
        setActive(idx);
        gsap.to(panelRef.current, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
      },
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headerRef.current, listRef.current, panelRef.current], { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 72%",
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" })
            .to(listRef.current,   { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0.15)
            .to(panelRef.current,  { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0.22);
        },
      });
    }, sectionRef);

    // Auto-cycle tabs every 4 seconds
    autoRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % CAPABILITIES.length);
    }, 4000);

    return () => {
      ctx.revert();
      clearInterval(autoRef.current);
    };
  }, []);

  // Reset auto-cycle timer when user manually clicks
  const handleTabClick = (i) => {
    clearInterval(autoRef.current);
    switchTab(i);
    autoRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % CAPABILITIES.length;
        switchTab(next);
        return prev; // state set via switchTab's onComplete
      });
    }, 4000);
  };

  const cap = CAPABILITIES[active];

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Subtle grid overlay */}
      <div className={styles.gridBg} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ── HEADER ── */}
        <div className={styles.header} ref={headerRef}>
          <span className={styles.eyebrow}>Powered by intelligence</span>
          <h2 className={styles.heading}>What the AI actually does</h2>
          <p className={styles.sub}>
            Every interview is analyzed across dozens of signal dimensions simultaneously —
            in real time, at any scale.
          </p>
        </div>

        {/* ── BODY ── */}
        <div className={styles.body}>
          {/* Left: capability tabs */}
          <div className={styles.list} ref={listRef}>
            {CAPABILITIES.map((c, i) => (
              <button
                key={c.id}
                className={`${styles.tab}${active === i ? ` ${styles.tabActive}` : ""}`}
                onClick={() => handleTabClick(i)}
                type="button"
              >
                <span className={styles.tabNum}>{c.num}</span>
                <span className={styles.tabContent}>
                  <span className={styles.tabTitle}>{c.title}</span>
                  {active === i && (
                    <span className={styles.tabDesc}>{c.desc}</span>
                  )}
                </span>
                {active === i && <div key={active} className={styles.tabBar} aria-hidden="true" />}
              </button>
            ))}
          </div>

          {/* Right: animated panel */}
          <div className={styles.panelWrap} ref={panelRef}>
            <div className={styles.panel}>
              {/* Panel header */}
              <div className={styles.panelHeader}>
                <div className={styles.winDots} aria-hidden="true">
                  <span /><span /><span />
                </div>
                <div className={styles.panelTitle}>
                  <span className={styles.panelTag}>{cap.panel.tag}</span>
                  <span className={styles.panelLabel}>{cap.panel.label}</span>
                </div>
              </div>

              {/* Panel body — varies by type */}
              <div className={styles.panelBody}>

                {/* Voice Analysis panel */}
                {cap.id === "analysis" && (
                  <div className={styles.analysisPanel}>
                    <div className={styles.waveRow} aria-hidden="true">
                      {Array.from({ length: 28 }).map((_, i) => (
                        <div
                          key={i}
                          className={styles.wavBar}
                          style={{
                            animationDelay: `${(i * 0.06).toFixed(2)}s`,
                            animationDuration: `${(0.5 + (i % 5) * 0.11).toFixed(2)}s`,
                            height: `${20 + (i % 7) * 9}%`,
                          }}
                        />
                      ))}
                    </div>
                    <div className={styles.metricRows}>
                      {cap.panel.metrics.map((m) => (
                        <div key={m.name} className={styles.metricRow}>
                          <span className={styles.metricName}>{m.name}</span>
                          <div className={styles.metricTrack}>
                            <div
                              className={styles.metricFill}
                              style={{
                                width: `${m.val}%`,
                                background: m.color,
                                opacity: m.invert ? 0.45 : 1,
                              }}
                            />
                          </div>
                          <span className={styles.metricVal}>{m.val}%</span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.tagRow}>
                      {cap.panel.tags.map((t) => (
                        <span key={t} className={styles.signalTag}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Question Generation panel */}
                {cap.id === "questions" && (
                  <div className={styles.questionsPanel}>
                    <span className={styles.genLabel}>
                      <span className={styles.blinkDot} />
                      Generating questions…
                    </span>
                    {cap.panel.prompts.map((q, i) => (
                      <div key={i} className={styles.promptCard}>
                        <span className={styles.promptNum}>Q{i + 1}</span>
                        <span className={styles.promptText}>{q}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Scoring panel */}
                {cap.id === "scoring" && (
                  <div className={styles.scoringPanel}>
                    <div className={styles.overallScore}>
                      <span className={styles.scoreBig}>{91}</span>
                      <span className={styles.scoreOf}>/100</span>
                    </div>
                    {cap.panel.dimensions.map((d) => (
                      <div key={d.name} className={styles.dimRow}>
                        <span className={styles.dimName}>{d.name}</span>
                        <div className={styles.dimTrack}>
                          <div
                            className={styles.dimFill}
                            style={{ width: `${d.val}%` }}
                          />
                        </div>
                        <span className={styles.dimVal}>{d.val}</span>
                      </div>
                    ))}
                    <div className={styles.biasBadge}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 6l3 3 5-5" stroke="#5CBC79" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {cap.panel.badge}
                    </div>
                  </div>
                )}

                {/* Report panel */}
                {cap.id === "report" && (
                  <div className={styles.reportPanel}>
                    <div className={styles.reportHighlight}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <path d="M9 2l2 5.5H17l-4.5 3.3 1.7 5.7L9 13.2l-5.2 3.3 1.7-5.7L1 7.5h6L9 2z" stroke="#5CBC79" strokeWidth="1.3" strokeLinejoin="round" />
                      </svg>
                      {cap.panel.highlight}
                    </div>
                    <div className={styles.summaryRows}>
                      {cap.panel.summary.map((row) => (
                        <div key={row.k} className={styles.summaryRow}>
                          <span className={styles.summaryKey}>{row.k}</span>
                          <span className={`${styles.summaryVal}${row.v === "Strong Hire" ? ` ${styles.summaryValAccent}` : ""}`}>{row.v}</span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.reportActions}>
                      <button className={styles.reportBtn} type="button">Download PDF</button>
                      <button className={styles.reportBtnGhost} type="button">Share Report</button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
