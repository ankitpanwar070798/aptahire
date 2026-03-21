"use client";
import styles from "./TestimonialsSection.module.scss";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TextSlideEffect from "../TextSlideEffect";
import { RiStarFill } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Head of Talent, Zomato",
    text: "We screened 2,000 candidates for 40 roles in under a week. Aptahire didn't just save time — it fundamentally changed how we think about hiring at scale.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Marcus Chen",
    role: "Engineering Manager, Razorpay",
    text: "The AI video interviews are surprisingly insightful. It caught communication nuances I would have missed in a phone screen. Our offer-to-accept rate jumped 30%.",
    rating: 5,
    avatar: "MC",
  },
  {
    name: "Aarushi Kapoor",
    role: "VP People Ops, Meesho",
    text: "Auto-scheduling alone saved my team 15 hours a week. No more back-and-forth emails. Candidates book their own slots — it just works.",
    rating: 5,
    avatar: "AK",
  },
  {
    name: "Daniel Walsh",
    role: "Talent Acquisition Lead, Freshworks",
    text: "The analytics dashboard gave us visibility we never had. We discovered our biggest drop-off was at the assessment stage and fixed it in days.",
    rating: 5,
    avatar: "DW",
  },
  {
    name: "Neha Iyer",
    role: "HR Director, CRED",
    text: "Our hiring managers were skeptical of AI interviews. Now they request it first. The structured scoring removes bias and makes justifying decisions easy.",
    rating: 5,
    avatar: "NI",
  },
  {
    name: "Rahul Mehta",
    role: "CTO, Groww",
    text: "We cut our engineering hiring cycle from 6 weeks to 12 days. Technical assessments are auto-graded and the quality of shortlists is consistently high.",
    rating: 5,
    avatar: "RM",
  },
  {
    name: "Sunita Rao",
    role: "Recruiter, Infosys BPO",
    text: "Bulk hiring used to be our nightmare. Last quarter we processed 8,000 applicants for a campus drive in three days. That's not possible without Aptahire.",
    rating: 5,
    avatar: "SR",
  },
  {
    name: "James Okafor",
    role: "People Lead, Postman",
    text: "The Greenhouse integration was live in 20 minutes. Our workflow stayed exactly the same — just with AI supercharging every step of the funnel.",
    rating: 5,
    avatar: "JO",
  },
];

// Duplicate for seamless loop
const row1 = [...testimonials.slice(0, 4), ...testimonials.slice(0, 4)];
const row2 = [...testimonials.slice(4), ...testimonials.slice(4)];

function Stars({ count }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: count }).map((_, i) => (
        <RiStarFill key={i} size={14} />
      ))}
    </div>
  );
}

function TestimonialCard({ item }) {
  return (
    <div className={styles.card}>
      <Stars count={item.rating} />
      <p className={styles.card_text}>{item.text}</p>
      <div className={styles.card_author}>
        <div className={styles.avatar}>{item.avatar}</div>
        <div className={styles.author_info}>
          <span className={styles.author_name}>{item.name}</span>
          <span className={styles.author_role}>{item.role}</span>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const tween1Ref = useRef(null);
  const tween2Ref = useRef(null);

  useGSAP(
    () => {
      // Row 1: scroll left (negative x)
      tween1Ref.current = gsap.to(row1Ref.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });

      // Row 2: scroll right (positive start, negative end → reverse direction)
      gsap.set(row2Ref.current, { xPercent: -50 });
      tween2Ref.current = gsap.to(row2Ref.current, {
        xPercent: 0,
        duration: 36,
        ease: "none",
        repeat: -1,
      });

      // Pause on hover
      const handleEnter = () => {
        tween1Ref.current?.pause();
        tween2Ref.current?.pause();
      };
      const handleLeave = () => {
        tween1Ref.current?.resume();
        tween2Ref.current?.resume();
      };

      const rows = sectionRef.current.querySelectorAll(`.${styles.marquee_track}`);
      rows.forEach((row) => {
        row.addEventListener("mouseenter", handleEnter);
        row.addEventListener("mouseleave", handleLeave);
      });

      return () => {
        rows.forEach((row) => {
          row.removeEventListener("mouseenter", handleEnter);
          row.removeEventListener("mouseleave", handleLeave);
        });
      };
    },
    { scope: sectionRef }
  );

  return (
    <section className={styles.testimonials_section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <TextSlideEffect>
            <p className={styles.label}>Social proof</p>
          </TextSlideEffect>
          <TextSlideEffect delay={0.1}>
            <h2>Loved by people who hire</h2>
          </TextSlideEffect>
          <TextSlideEffect delay={0.15}>
            <p className={styles.subtitle}>
              From startups to enterprises — hiring teams across industries rely on Aptahire
              to find great talent faster and fairer.
            </p>
          </TextSlideEffect>
        </div>
      </div>

      <div className={styles.marquee_wrapper}>
        <div className={styles.fade_left} />
        <div className={styles.fade_right} />

        <div className={styles.marquee_track}>
          <div className={styles.marquee_row} ref={row1Ref}>
            {row1.map((item, i) => (
              <TestimonialCard key={i} item={item} />
            ))}
          </div>
        </div>

        <div className={styles.marquee_track}>
          <div className={styles.marquee_row} ref={row2Ref}>
            {row2.map((item, i) => (
              <TestimonialCard key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
