"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useViewTransition } from "../../hooks/useViewTransition";
import AnimatedButton from "../AnimatedButton/AnimatedButton";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import styles from "./TopBar.module.scss";

gsap.registerPlugin(ScrollTrigger);

const TopBar = () => {
  const topBarRef = useRef(null);
  const { navigateWithTransition } = useViewTransition();

  useEffect(() => {
    if (!topBarRef.current) return;
    const topBar = topBarRef.current;
    // Cache height once — reading offsetHeight inside RAF forces layout reflow every frame
    const barHeight = topBar.offsetHeight;
    let lastScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const dir = currentScrollY > lastScrollY ? 1 : -1;
        if (dir === 1 && currentScrollY > 80) {
          // overwrite:true kills any in-progress tween before starting a new one
          gsap.to(topBar, { y: -barHeight, duration: 0.5, ease: "power3.out", overwrite: true });
        } else if (dir === -1) {
          gsap.to(topBar, { y: 0, duration: 0.5, ease: "power3.out", overwrite: true });
        }
        lastScrollY = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.top_bar} ref={topBarRef}>
      <div className={styles.top_bar_logo}>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigateWithTransition("/");
          }}
        >
          <Image
            src="/assets/logo.svg"
            alt="Aptahire Logo"
            width={120}
            height={40}
            priority
          />
        </a>
      </div>
      <div className={styles.top_bar_cta}>
        <ThemeToggle />
        <AnimatedButton label="Enquire now" route="/connect" animate={false} />
      </div>
    </div>
  );
};

export default TopBar;
