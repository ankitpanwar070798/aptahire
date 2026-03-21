"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import styles from "./ScrollAnimation.module.scss";
import TextSlideEffect from "../TextSlideEffect";

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimationComponent = () => {
  const videoContainerRef = useRef(null);
  const videoTitleElementsRef = useRef([]);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.innerWidth >= 900) {
      const lenis = new Lenis();
      lenisRef.current = lenis;
      const videoContainer = videoContainerRef.current;
      const videoTitleElements = videoTitleElementsRef.current;

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      const breakpoints = [
        { maxWidth: 1000, translateY: -135, movMultiplier: 450 },
        { maxWidth: 1100, translateY: -130, movMultiplier: 500 },
        { maxWidth: 1200, translateY: -125, movMultiplier: 550 },
        { maxWidth: 1300, translateY: -120, movMultiplier: 600 },
      ];

      const getInitialValues = () => {
        const width = window.innerWidth;

        for (const bp of breakpoints) {
          if (width <= bp.maxWidth) {
            return {
              translateY: bp.translateY,
              movementMultiplier: bp.movMultiplier,
            };
          }
        }

        return {
          translateY: -105,
          movementMultiplier: 650,
        };
      };

      const initialValues = getInitialValues();

      const animationState = {
        scrollProgress: 0,
        initialTranslateY: initialValues.translateY,
        currentTranslateY: initialValues.translateY,
        movementMultiplier: initialValues.movementMultiplier,
        scale: 0.25,
        fontSize: 80,
        gap: 20,
        targetMouseX: 0,
        currentMouseX: 0,
      };

      const handleResize = () => {
        const newValues = getInitialValues();
        animationState.initialTranslateY = newValues.translateY;
        animationState.movementMultiplier = newValues.movementMultiplier;

        if (animationState.scrollProgress === 0) {
          animationState.currentTranslateY = newValues.translateY;
        }
      };

      window.addEventListener("resize", handleResize);

      gsap.timeline({
        scrollTrigger: {
          trigger: `.${styles.intro}`,
          start: "top bottom",
          end: "top 10%",
          scrub: true,
          onUpdate: (self) => {
            animationState.scrollProgress = self.progress;

            animationState.currentTranslateY = gsap.utils.interpolate(
              animationState.initialTranslateY,
              0,
              animationState.scrollProgress
            );

            animationState.scale = gsap.utils.interpolate(
              0.25,
              1,
              animationState.scrollProgress
            );

            animationState.gap = gsap.utils.interpolate(
              2,
              1,
              animationState.scrollProgress
            );

            if (animationState.scrollProgress <= 0.4) {
              const firstPartProgress = animationState.scrollProgress / 0.4;
              animationState.fontSize = gsap.utils.interpolate(
                80,
                40,
                firstPartProgress
              );
            } else {
              const secondPartProgress =
                (animationState.scrollProgress - 0.4) / 0.6;
              animationState.fontSize = gsap.utils.interpolate(
                40,
                20,
                secondPartProgress
              );
            }
          },
        },
      });

      const handleMouseMove = (e) => {
        animationState.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      };

      document.addEventListener("mousemove", handleMouseMove);

      const animate = () => {
        if (window.innerWidth < 900) return;

        const {
          scale,
          targetMouseX,
          currentMouseX,
          currentTranslateY,
          fontSize,
          gap,
          movementMultiplier,
        } = animationState;

        const scaledMovementMultiplier = (1 - scale) * movementMultiplier;

        const maxHorizontalMovement =
          scale < 0.95 ? targetMouseX * scaledMovementMultiplier : 0;

        animationState.currentMouseX = gsap.utils.interpolate(
          currentMouseX,
          maxHorizontalMovement,
          0.05
        );

        if (videoContainer) {
          videoContainer.style.transform = `translateY(${currentTranslateY}%) translateX(${animationState.currentMouseX}px) scale(${scale})`;
          videoContainer.style.gap = `${gap}em`;
        }

        videoTitleElements.forEach((element) => {
          if (element) {
            element.style.fontSize = `${fontSize}px`;
          }
        });

        requestAnimationFrame(animate);
      };

      animate();

      // Cleanup function
      return () => {
        window.removeEventListener("resize", handleResize);
        document.removeEventListener("mousemove", handleMouseMove);
        if (lenisRef.current) {
          lenisRef.current.destroy();
        }
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        gsap.ticker.remove(() => {});
      };
    }
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <TextSlideEffect animateOnScroll={false} delay={0.3}>
        <h1>Aptahire AI</h1>
        </TextSlideEffect>
        <div className={styles.heroCopy}>
            <TextSlideEffect animateOnScroll={false} delay={0.6}>
          <h3>Cut interview costs by up to 75% with Aptahire</h3>
          <p>Automate shortlisting, scheduling, and interviewing and speed up your hiring process by 10X.</p>
          </TextSlideEffect>
          <TextSlideEffect animateOnScroll={false} delay={0.6}>
          <p>(Scroll)</p>
          </TextSlideEffect>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.videoContainerDesktop} ref={videoContainerRef}>
          <div className={styles.videoPreview}>
            <div className={styles.videoWrapper}>
              <iframe
                src="https://www.youtube.com/embed/dESIGVxSSCE?autoplay=0&rel=0"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                title="YouTube video"
              />
            </div>
          </div>
          <div className={styles.videoTitle}>
            <p >
              Showreel
            </p>
            <p>
              Client(2024 - 2025)
            </p>
          </div>
        </div>

        <div className={styles.videoContainerMobile}>
          <div className={styles.videoPreview}>
            <div className={styles.videoWrapper}>
              <iframe
                src="https://www.youtube.com/embed/dESIGVxSSCE?autoplay=0&rel=0"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                title="YouTube video"
              />
            </div>
          </div>
          <div className={styles.videoTitle}>
            <p>Showreel</p>
            <p>Client(2024 - 2025)</p>
          </div>
        </div>
      </section>

      {/* <section className={styles.outro}>
        <p>Delve into coding without clutter.</p>
      </section> */}
    </div>
  );
};

export default ScrollAnimationComponent;
