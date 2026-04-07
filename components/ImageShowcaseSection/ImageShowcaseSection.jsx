"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import styles from "./ImageShowcaseSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE_ITEMS = [
  {
    tag: "AI Video Interviews",
    title: "Conduct interviews at any scale — without a recruiter present",
    desc: "Our AI conducts structured video interviews 24/7, analyzing responses in real time. Get consistent, bias-free evaluations for every candidate, every time — while your team focuses on decisions, not scheduling.",
    img: "https://aptahire.ai/wp-content/uploads/2024/12/During-I.png.webp",
    alt: "Professional conducting AI video interview",
    stat: { value: "24/7", label: "Always-on interviewing" },
    reverse: false,
  },
  {
    tag: "Resume Intelligence",
    title: "Surface your top candidates in seconds, not days",
    desc: "AI scans thousands of applications, scores each one against your exact job requirements, and delivers a ranked shortlist before you finish your morning coffee. No more resume pile-ups.",
    img: "/assets/topcandidate.png",
    alt: "Smart candidate shortlisting with AI",
    stat: { value: "10×", label: "Faster than manual review" },
    reverse: true,
  },
  {
    tag: "Hiring Analytics",
    title: "Know exactly who to hire — backed by data, not gut feeling",
    desc: "Every interview generates a complete report: AI scores, video highlights, full transcript, and a clear hiring recommendation. Share with your entire team in one click, then decide confidently.",
    img: "https://aptahire.ai/wp-content/uploads/2024/12/Before-I.png.webp",
    alt: "Hiring analytics dashboard with insights",
    stat: { value: "94%", label: "Candidate satisfaction rate" },
    reverse: false,
  },
];

export default function ImageShowcaseSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray(`.${styles.row}`);
      rows.forEach((row) => {
        const imgWrap = row.querySelector(`.${styles.img_wrap}`);
        const content = row.querySelector(`.${styles.content}`);
        const stat = row.querySelector(`.${styles.stat_badge}`);

        gsap.set([imgWrap, content], { opacity: 0, y: 48 });
        if (stat) gsap.set(stat, { opacity: 0, scale: 0.85 });

        ScrollTrigger.create({
          trigger: row,
          start: "top 76%",
          onEnter: () => {
            gsap.to(imgWrap, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" });
            gsap.to(content, { opacity: 1, y: 0, duration: 1.0, delay: 0.14, ease: "power3.out" });
            if (stat) gsap.to(stat, { opacity: 1, scale: 1, duration: 0.55, delay: 0.55, ease: "back.out(1.7)" });
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Built Different</span>
          <h2>One platform. Every step of hiring, automated.</h2>
          <p className={styles.sub}>
            From the first application to the final offer — Aptahire handles the heavy lifting so your team can focus on what matters.
          </p>
        </div>

        {SHOWCASE_ITEMS.map((item, i) => (
          <div key={i} className={`${styles.row} ${item.reverse ? styles.reverse : ""}`}>
            <div className={styles.img_wrap}>
              <Image
                src={item.img}
                alt={item.alt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
              <div className={styles.img_tint} />
              {item.stat && (
                <div className={styles.stat_badge}>
                  <span className={styles.stat_value}>{item.stat.value}</span>
                  <span className={styles.stat_label}>{item.stat.label}</span>
                </div>
              )}
            </div>

            <div className={styles.content}>
              <span className={styles.tag}>
                <span className={styles.tag_dot} />
                {item.tag}
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className={styles.divider} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
