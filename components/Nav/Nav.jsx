"use client";
import styles from "./Nav.module.scss";

import { useEffect, useState, useCallback, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitText from "gsap/SplitText";
import { useLenis } from "lenis/react";

import MenuBtn from "../MenuBtn/MenuBtn";
import { useViewTransition } from "@/hooks/useViewTransition";

gsap.registerPlugin(SplitText);

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/resources", label: "Resources" },
  { href: "/connect", label: "Contact" },
];

const Nav = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const menuRef = useRef(null);
  const isInitializedRef = useRef(false);
  const splitTextRefs = useRef([]);
  const router = useRouter();
  const lenis = useLenis();
  const { navigateWithTransition } = useViewTransition();

  useEffect(() => {
    if (lenis) isOpen ? lenis.stop() : lenis.start();
  }, [lenis, isOpen]);

  useLayoutEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("hop", "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1");
  }, []);

  useLayoutEffect(() => {
    if (!menuRef.current) return;
    const menu = menuRef.current;

    splitTextRefs.current.forEach((split) => split.revert?.());
    splitTextRefs.current = [];

    gsap.set(menu, { clipPath: "circle(0% at 50% 50%)" });

    const h2Elements = menu.querySelectorAll("h2");
    const pElements = menu.querySelectorAll("p");

    [...h2Elements, ...pElements].forEach((el) => {
      const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
      gsap.set(split.lines, { y: "120%" });
      split.lines.forEach((line) => (line.style.pointerEvents = "auto"));
      splitTextRefs.current.push(split);
    });

    isInitializedRef.current = true;
  }, []);

  const animateMenu = useCallback((open) => {
    if (!menuRef.current) return;
    const menu = menuRef.current;
    setIsAnimating(true);

    if (open) {
      document.body.classList.add("menu-open");
      gsap.to(menu, {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power3.out",
        duration: 0.85,
        onStart: () => {
          menu.style.pointerEvents = "all";
          splitTextRefs.current.forEach((split, index) =>
            gsap.to(split.lines, {
              y: "0%",
              stagger: 0.04,
              delay: 0.18 + index * 0.06,
              duration: 0.65,
              ease: "power4.out",
            })
          );
        },
        onComplete: () => setIsAnimating(false),
      });
    } else {
      const textTimeline = gsap.timeline({
        onStart: () =>
          gsap.to(menu, {
            clipPath: "circle(0% at 50% 50%)",
            ease: "power3.out",
            duration: 0.6,
            delay: 0.3,
            onComplete: () => {
              menu.style.pointerEvents = "none";
              splitTextRefs.current.forEach((split) => gsap.set(split.lines, { y: "120%" }));
              document.body.classList.remove("menu-open");
              setIsAnimating(false);
              setIsNavigating(false);
            },
          }),
      });

      splitTextRefs.current.forEach((split, index) =>
        textTimeline.to(
          split.lines,
          { y: "-120%", stagger: 0.025, delay: index * 0.03, duration: 0.5, ease: "power3.out" },
          0
        )
      );
    }
  }, []);

  useEffect(() => {
    if (isInitializedRef.current) animateMenu(isOpen);
  }, [isOpen, animateMenu]);

  const toggleMenu = useCallback(() => {
    if (!isAnimating && isInitializedRef.current && !isNavigating) setIsOpen((prev) => !prev);
  }, [isAnimating, isNavigating]);

  const handleLinkClick = useCallback(
    (e, href) => {
      e.preventDefault();
      if (href === "#" || isNavigating) return;
      if (window.location.pathname === href) {
        if (isOpen) setIsOpen(false);
        return;
      }
      setIsNavigating(true);
      setIsOpen(false);
      navigateWithTransition(href);
    },
    [isNavigating, isOpen, navigateWithTransition]
  );

  return (
    <div className={styles.nav_wrapper}>
      <MenuBtn isOpen={isOpen} toggleMenu={toggleMenu} />
      <div className={styles.menu} ref={menuRef}>
        <div className={styles["menu-wrapper"]}>
          <div className={`${styles.col} ${styles["col-1"]}`}>
            <div className={styles.links}>
              {menuLinks.map(({ href, label }) => (
                <div key={label} className={styles.link}>
                  <a href={href} onClick={(e) => handleLinkClick(e, href)}>
                    <h2>{label}</h2>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className={`${styles.col} ${styles["col-2"]}`}>
            <div className={styles.socials}>
              <div className={styles["sub-col"]}>
                {/* <div className={`${styles["menu-meta"]} ${styles["menu-commissions"]}`}>
                  <p>dsp@deepsense.in</p>
                  <p>+91 8939858592</p>
                </div> */}
                <div className={styles["menu-meta"]}>
                  <p>Company Address</p>
                  <p>No 10, 3rd Floor, 1st Main Rd, United India Colony,</p>
                  <p>Cheenai, Tamil Nadu 600024</p>
                </div>
              </div>
              <div className={styles["sub-col"]}>
                <div className={styles["menu-meta"]}>
                  <p>Social</p>
                  <p>Instagram</p>
                  <p>Youtube</p>
                  <p>LinkedIn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
