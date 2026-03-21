"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./MetricsSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  {
    value: 75,
    suffix: "%",
    label: "Cost Reduction",
    desc: "Average savings vs. traditional recruiting agencies",
    accent: false,
  },
  {
    value: 10,
    suffix: "×",
    label: "Faster Hiring",
    desc: "From application to offer, dramatically accelerated",
    accent: true,
  },
  {
    value: 94,
    suffix: "%",
    label: "Satisfaction",
    desc: "Interview satisfaction score from candidates worldwide",
    accent: false,
  },
];

const COMPARE = [
  { label: "Traditional Hiring", days: "32 days avg.", width: 85 },
  { label: "With Aptahire", days: "3.2 days avg.", fast: true, width: 8.5 },
];

export default function MetricsSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const metricRefs = useRef([]);
  const counterRefs = useRef([]);
  const barRefs = useRef([]);
  const compareRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { opacity: 0, y: 28 });
      gsap.set(metricRefs.current, { opacity: 0, y: 36 });
      gsap.set(compareRef.current, { opacity: 0, y: 24 });

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 82%",
        onEnter: () => {
          gsap.to(headerRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
        },
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 68%",
        onEnter: () => {
          gsap.to(metricRefs.current, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
          });

          METRICS.forEach((metric, i) => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: metric.value,
              duration: 1.8 + i * 0.2,
              ease: "power2.out",
              delay: 0.2 + i * 0.12,
              onUpdate() {
                if (counterRefs.current[i]) {
                  counterRefs.current[i].textContent =
                    Math.round(obj.val) + metric.suffix;
                }
              },
            });
          });

          gsap.to(compareRef.current, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", delay: 0.55 });
          gsap.to(barRefs.current[0], { width: "85%", duration: 1.6, ease: "power3.out", delay: 0.85 });
          gsap.to(barRefs.current[1], { width: "8.5%", duration: 1.1, ease: "power3.out", delay: 1.05 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>

        {/* Header */}
        <div className={styles.header} ref={headerRef}>
          <span className={styles.eyebrow}>Real Results. Measurable ROI.</span>
          <h2 className={styles.heading}>
            Numbers that speak<br />
            <em>for themselves</em>
          </h2>
        </div>

        {/* Metric cards */}
        <div className={styles.grid}>
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`${styles.card}${m.accent ? ` ${styles.cardAccent}` : ""}`}
              ref={(el) => el && (metricRefs.current[i] = el)}
            >
              <span
                className={styles.counter}
                ref={(el) => el && (counterRefs.current[i] = el)}
              >
                0{m.suffix}
              </span>
              <div className={styles.divider} />
              <p className={styles.metricLabel}>{m.label}</p>
              <p className={styles.metricDesc}>{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Timeline comparison */}
        <div className={styles.compare} ref={compareRef}>
          <span className={styles.compareTag}>Hiring Timeline Comparison</span>
          <div className={styles.compareRows}>
            {COMPARE.map((row, i) => (
              <div key={row.label} className={styles.compareRow}>
                <span className={`${styles.compareName}${row.fast ? ` ${styles.compareNameFast}` : ""}`}>
                  {row.label}
                </span>
                <div className={styles.barTrack}>
                  <div
                    className={`${styles.bar}${row.fast ? ` ${styles.barFast}` : ""}`}
                    ref={(el) => el && (barRefs.current[i] = el)}
                    style={{ width: 0 }}
                  />
                </div>
                <span className={`${styles.compareDays}${row.fast ? ` ${styles.compareDaysFast}` : ""}`}>
                  {row.days}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
