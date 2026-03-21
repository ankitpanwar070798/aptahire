"use client";
import styles from "./FAQSection.module.scss";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TextSlideEffect from "../TextSlideEffect";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "How does Aptahire's AI video interview work?",
    answer:
      "Candidates receive a unique interview link and record their responses to role-specific questions at their own pace. Our AI analyzes speech patterns, language quality, confidence indicators, and response structure — then generates a scorecard within minutes. No human reviewer is needed for initial screening.",
  },
  {
    question: "Is the AI evaluation unbiased?",
    answer:
      "We've designed Aptahire to evaluate candidates purely on job-relevant criteria: communication clarity, response structure, domain knowledge, and problem-solving. Our models are regularly audited for demographic bias and we provide full transparency on what every score measures.",
  },
  {
    question: "Can I customize the interview questions for my role?",
    answer:
      "Absolutely. You can build question banks from scratch, use our library of 1,000+ curated role-specific questions, or combine both. You can also set follow-up probing questions that activate based on initial answers.",
  },
  {
    question: "How long does it take to set up a hiring workflow?",
    answer:
      "Most customers go from signup to their first live interview in under 30 minutes. Our onboarding wizard guides you through job creation, question selection, assessment configuration, and calendar sync. No technical setup needed.",
  },
  {
    question: "What integrations does Aptahire support?",
    answer:
      "Aptahire integrates natively with Greenhouse, Lever, Workday, BambooHR, Keka, Darwinbox, and 50+ other platforms via Zapier and our REST API. We also support single sign-on (SSO) via SAML 2.0.",
  },
  {
    question: "Is Aptahire suitable for bulk hiring?",
    answer:
      "Yes — bulk hiring is one of our primary use cases. Clients regularly run campus recruitment drives processing 5,000–10,000 candidates simultaneously. Our infrastructure scales automatically, and pricing doesn't penalize you for volume spikes.",
  },
  {
    question: "How does proctoring work during assessments?",
    answer:
      "For written assessments, our AI monitors tab switching, clipboard activity, and time anomalies. For video interviews, it flags suspicious eye movement patterns, audio artifacts, and screen share activity. All flags are surfaced for human review — we never auto-disqualify candidates.",
  },
  {
    question: "What does the candidate experience look like?",
    answer:
      "Candidates complete interviews from any device with a camera. The interface guides them through each question with clear instructions and a practice round. Surveys show 94% of candidates find the experience fair, and many prefer it over traditional phone screens because of the flexibility.",
  },
  {
    question: "How is candidate data stored and protected?",
    answer:
      "We are SOC 2 Type II certified and GDPR compliant. Video recordings are encrypted at rest and in transit, stored for a configurable retention period (default 90 days), and permanently deleted on request. We never sell or share candidate data with third parties.",
  },
  {
    question: "What pricing plans are available?",
    answer:
      "We offer three plans: Starter (up to 50 interviews/month), Growth (up to 500 interviews/month), and Enterprise (unlimited, with dedicated support and custom SLA). Annual billing saves 20%. Contact us for volume or campus-drive pricing.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);
  const isAnimating = useRef(false);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(`.${styles.faq_item}`);
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const handleToggle = (index) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const contentEl = contentRefs.current[index];

    if (activeIndex === index) {
      // Close
      gsap.to(contentEl, {
        height: 0,
        duration: 0.38,
        ease: "power2.inOut",
        onComplete: () => {
          isAnimating.current = false;
        },
      });
      setActiveIndex(null);
    } else {
      // Close previous
      if (activeIndex !== null && contentRefs.current[activeIndex]) {
        gsap.to(contentRefs.current[activeIndex], {
          height: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }

      // Open new
      gsap.set(contentEl, { height: "auto" });
      const height = contentEl.offsetHeight;
      gsap.fromTo(
        contentEl,
        { height: 0 },
        {
          height,
          duration: 0.42,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(contentEl, { height: "auto" });
            isAnimating.current = false;
          },
        }
      );
      setActiveIndex(index);
    }
  };

  return (
    <section className={styles.faq_section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.left}>
            <TextSlideEffect>
              <p className={styles.label}>FAQ</p>
            </TextSlideEffect>
            <TextSlideEffect delay={0.1}>
              <h2>Common questions, honest answers</h2>
            </TextSlideEffect>
            <TextSlideEffect delay={0.15}>
              <p className={styles.subtitle}>
                Everything you need to know before getting started with Aptahire.
              </p>
            </TextSlideEffect>
            <div className={styles.cta_block}>
              <p>Still have questions?</p>
              <a href="mailto:sayhello@aptahire.ai" className={styles.cta_link}>
                Talk to us →
              </a>
            </div>
          </div>

          <div className={styles.right}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`${styles.faq_item} ${activeIndex === i ? styles.active : ""}`}
                style={{ opacity: 0 }}
              >
                <button
                  className={styles.faq_trigger}
                  onClick={() => handleToggle(i)}
                  aria-expanded={activeIndex === i}
                >
                  <span className={styles.faq_question}>{faq.question}</span>
                  <span className={styles.faq_icon}>
                    {activeIndex === i ? (
                      <RiSubtractLine size={18} />
                    ) : (
                      <RiAddLine size={18} />
                    )}
                  </span>
                </button>
                <div
                  className={styles.faq_content}
                  ref={(el) => {
                    contentRefs.current[i] = el;
                    if (el && activeIndex !== i) {
                      gsap.set(el, { height: 0 });
                    }
                  }}
                >
                  <p className={styles.faq_answer}>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
