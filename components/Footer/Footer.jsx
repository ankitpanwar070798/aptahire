"use client";
import styles from "./Footer.module.scss";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticElement from "../MagneticElement";
import { RiTwitterXLine } from "react-icons/ri";
import { RiLinkedinBoxLine } from "react-icons/ri";
import { RiInstagramLine } from "react-icons/ri";
import { RiFacebookBoxLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  {
    heading: "Features",
    links: [
      { label: "Learn about AI-powered interview features", href: "/" },
      { label: "Explore automated candidate screening tools", href: "/" },
      { label: "View detailed candidate analysis capabilities", href: "/" },
      { label: "Discover AI talent matching technology", href: "/" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Browse frequently asked questions", href: "/" },
      { label: "Visit the Aptahire support center", href: "/" },
      { label: "Read Aptahire recruitment blog articles", href: "/" },
      { label: "Meet the Aptahire content authors", href: "/" },
    ],
  },
  {
    heading: "Free AI Tools",
    links: [
      { label: "Create job descriptions with free AI generator", href: "/" },
      { label: "Generate interview questions with AI tool", href: "/" },
      { label: "Create LinkedIn recruiting messages with AI", href: "/" },
    ],
  },
];

const Footer = () => {
  const socialIconsRef = useRef(null);

  useGSAP(
    () => {
      if (!socialIconsRef.current) return;
      const icons = socialIconsRef.current.querySelectorAll(`.${styles.icon}`);
      gsap.set(icons, { opacity: 0, x: -40 });
      ScrollTrigger.create({
        trigger: socialIconsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(icons, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: socialIconsRef }
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_top}>
        {/* Brand column */}
        <div className={styles.footer_brand}>
          <div className={styles.footer_logo}>
            <img
              src="/assets/logo.svg"
              alt="Aptahire"
            />
          </div>
          <p className={styles.footer_tagline}>
            Aptahire is an AI-driven hiring platform that revolutionizes the
            recruitment process with automated interviews and intelligent
            candidate assessments.
          </p>
        </div>

        {/* Link columns */}
        {footerLinks.map((col) => (
          <div className={styles.footer_col} key={col.heading}>
            <h4 className={styles.footer_col_heading}>{col.heading}</h4>
            <ul className={styles.footer_col_links}>
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact column */}
        <div className={styles.footer_col}>
          <h4 className={styles.footer_col_heading}>Get in touch</h4>
          <ul className={styles.footer_contact}>
            <li><a href="mailto:sayhello@aptahire.ai">sayhello@aptahire.ai</a></li>
            <li><a href="tel:+15122979784">(512) 297-9784</a></li>
            <li>2854, 701 Tillery Street Unit 12,<br />Austin, TX, Travis, US, 78702</li>
          </ul>
          <div className={styles.footer_socials} ref={socialIconsRef}>
            <MagneticElement><div className={styles.icon}><RiTwitterXLine /></div></MagneticElement>
            <MagneticElement><div className={styles.icon}><RiLinkedinBoxLine /></div></MagneticElement>
            <MagneticElement><div className={styles.icon}><RiInstagramLine /></div></MagneticElement>
            <MagneticElement><div className={styles.icon}><RiFacebookBoxLine /></div></MagneticElement>
          </div>
        </div>
      </div>

      <div className={styles.footer_bottom}>
        <p>All Rights Reserved &ndash; 2025 &copy; aptahire</p>
        <div className={styles.footer_legal}>
          <a href="/">Terms &amp; Conditions</a>
          <span className={styles.divider} />
          <a href="/">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

