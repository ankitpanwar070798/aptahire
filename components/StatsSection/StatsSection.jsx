"use client";
import styles from "./StatsSection.module.scss";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TextSlideEffect from "../TextSlideEffect";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 75, suffix: "%", label: "Reduction in interview costs", description: "Cut your cost-per-hire dramatically with AI-driven automation" },
  { value: 10, suffix: "×", label: "Faster candidate screening", description: "Screen and shortlist hundreds of applicants in minutes, not weeks" },
  { value: 500, suffix: "+", label: "Companies onboarded", description: "Trusted by fast-growing startups and enterprise recruiters worldwide" },
  { value: 98, suffix: "%", label: "Candidate satisfaction rate", description: "Candidates rate our AI interview experience as fair and transparent" },
];

export default function StatsSection() {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(`.${styles.stat_card}`);

      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        }
      );

      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const stat = stats[i];
        const obj = { value: 0 };

        gsap.to(obj, {
          value: stat.value,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
          onUpdate() {
            el.textContent = Math.round(obj.value) + stat.suffix;
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className={styles.stats_section} ref={sectionRef}>
      <div className={styles.glow_top} />
      <div className={styles.container}>
        <div className={styles.header}>
          <TextSlideEffect>
            <p className={styles.label}>By the numbers</p>
          </TextSlideEffect>
          <TextSlideEffect delay={0.1}>
            <h2>Results that speak for themselves</h2>
          </TextSlideEffect>
        </div>
        <div className={styles.stats_grid}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.stat_card}>
              <div className={styles.stat_top}>
                <span
                  className={styles.stat_number}
                  ref={(el) => (numberRefs.current[i] = el)}
                >
                  0{stat.suffix}
                </span>
              </div>
              <div className={styles.stat_bottom}>
                <p className={styles.stat_label}>{stat.label}</p>
                <p className={styles.stat_description}>{stat.description}</p>
              </div>
              <div className={styles.stat_line} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
