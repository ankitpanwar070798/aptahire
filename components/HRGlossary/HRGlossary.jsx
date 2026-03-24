"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import styles from "./HRGlossary.module.scss";

const ALPHABET = ["All", "#", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

const glossaryData = [
  // A
  { term: "Acquisition Strategy", definition: "A comprehensive plan used by organizations to attract, recruit, and retain talent by leveraging various channels, tools, and techniques aligned with business goals.", category: "Recruitment & Talent Acquisition", letter: "A" },
  { term: "Active Candidate", definition: "A job seeker who is actively searching for new employment opportunities and is engaged in applying for open positions.", category: "Recruitment & Talent Acquisition", letter: "A" },
  { term: "Adaptive Assessment", definition: "A type of evaluation that adjusts the difficulty of questions based on the candidate's previous answers, ensuring a personalized and accurate measurement of ability.", category: "HR Technology", letter: "A" },
  { term: "Applicant Tracking System (ATS)", definition: "Software that automates the hiring process by managing job postings, collecting applications, and tracking candidates through the recruitment pipeline.", category: "HR Technology", letter: "A" },
  { term: "At-Will Employment", definition: "An employment arrangement where either the employer or employee can terminate the relationship at any time, for any legal reason, without prior notice.", category: "Employee Relations", letter: "A" },
  { term: "Attrition Rate", definition: "The percentage of employees who leave an organization over a specific period, calculated by dividing departures by the average headcount.", category: "Performance Management", letter: "A" },
  // B
  { term: "Background Check", definition: "A review of a candidate's criminal, financial, and personal history conducted by employers to verify credentials and assess suitability for a role.", category: "Recruitment & Talent Acquisition", letter: "B" },
  { term: "Benchmarking", definition: "The process of comparing an organization's performance metrics, compensation structures, or HR practices against industry standards or competitors.", category: "Compensation & Benefits", letter: "B" },
  { term: "Boolean Search", definition: "A structured search technique using operators like AND, OR, and NOT to refine candidate searches in resume databases and professional networks.", category: "Recruitment & Talent Acquisition", letter: "B" },
  // C
  { term: "Candidate Experience", definition: "The overall perception and feelings a job applicant has about an organization's recruitment process, from initial application through to onboarding.", category: "Recruitment & Talent Acquisition", letter: "C" },
  { term: "Competency Framework", definition: "A structured set of behaviors, skills, and attributes that define what success looks like for employees in various roles within an organization.", category: "Performance Management", letter: "C" },
  { term: "Compensation Package", definition: "The total monetary and non-monetary rewards offered to employees, including base salary, bonuses, benefits, and equity.", category: "Compensation & Benefits", letter: "C" },
  { term: "Culture Add", definition: "The concept of hiring candidates who bring new perspectives and strengths that enhance and evolve organizational culture, rather than simply fitting into it.", category: "Recruitment & Talent Acquisition", letter: "C" },
  // D
  { term: "Diversity Hiring", definition: "A strategic recruitment approach aimed at attracting candidates from underrepresented groups to build a more inclusive and diverse workforce.", category: "Recruitment & Talent Acquisition", letter: "D" },
  { term: "Deferred Compensation", definition: "A portion of an employee's earnings that is set aside to be paid at a future date, often used as a retention and tax-planning tool.", category: "Compensation & Benefits", letter: "D" },
  // E
  { term: "Employee Engagement", definition: "The emotional commitment an employee has to their organization and its goals, often measured through surveys and reflected in productivity and retention rates.", category: "Employee Relations", letter: "E" },
  { term: "Employee Value Proposition (EVP)", definition: "The unique set of benefits and rewards that an organization offers in exchange for an employee's skills, capabilities, and contributions.", category: "Compensation & Benefits", letter: "E" },
  { term: "Exit Interview", definition: "A conversation conducted with departing employees to gather insights about their reasons for leaving and to identify areas for organizational improvement.", category: "Employee Relations", letter: "E" },
  // F
  { term: "Functional Skills", definition: "Transferable abilities and competencies that individuals apply across different roles and industries, such as communication, problem-solving, and project management.", category: "Employee Development", letter: "F" },
  // G
  { term: "Glass Ceiling", definition: "An invisible barrier that prevents certain groups, often women and minorities, from advancing to senior leadership positions within an organization.", category: "Employee Relations", letter: "G" },
  // H
  { term: "HR Analytics", definition: "The practice of collecting, analyzing, and reporting on HR data to make evidence-based decisions about the workforce and improve organizational outcomes.", category: "HR Technology", letter: "H" },
  { term: "Headcount Planning", definition: "The strategic process of determining the optimal number of employees needed to meet an organization's current and future business objectives.", category: "Performance Management", letter: "H" },
  { term: "Human Capital Management (HCM)", definition: "A comprehensive set of practices for recruiting, managing, developing, and optimizing the workforce as a strategic organizational asset.", category: "HR Technology", letter: "H" },
  // I
  { term: "Induction Program", definition: "A structured process designed to introduce new employees to the organization, its culture, policies, and their specific roles and responsibilities.", category: "Employee Development", letter: "I" },
  // J
  { term: "Job Analysis", definition: "The systematic process of collecting information about the duties, responsibilities, skills, and outcomes required for a specific job role.", category: "Recruitment & Talent Acquisition", letter: "J" },
  { term: "Job Description", definition: "A formal document that outlines the duties, responsibilities, required qualifications, and reporting structure of a specific position within an organization.", category: "Recruitment & Talent Acquisition", letter: "J" },
  // K
  { term: "Key Performance Indicator (KPI)", definition: "A measurable value that demonstrates how effectively an organization or employee is achieving key business objectives and performance targets.", category: "Performance Management", letter: "K" },
  // L
  { term: "Learning Management System (LMS)", definition: "A software platform used to create, deliver, track, and report on employee training programs and courses within an organization.", category: "HR Technology", letter: "L" },
  { term: "Lateral Move", definition: "A career transition where an employee moves to a new role of similar seniority and compensation, typically to gain broader skills or a new challenge.", category: "Employee Development", letter: "L" },
  // N
  { term: "Notice Period", definition: "The length of time an employee must continue working after submitting their resignation, or the advance warning employers must give before terminating employment.", category: "Employee Relations", letter: "N" },
  // O
  { term: "Onboarding", definition: "The process of integrating a new employee into an organization, including orientation, training, and the cultural acclimatization required for long-term success.", category: "Employee Development", letter: "O" },
  { term: "Organizational Chart", definition: "A visual diagram that illustrates the structure of an organization, showing the hierarchy of roles and the relationships between departments and individuals.", category: "Performance Management", letter: "O" },
  // P
  { term: "Performance Appraisal", definition: "A periodic evaluation of an employee's job performance against established criteria to identify strengths, areas for improvement, and future goals.", category: "Performance Management", letter: "P" },
  { term: "Psychometric Testing", definition: "Standardized assessments used to measure a candidate's cognitive abilities, personality traits, and behavioral tendencies relevant to job performance.", category: "Recruitment & Talent Acquisition", letter: "P" },
  { term: "Passive Candidate", definition: "A professional who is currently employed and not actively seeking new roles, but who may be open to the right opportunity if approached by a recruiter.", category: "Recruitment & Talent Acquisition", letter: "P" },
  // R
  { term: "Recruitment Funnel", definition: "The staged process a candidate moves through during hiring — from awareness and application through screening, interviewing, and final offer.", category: "Recruitment & Talent Acquisition", letter: "R" },
  { term: "Retention Strategy", definition: "A set of organizational practices and policies designed to reduce employee turnover and maintain a stable, experienced, and engaged workforce.", category: "Employee Relations", letter: "R" },
  // S
  { term: "Succession Planning", definition: "The process of identifying and developing internal talent to fill critical leadership positions when they become vacant due to retirement, resignation, or growth.", category: "Employee Development", letter: "S" },
  { term: "Skills Gap Analysis", definition: "An assessment comparing the current skills of employees against the skills required to meet organizational objectives, identifying areas where development is needed.", category: "Employee Development", letter: "S" },
  { term: "Structured Interview", definition: "A standardized interview process in which all candidates are asked the same set of predetermined questions, scored against a consistent evaluation rubric.", category: "Recruitment & Talent Acquisition", letter: "S" },
  // T
  { term: "Talent Pipeline", definition: "A pool of pre-qualified candidates that an organization maintains relationships with, ready to fill future job openings as they arise.", category: "Recruitment & Talent Acquisition", letter: "T" },
  { term: "Total Rewards", definition: "A comprehensive compensation philosophy encompassing all financial and non-financial rewards provided to employees including salary, benefits, development, and work environment.", category: "Compensation & Benefits", letter: "T" },
  { term: "Turnover Rate", definition: "The percentage of employees who leave an organization within a given period, used as a key indicator of workforce stability and organizational health.", category: "Performance Management", letter: "T" },
  // W
  { term: "Workforce Planning", definition: "The strategic process of analyzing and forecasting the talent needed to execute organizational goals, ensuring the right people are in the right roles at the right time.", category: "HR Technology", letter: "W" },
];

const CATEGORY_COLOR = {
  "Recruitment & Talent Acquisition": "#00B6DC",
  "Performance Management": "#008CAA",
  "HR Technology": "#004E60",
  "Compensation & Benefits": "#50C0E0",
  "Employee Development": "#009678",
  "Employee Relations": "#006880",
};

export default function HRGlossary() {
  const [activeLetter, setActiveLetter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const wrapperRef = useRef(null);
  const gridRef = useRef(null);

  const filtered = useMemo(() => {
    let results = glossaryData;
    if (activeLetter !== "All" && activeLetter !== "#") {
      results = results.filter((t) => t.letter === activeLetter);
    }
    if (activeLetter === "#") {
      results = results.filter((t) => /^[^a-zA-Z]/.test(t.term));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    return results;
  }, [activeLetter, searchQuery]);

  // Hero entrance
  useEffect(() => {
    if (!wrapperRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-eyebrow]", { y: 24, opacity: 0, duration: 0.7, ease: "power4.out", delay: 0.1 });
      gsap.from("[data-hero-title]", { y: 64, opacity: 0, duration: 1, ease: "power4.out", delay: 0.2 });
      gsap.from("[data-hero-sub]", { y: 24, opacity: 0, duration: 0.7, ease: "power4.out", delay: 0.38 });
      gsap.from("[data-search]", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out", delay: 0.52 });
      gsap.from("[data-alpha-btn]", {
        y: 16, opacity: 0, duration: 0.45, ease: "power3.out", stagger: 0.02, delay: 0.65,
      });
    }, wrapperRef.current);
    return () => ctx.revert();
  }, []);

  // Card stagger on filter / search change
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-card]");
    if (!cards.length) return;
    gsap.fromTo(
      cards,
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.035, ease: "power3.out" }
    );
  }, [filtered]);

  const handleLetterClick = (letter) => {
    setActiveLetter(letter);
    setSearchQuery("");
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (activeLetter !== "All") setActiveLetter("All");
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.hero_bg_letter} aria-hidden="true">G</div>
        <p className={styles.eyebrow} data-hero-eyebrow>
          HR Reference
        </p>
        <h1 className={styles.title} data-hero-title>
          Glossary
        </h1>
        <p className={styles.subtitle} data-hero-sub>
          Navigate the language of modern hiring. Every term, explained.
        </p>
      </section>

      {/* ── Search ── */}
      <div className={styles.search_wrapper} data-search>
        <div className={styles.search_inner}>
          <svg className={styles.search_icon} viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className={styles.search_input}
            placeholder="Search glossary terms…"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <button className={styles.search_clear} onClick={() => setSearchQuery("")} aria-label="Clear search">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Alphabet nav ── */}
      <nav className={styles.alpha_nav} aria-label="Filter by letter">
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            data-alpha-btn
            className={`${styles.alpha_btn} ${activeLetter === letter ? styles.alpha_active : ""}`}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
      </nav>

      {/* ── Results count ── */}
      <div className={styles.results_meta}>
        <span className={styles.results_count}>
          {filtered.length} term{filtered.length !== 1 ? "s" : ""}
        </span>
        {(activeLetter !== "All" || searchQuery) && (
          <button
            className={styles.clear_filter}
            onClick={() => { setActiveLetter("All"); setSearchQuery(""); }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ── Grid ── */}
      <div className={styles.grid} ref={gridRef}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.empty_icon}>∅</span>
            <p>No terms found{searchQuery ? ` for "${searchQuery}"` : ` for letter "${activeLetter}"`}</p>
          </div>
        ) : (
          filtered.map(({ term, definition, category }) => (
            <article key={term} className={styles.card} data-card>
              <h3 className={styles.card_term}>{term}</h3>
              <div
                className={styles.card_divider}
                style={{ backgroundColor: CATEGORY_COLOR[category]}}
              />
              <p className={styles.card_def}>{definition}</p>
              <span
                className={styles.card_category}
                style={{ backgroundColor: CATEGORY_COLOR[category]}}
              >
                {category}
              </span>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
