"use client";
import styles from "./FeaturesSection.module.scss";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TextSlideEffect from "../TextSlideEffect";
import {
  RiRobot2Line,
  RiFilterLine,
  RiCalendar2Line,
  RiBarChartBoxLine,
  RiGroupLine,
  RiLinkM,
  RiShieldCheckLine,
  RiFlashlightLine,
} from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: RiRobot2Line,
    title: "AI Video Interviews",
    description:
      "Conduct automated, bias-free video interviews at scale. Our AI evaluates communication, confidence, and technical skills — 24/7 without a recruiter present.",
    tag: "Core",
    size: "large",
  },
  {
    icon: RiFilterLine,
    title: "Smart Shortlisting",
    description:
      "Rank applicants by fit score in seconds. AI scans resumes, cover letters, and assessments to surface your top candidates automatically.",
    tag: "Automation",
    size: "small",
  },
  {
    icon: RiCalendar2Line,
    title: "Auto Scheduling",
    description:
      "Eliminate back-and-forth email chains. Aptahire syncs with your calendar and automatically proposes slots that work for both sides.",
    tag: "Productivity",
    size: "small",
  },
  {
    icon: RiBarChartBoxLine,
    title: "Analytics Dashboard",
    description:
      "Track your entire hiring funnel — conversion rates, time-to-hire, drop-off points, and diversity metrics — in one real-time dashboard.",
    tag: "Insights",
    size: "medium",
  },
  {
    icon: RiFlashlightLine,
    title: "Instant Assessments",
    description:
      "Send role-specific coding tests, aptitude quizzes, and situational judgement scenarios. Auto-graded and ready in minutes.",
    tag: "Evaluation",
    size: "medium",
  },
  {
    icon: RiShieldCheckLine,
    title: "Anti-Cheat Proctoring",
    description:
      "AI-powered proctoring monitors eye movement, tab switching, and audio anomalies — ensuring every assessment reflects genuine ability.",
    tag: "Trust",
    size: "small",
  },
  {
    icon: RiGroupLine,
    title: "Bulk Hiring Ready",
    description:
      "Running a campus drive or mass recruitment? Process thousands of candidates simultaneously without extra cost or setup.",
    tag: "Scale",
    size: "small",
  },
  {
    icon: RiLinkM,
    title: "ATS Integration",
    description:
      "Plug directly into Greenhouse, Lever, Workday, and 50+ other tools. Your workflow stays intact — Aptahire just supercharges it.",
    tag: "Integrations",
    size: "small",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(`.${styles.feature_card}`);

      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: {
            each: 0.1,
            from: "start",
          },
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 68%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section className={styles.features_section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <TextSlideEffect>
            <p className={styles.label}>What we offer</p>
          </TextSlideEffect>
          <TextSlideEffect delay={0.1}>
            <h2>Everything you need to hire smarter</h2>
          </TextSlideEffect>
          <TextSlideEffect delay={0.15}>
            <p className={styles.subtitle}>
              A complete AI-powered hiring stack — from first application to final offer.
              No clunky integrations. No learning curve.
            </p>
          </TextSlideEffect>
        </div>

        <div className={styles.features_grid}>
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className={`${styles.feature_card} ${styles[`size_${feature.size}`]}`}
                style={{ opacity: 0 }}
              >
                <div className={styles.card_inner}>
                  <div className={styles.card_top}>
                    <div className={styles.icon_wrap}>
                      <Icon size={22} />
                    </div>
                    <span className={styles.tag}>{feature.tag}</span>
                  </div>
                  <h3 className={styles.card_title}>{feature.title}</h3>
                  <p className={styles.card_desc}>{feature.description}</p>
                </div>
                <div className={styles.card_glow} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
