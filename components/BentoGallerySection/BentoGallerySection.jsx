"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import styles from "./BentoGallerySection.module.scss";

gsap.registerPlugin(ScrollTrigger);

const BENTO_ITEMS = [
  {
    id: "a",
    label: "Tech Hiring",
    sublabel: "Engineering & Product teams",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=85&auto=format&fit=crop",
    alt: "Tech team collaboration",
    size: "large",
  },
  {
    id: "b",
    label: "Campus Recruitment",
    sublabel: "Scale to thousands of candidates",
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=700&q=85&auto=format&fit=crop",
    alt: "Campus recruitment event",
    size: "medium",
  },
  {
    id: "c",
    label: "Executive Search",
    sublabel: "Senior-level assessments",
    img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=85&auto=format&fit=crop",
    alt: "Executive boardroom meeting",
    size: "small",
  },
  {
    id: "d",
    label: "Remote Global Hiring",
    sublabel: "Hire anywhere, instantly",
    img: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=700&q=85&auto=format&fit=crop",
    alt: "Remote team video call",
    size: "medium",
  },
  {
    id: "e",
    label: "Volume Hiring",
    sublabel: "High-throughput recruiting",
    img: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&q=85&auto=format&fit=crop",
    alt: "Modern office HR team",
    size: "small",
  },
];

const STATS = [
  { value: "500+", label: "Companies hiring with Aptahire" },
  { value: "2M+", label: "Interviews conducted by AI" },
  { value: "75%", label: "Reduction in time-to-hire" },
];

export default function BentoGallerySection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(`.${styles.bento_card}`);
      gsap.set(cards, { opacity: 0, y: 44, scale: 0.96 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 78%",
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
      });

      const statEls = gsap.utils.toArray(`.${styles.stat_item}`);
      gsap.set(statEls, { opacity: 0, y: 24 });

      ScrollTrigger.create({
        trigger: `.${styles.stats_bar}`,
        start: "top 85%",
        onEnter: () => {
          gsap.to(statEls, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Industries We Serve</span>
          <h2>The hiring platform trusted across every industry</h2>
        </div>

        <div className={styles.bento_grid}>
          {BENTO_ITEMS.map((item) => (
            <div key={item.id} className={`${styles.bento_card} ${styles[`size_${item.size}`]}`}>
              <Image
                src={item.img}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div className={styles.card_overlay} />
              <div className={styles.card_content}>
                <span className={styles.card_label}>{item.label}</span>
                <span className={styles.card_sub}>{item.sublabel}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.stats_bar}>
          {STATS.map((s, i) => (
            <div key={i} className={styles.stat_item}>
              <span className={styles.stat_value}>{s.value}</span>
              <span className={styles.stat_label}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
