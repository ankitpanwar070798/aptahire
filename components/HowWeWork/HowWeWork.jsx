"use client";
import styles from "./HowWeWork.module.scss";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

import TextSlideEffect from "../TextSlideEffect";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ autoRound: true, force3D: true });

const stepsData = [
  {
    img: "https://aptahire.ai/wp-content/uploads/2025/02/S1-1.png.webp",
    alt: "Pre-Interview Setup Made Easy",
    title: "Pre-Interview Setup Made Easy",
    description:
      "Generate job descriptions, get tailored interview questions, screen resumes, customize rounds, and automate scheduling, everything done by AI.",
  },
  {
    img: "https://aptahire.ai/wp-content/uploads/2025/02/S2.png.webp",
    alt: "Automated Resume Screening & Interview Scheduling",
    title: "Automated Resume Screening & Interview Scheduling",
    description:
      "Using Algorithms Aptahire screens resumes to find the best candidates and automatically schedules interviews based on availability, saving you hours of coordination.",
  },
  {
    img: "https://aptahire.ai/wp-content/uploads/2025/02/S3.png.webp",
    alt: "Let AI Interview for You",
    title: "Let AI Interview for You",
    description:
      "Let Aptahire’s AI handle interviews; asking tailored questions, analyzing responses, spotting inconsistencies, and recording everything for a seamless candidate experience.",
  },
  {
    img: "https://aptahire.ai/wp-content/uploads/2025/02/S4.png.webp",
    alt: "Get AI-Powered Insights for Smarter Hiring",
    title: "Get AI-Powered Insights for Smarter Hiring",
    description:
      "After the interview, receive detailed feedback, key insights, video recordings, and AI analysis, helping you make data-backed hiring decisions with confidence.",
  },
];

const HowWeWork = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const stepsRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTriggersRef = useRef([]);

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 1000);
  };

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Animate steps
  useGSAP(
    () => {
      if (!stepsRef.current) return;

      const steps = stepsRef.current.querySelectorAll(
        `.${styles.how_we_work_step}`
      );
      gsap.set(steps, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: stepsRef.current,
        start: "top 75%",
        once: true,
        animation: gsap.to(steps, {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: -0.1,
          ease: "none",
        }),
      });
    },
    { scope: stepsRef }
  );

  // Step tracking with cards
  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!container || !header || !cards) return;

    if (!isMobile) {
      const mainTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        endTrigger: cards,
        end: "bottom bottom",
        pin: header,
        pinSpacing: false,
        anticipatePin: 1,
        pinType: "fixed"
      });
      scrollTriggersRef.current.push(mainTrigger);

      const cardElements = cards.querySelectorAll(
        `.${styles.how_we_work_card}`
      );

      cardElements.forEach((card, index) => {
        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
          onLeave: () => {
            if (index < cardElements.length - 1) {
              setActiveStep(index + 1);
            }
          },
          onLeaveBack: () => {
            if (index > 0) {
              setActiveStep(index - 1);
            }
          },
        });
        scrollTriggersRef.current.push(cardTrigger);
      });
    }

    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [isMobile]);

  return (
    <div className={styles.how_we_work} ref={containerRef}>
      {/* LEFT HEADER */}
      <div className={styles.how_we_work_header} ref={headerRef}>
        <div className={styles.container}>
          <div className={styles.how_we_work_header_content}>
            <div className={styles.how_we_work_header_callout}>
              <TextSlideEffect delay={0.1}>
                <p>AI Recruiting Process</p>
              </TextSlideEffect>
            </div>
            <TextSlideEffect delay={0.15}>
              <h3>
                From first sketches to final details, our process is shaped to
                bring clarity and rhythm
              </h3>
            </TextSlideEffect>
            <div className={styles.how_we_work_steps} ref={stepsRef}>
              {stepsData.map((_, idx) => (
                <div
                  key={idx}
                  className={`${styles.how_we_work_step} ${
                    activeStep === idx ? styles.active : ""
                  }`}
                >
                  <p className={styles.how_we_work_step_label}>Step</p>
                  <p className={styles.how_we_work_step_index}>{idx + 1}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT CARDS */}
      <div className={styles.how_we_work_cards} ref={cardsRef}>
        {stepsData.map((step, idx) => (
          <div key={idx} className={styles.how_we_work_card}>
            <div className={styles.how_we_work_card_img}>
              <Image
                src={step.img}
                alt={step.alt}
                fill
                sizes="(max-width: 1000px) 100vw, 50vw"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </div>
            <div className={styles.how_we_work_card_copy}>
              <div className={styles.how_we_work_card_index_label}>
                <h3>{step.title}</h3>
              </div>
              <p className={styles.md}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowWeWork;
