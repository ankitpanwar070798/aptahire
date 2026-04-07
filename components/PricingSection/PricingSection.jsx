"use client";

import styles from "./PricingSection.module.scss";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// ── Data ──────────────────────────────────────────────────────────────────────

const plans = [
  {
    id: "starter",
    label: "STARTER",
    count: 10,
    countSuffix: "",
    tagline: "Perfect for small teams and companies just starting out.",
    features: ["Up to 10 interviews per month", "E-mail support"],
    cta: "Contact Us",
  },
  {
    id: "growth",
    label: "GROWTH",
    count: 20,
    countSuffix: "",
    tagline: "Ideal for growing companies with expanding hiring needs.",
    features: ["Up to 20 interviews per month", "E-mail support"],
    cta: "Contact Us",
  },
  {
    id: "professional",
    label: "PROFESSIONAL",
    count: 200,
    countSuffix: "+",
    tagline: "Designed for professionals seeking efficient hiring.",
    features: ["Up to 200 interviews per month", "E-mail support"],
    cta: "Contact Us",
    featured: true,
  },
  {
    id: "enterprise",
    label: "ENTERPRISE",
    count: null,
    countSymbol: "∞",
    tagline: "Best for enterprises with high-volume recruitment.",
    bullets: ["Fully customizable solutions tailored to your needs", "Get in touch with us now"],
    cta: "Contact us",
    dark: true,
  },
];

const compareSections = [
  {
    rows: [
      { label: "Telephone Support",                values: [false, false, false, true]  },
      { label: "Custom Branding",                  values: [false, false, false, true]  },
      { label: "ATS Integration",                  values: [false, false, true,  true]  },
      { label: "White-labeled Report",             values: [false, false, true,  true]  },
      { label: "AI-Based Feedback for Candidates", values: [false, false, true,  true]  },
      { label: "AI Copilot",                       values: [false, false, true,  true]  },
    ],
  },
  {
    rows: [
      { label: "Code Interpreter",   values: [false, true, true, true] },
      { label: "AI Resume Analysis", values: [true,  true, true, true] },
      { label: "AI JD Creation",     values: [true,  true, true, true] },
      { label: "AI Transcript",      values: [true,  true, true, true] },
      { label: "Email Support",      values: [true,  true, true, true] },
    ],
    ctas: [
      { label: "Select Starter",      id: "starter"      },
      { label: "Select Growth",       id: "growth"       },
      { label: "Select Professional", id: "professional" },
      { label: "Contact us",          id: "enterprise"   },
    ],
  },
];

// ── Animated counter ──────────────────────────────────────────────────────────

const AnimatedCount = ({ target, suffix = "" }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || target === null) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration: 2,
      ease: "power3.out",
      delay: 0.5,
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix;
      },
    });
    return () => tween.kill();
  }, [target, suffix]);
  return <span ref={ref}>0{suffix}</span>;
};

// ── Icons ─────────────────────────────────────────────────────────────────────

const Check = ({ light }) => (
  <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
    <path d="M6.5 10l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Dash = () => (
  <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
    <path d="M6 10h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.35" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────

const PricingSection = () => {
  const rootRef  = useRef(null);
  const heroRef  = useRef(null);
  const cardsRef = useRef(null);
  const cmpRef   = useRef(null);
  const ctaRef   = useRef(null);

  useGSAP(() => {
    // Hero
    gsap.fromTo(
      heroRef.current?.querySelectorAll("[data-h]"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power4.out", delay: 0.15 }
    );
    // Cards
    gsap.fromTo(
      cardsRef.current?.querySelectorAll("[data-card]"),
      { y: 60, opacity: 0, scale: 0.97 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.75, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 82%", once: true },
      }
    );
    // Compare rows
    gsap.fromTo(
      cmpRef.current?.querySelectorAll("[data-row]"),
      { opacity: 0, x: -14 },
      {
        opacity: 1, x: 0, duration: 0.38, stagger: 0.03, ease: "power2.out",
        scrollTrigger: { trigger: cmpRef.current, start: "top 80%", once: true },
      }
    );
    // CTA
    gsap.fromTo(
      ctaRef.current?.querySelectorAll("[data-h]"),
      { y: 36, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.85, stagger: 0.13, ease: "power3.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 82%", once: true },
      }
    );
  }, { scope: rootRef });

  return (
    <div className={styles.page} ref={rootRef}>

      {/* Decorative mesh top */}
      <div className={styles.mesh} aria-hidden="true" />

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className={styles.hero} ref={heroRef}>
        <span data-h className={styles.hero_pill}>Pricing</span>
        <h1 data-h className={styles.hero_h1}>
          Flexible pricing that{" "}
          <span className={styles.hero_accent}>scales</span>
          <br />with your business
        </h1>
        <p data-h className={styles.hero_sub}>
          Enjoy a suite of AI-driven hiring features tailored to streamline your
          recruitment process, all at a price that fits your budget with aptahire.
        </p>
        <nav data-h className={styles.breadcrumb} aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">›</span>
          <span>Pricing</span>
        </nav>
      </section>

      {/* ── PRICING CARDS ───────────────────────────────────────────── */}
      <section className={styles.cards_grid} ref={cardsRef}>
        {plans.map((plan) => (
          <article
            key={plan.id}
            data-card
            className={`${styles.card} ${plan.featured ? styles.card_featured : ""} ${plan.dark ? styles.card_dark : ""}`}
          >
            {plan.featured && <div className={styles.most_pop}>Most Popular</div>}

            <div className={styles.card_top}>
              <span className={styles.card_label}>{plan.label}</span>
              <div className={styles.card_num}>
                {plan.countSymbol ? (
                  <span className={styles.num}>{plan.countSymbol}</span>
                ) : (
                  <span className={styles.num}>
                    <AnimatedCount target={plan.count} suffix={plan.countSuffix} />
                  </span>
                )}
                <span className={styles.num_sub}>
                  {plan.count !== null ? "interviews / mo" : "unlimited scale"}
                </span>
              </div>
              <p className={styles.card_tagline}>{plan.tagline}</p>
            </div>

            <div className={styles.card_body}>
              {plan.features && (
                <ul className={styles.feat_list}>
                  {plan.features.map((f) => (
                    <li key={f}>
                      <span className={styles.feat_icon}><Check /></span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              {plan.bullets && (
                <ul className={styles.bullet_list}>
                  {plan.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </div>

            <button className={styles.card_cta}>{plan.cta}</button>
          </article>
        ))}
      </section>

      {/* ── COMPARE TABLES ──────────────────────────────────────────── */}
      <section className={styles.cmp_wrap} ref={cmpRef}>
        {compareSections.map((sec, si) => (
          <div key={si} className={styles.cmp_block}>

            <div className={`${styles.cmp_row} ${styles.cmp_head}`} data-row>
              <div className={styles.cmp_label}>Compare plans</div>
              {plans.map((p) => (
                <div key={p.id} className={`${styles.cmp_plan_col} ${styles[`cmp_col_${p.id}`]}`}>
                  {p.label.charAt(0) + p.label.slice(1).toLowerCase()}
                </div>
              ))}
            </div>

            {sec.rows.map((row) => (
              <div key={row.label} className={styles.cmp_row} data-row>
                <div className={styles.cmp_label}>{row.label}</div>
                {row.values.map((has, ci) => (
                  <div key={ci} className={styles.cmp_val}>
                    <span className={`${styles.cmp_tick} ${has ? styles[`tick_${plans[ci].id}`] : styles.tick_no}`}>
                      {has ? <Check /> : <Dash />}
                    </span>
                  </div>
                ))}
              </div>
            ))}

            {sec.ctas && (
              <div className={`${styles.cmp_row} ${styles.cmp_cta_row}`} data-row>
                <div className={styles.cmp_label} />
                {sec.ctas.map((c) => (
                  <div key={c.id} className={styles.cmp_val}>
                    <button className={`${styles.tbl_btn} ${styles[`tbl_btn_${c.id}`]}`}>
                      {c.label}
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}
      </section>


    </div>
  );
};

export default PricingSection;
