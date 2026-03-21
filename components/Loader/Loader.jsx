"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./Loader.module.scss";

const LETTERS = "APTAHIRE".split("");

const STATUS_MESSAGES = [
  "Initializing AI engine",
  "Loading candidate models",
  "Ready",
];

// SVG arc constants
const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const loaderRef = useRef(null);
  const letterRefs = useRef([]);
  const arcRef = useRef(null);
  const statusRef = useRef(null);
  const taglineRef = useRef(null);
  const wordmarkRef = useRef(null);
  const lineLeftRef = useRef(null);
  const lineRightRef = useRef(null);
  const ringRef = useRef(null);
  const centerRef = useRef(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(letterRefs.current, { opacity: 0, clipPath: "inset(0 0 100% 0)" });
      gsap.set(taglineRef.current, { opacity: 0 });
      gsap.set(statusRef.current, { opacity: 0 });
      gsap.set(lineLeftRef.current, { scaleX: 0, transformOrigin: "right center" });
      gsap.set(lineRightRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(ringRef.current, { opacity: 0, scale: 0.82 });
      if (arcRef.current) {
        arcRef.current.style.strokeDasharray = CIRCUMFERENCE;
        arcRef.current.style.strokeDashoffset = CIRCUMFERENCE;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(loaderRef.current, {
            y: "-100%",
            duration: 0.82,
            ease: "power4.in",
            onComplete: () => {
              if (document) document.body.style.overflow = "";
              setVisible(false);
            },
          });
        },
      });

      // Ring fades in
      tl.to(ringRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: "back.out(1.4)",
      }, 0.05)

      // Letters reveal via clip-path unmask
      .to(letterRefs.current, {
        opacity: 1,
        clipPath: "inset(0 0 0% 0)",
        duration: 0.7,
        stagger: 0.045,
        ease: "power4.out",
      }, 0.2)

      // Lines extend from center outward
      .to(lineLeftRef.current, {
        scaleX: 1,
        duration: 0.55,
        ease: "power3.out",
      }, 0.7)
      .to(lineRightRef.current, {
        scaleX: 1,
        duration: 0.55,
        ease: "power3.out",
      }, 0.7)

      // Tagline fades in
      .to(taglineRef.current, {
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
      }, 0.82)

      // Arc draws
      .to(arcRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
      }, 0.75)

      // Status text
      .to(statusRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      }, 0.9)

      // Cycle status messages
      .call(() => {
        let i = 1;
        const cycle = setInterval(() => {
          if (!statusRef.current) { clearInterval(cycle); return; }
          gsap.to(statusRef.current, {
            opacity: 0, duration: 0.15, ease: "power2.in",
            onComplete: () => {
              if (statusRef.current) {
                statusRef.current.textContent = STATUS_MESSAGES[i] + "...";
              }
              gsap.to(statusRef.current, { opacity: 1, duration: 0.2, ease: "power2.out" });
            },
          });
          i++;
          if (i >= STATUS_MESSAGES.length) clearInterval(cycle);
        }, 600);
      }, null, [], 0.9)

      // Hold before exit
      .to({}, { duration: 0.45 });

    }, loaderRef);

    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.loader} ref={loaderRef} aria-hidden="true">
      {/* Fine grid background */}
      <div className={styles.grid} />

      {/* Subtle radial glow */}
      <div className={styles.glow} />

      {/* Center content */}
      <div className={styles.center} ref={centerRef}>

        {/* Arc ring — progress circle */}
        <div className={styles.ringWrap} ref={ringRef}>
          <svg
            className={styles.ringsvg}
            width="128"
            height="128"
            viewBox="0 0 128 128"
            fill="none"
          >
            {/* Track */}
            <circle
              cx="64" cy="64"
              r={RADIUS}
              stroke="rgba(0,182,220,0.12)"
              strokeWidth="1.5"
            />
            {/* Fill arc */}
            <circle
              ref={arcRef}
              cx="64" cy="64"
              r={RADIUS}
              stroke="url(#arcGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              transform="rotate(-90 64 64)"
            />
            <defs>
              <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00B6DC" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00B6DC" />
              </linearGradient>
            </defs>
          </svg>

          {/* AI pulse dot at center of ring */}
          <div className={styles.pulseDot} />
        </div>

        {/* Wordmark row: line — APTAHIRE — line */}
        <div className={styles.wordRow} ref={wordmarkRef}>
          <div className={styles.lineLeft} ref={lineLeftRef} />
          <div className={styles.wordmark}>
            {LETTERS.map((l, i) => (
              <span
                key={i}
                className={styles.letter}
                ref={(el) => el && (letterRefs.current[i] = el)}
              >
                {l}
              </span>
            ))}
          </div>
          <div className={styles.lineRight} ref={lineRightRef} />
        </div>

        {/* Tagline */}
        <p className={styles.tagline} ref={taglineRef}>
          AI-Powered Hiring Platform
        </p>

        {/* Status */}
        <span className={styles.status} ref={statusRef}>
          {STATUS_MESSAGES[0]}...
        </span>

      </div>

      {/* Corner brackets */}
      <div className={`${styles.corner} ${styles.cornerTL}`} />
      <div className={`${styles.corner} ${styles.cornerTR}`} />
      <div className={`${styles.corner} ${styles.cornerBL}`} />
      <div className={`${styles.corner} ${styles.cornerBR}`} />
    </div>
  );
}
