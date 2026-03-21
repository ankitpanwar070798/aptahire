"use client";
import styles from "./CTASection.module.scss";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TextSlideEffect from "../TextSlideEffect";
import { RiArrowRightLine } from "react-icons/ri";
import { useViewTransition } from "@/hooks/useViewTransition";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef(null);
  const orbRef = useRef(null);
  const { navigateWithTransition } = useViewTransition();

  useGSAP(
    () => {
      // Orb parallax on scroll
      gsap.to(orbRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Badge + heading + button entrance
      const elements = gsap.utils.toArray([
        `.${styles.badge}`,
        `.${styles.cta_eyebrow}`,
        `.${styles.cta_heading}`,
        `.${styles.cta_sub}`,
        `.${styles.btn_group}`,
      ]);

      gsap.fromTo(
        elements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
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
    <section className={styles.cta_section} ref={sectionRef}>
      <div className={styles.orb} ref={orbRef} />
      <div className={styles.grid_overlay} />

      <div className={styles.container}>
        <div className={styles.badge}>
          <span className={styles.badge_dot} />
          <span>Now in beta — limited spots open</span>
        </div>

        <TextSlideEffect animateOnScroll={true} delay={0}>
          <h2 className={styles.cta_heading}>
            Your next great hire starts <em>here</em>
          </h2>
        </TextSlideEffect>

        <p className={styles.cta_sub}>
          Join 500+ companies using AI to cut hiring time, reduce costs,
          <br className={styles.br_desktop} />
          and find candidates who actually perform.
        </p>

        <div className={styles.btn_group}>
          <button
            className={styles.btn_primary}
            onClick={() => navigateWithTransition("/connect")}
          >
            Start for free
            <RiArrowRightLine size={18} className={styles.btn_icon} />
          </button>
          <button
            className={styles.btn_ghost}
            onClick={() => navigateWithTransition("/portfolio")}
          >
            See how it works
          </button>
        </div>

        <div className={styles.trust_row}>
          <span className={styles.trust_item}>No credit card required</span>
          <span className={styles.trust_sep}>·</span>
          <span className={styles.trust_item}>Setup in under 30 minutes</span>
          <span className={styles.trust_sep}>·</span>
          <span className={styles.trust_item}>Cancel anytime</span>
        </div>
      </div>
    </section>
  );
}
