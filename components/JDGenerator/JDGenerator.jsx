"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { FiCopy, FiDownload, FiZap, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { FaLinkedinIn } from "react-icons/fa";
import {
  MdOutlineWorkOutline,
  MdOutlineQuestionAnswer,
  MdOutlineChecklist,
  MdOutlineEmail,
} from "react-icons/md";
import styles from "./JDGenerator.module.scss";

const JOB_TYPES = ["Full-Time", "Part-Time", "Contract", "Freelance", "Internship", "Remote"];
const EXPERIENCE_LEVELS = ["Entry Level", "Mid Level", "Senior Level", "Lead / Staff", "Manager", "Director / VP", "C-Suite / Executive"];
const TONES = ["Professional", "Friendly & Approachable", "Innovative & Bold", "Formal & Corporate", "Startup & Dynamic"];

const MORE_TOOLS = [
  {
    icon: <MdOutlineQuestionAnswer size={26} />,
    title: "Interview Question Generator",
    desc: "Get personalized, role-specific interview questions to identify the best candidates for your team.",
    href: "/ai-tools/interview-questions",
  },
  {
    icon: <FaLinkedinIn size={22} />,
    title: "LinkedIn Message Generator",
    desc: "Write persuasive and personalized outreach messages to grow your network effortlessly.",
    href: "/ai-tools/linkedin-message",
  },
  {
    icon: <MdOutlineChecklist size={26} />,
    title: "Candidate Onboarding Checklist",
    desc: "Ensure a seamless onboarding experience with detailed, customizable checklists for new hires.",
    href: "#",
  },
  {
    icon: <MdOutlineEmail size={26} />,
    title: "Professional Offer Letter Generator",
    desc: "Generate error-free and legally compliant offer letters tailored to your company's tone and policies.",
    href: "#",
  },
];

function renderMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/^## (.+)$/gm, '<h3 class="jd-section-title">$1</h3>')
    .replace(/^\*\*(.+?)\*\*$/gm, '<p class="jd-bold-line"><strong>$1</strong></p>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g, (match) => {
      const items = match.match(/<li>[\s\S]*?<\/li>/g) || [];
      return `<ul>${items.join("")}</ul>`;
    })
    .replace(/\n{2,}/g, '<div class="jd-spacer"></div>')
    .replace(/\n/g, "");
}

export default function JDGenerator() {
  const [form, setForm] = useState({
    jobTitle: "",
    companyName: "",
    industry: "",
    jobType: "Full-Time",
    experienceLevel: "Mid Level",
    keyResponsibilities: "",
    skills: "",
    tone: "Professional",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const outputRef = useRef(null);
  const outputPanelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero]",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.5 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (output) {
      const words = output.trim().split(/\s+/).filter(Boolean).length;
      setWordCount(words);
    } else {
      setWordCount(0);
    }
  }, [output]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.jobTitle.trim()) {
      setError("Job Title is required.");
      return;
    }
    if (!form.industry.trim()) {
      setError("Industry is required.");
      return;
    }
    if (!form.skills.trim()) {
      setError("Required Skills are required.");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/generate-jd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to generate job description.");
        return;
      }

      setOutput(data.jobDescription);

      // Scroll to output smoothly
      setTimeout(() => {
        outputPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        gsap.fromTo(
          outputPanelRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
      }, 100);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.jobTitle.replace(/\s+/g, "-").toLowerCase() || "job-description"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.page} ref={heroRef}>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.hero_bg}>
          <div className={styles.hero_glow} />
          <div className={styles.hero_grid} />
        </div>
        <div className={styles.hero_content}>
          <p className={`p mono ${styles.eyebrow}`} data-hero>
            <FiZap size={12} /> AI-Powered Tool
          </p>
          <h1 data-hero>
            Free Perfect <span className={styles.accent}>Job Description</span><br />
            <span className={styles.accent}>(JD) Generator</span>
          </h1>
          <p className={`p md ${styles.hero_sub}`} data-hero>
            Transform the way you write job descriptions! Our AI-powered Job Description Generator creates
            accurate, detailed, and tailored descriptions in seconds.
          </p>
          <p className={`p mono ${styles.breadcrumb}`} data-hero>
            Home &rsaquo; Free AI Job Description (JD) Generator &rsaquo; Aptahire
          </p>
        </div>
      </section>

      {/* ── MAIN TOOL ────────────────────────────────────── */}
      <section className={styles.tool_section}>
        <div className={styles.tool_grid}>
          {/* FORM */}
          <div className={styles.form_card} ref={formRef}>
            <div className={styles.form_header}>
              <HiOutlineSparkles size={18} className={styles.form_header_icon} />
              <span>Configure Your Job Description</span>
            </div>
            <form onSubmit={handleGenerate} className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="jobTitle">
                  Job Title <span className={styles.required}>*</span>
                </label>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  placeholder="E.g., Digital Marketing Manager"
                  value={form.jobTitle}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="companyName">Company Name</label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="E.g., Aptahire Technologies"
                  value={form.companyName}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="industry">
                  Industry <span className={styles.required}>*</span>
                </label>
                <input
                  id="industry"
                  name="industry"
                  type="text"
                  placeholder="E.g., Marketing, SaaS, Healthcare"
                  value={form.industry}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className={styles.field_row}>
                <div className={styles.field}>
                  <label htmlFor="jobType">Job Type</label>
                  <select id="jobType" name="jobType" value={form.jobType} onChange={handleChange}>
                    {JOB_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="experienceLevel">Experience Level</label>
                  <select id="experienceLevel" name="experienceLevel" value={form.experienceLevel} onChange={handleChange}>
                    {EXPERIENCE_LEVELS.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="keyResponsibilities">Key Responsibilities</label>
                <textarea
                  id="keyResponsibilities"
                  name="keyResponsibilities"
                  rows={3}
                  placeholder="E.g., SEO strategy, social media campaigns, PPC management"
                  value={form.keyResponsibilities}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="skills">
                  Required Skills <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  rows={3}
                  placeholder="E.g., Technical skills, Soft skills, communication"
                  value={form.skills}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="tone">Writing Tone</label>
                <select id="tone" name="tone" value={form.tone} onChange={handleChange}>
                  {TONES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              {error && (
                <div className={styles.error_msg}>
                  <FiAlertCircle size={15} />
                  <span>{error}</span>
                </div>
              )}

              <button type="submit" className={styles.generate_btn} disabled={loading}>
                {loading ? (
                  <>
                    <span className={styles.spinner} />
                    Generating...
                  </>
                ) : (
                  <>
                    <HiOutlineSparkles size={16} />
                    Generate Description
                  </>
                )}
              </button>
            </form>
          </div>

          {/* OUTPUT */}
          <div className={styles.output_panel} ref={outputPanelRef}>
            <div className={styles.output_header}>
              <div className={styles.output_title}>
                <MdOutlineWorkOutline size={18} />
                <span>Generated Job Description</span>
                {output && <span className={styles.word_badge}>{wordCount} words</span>}
              </div>
              {output && (
                <div className={styles.output_actions}>
                  <button onClick={handleCopy} className={styles.action_btn} title="Copy to clipboard">
                    {copied ? <FiCheckCircle size={15} /> : <FiCopy size={15} />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button onClick={handleDownload} className={styles.action_btn} title="Download as .txt">
                    <FiDownload size={15} />
                    Download
                  </button>
                </div>
              )}
            </div>

            <div className={styles.output_body} ref={outputRef}>
              {loading && (
                <div className={styles.loading_state}>
                  <div className={styles.loading_orb} />
                  <p>Crafting your perfect job description<span className={styles.dot_anim}>...</span></p>
                  <p className={`p mono ${styles.loading_sub}`}>Analyzing role requirements & industry standards</p>
                </div>
              )}
              {!loading && !output && (
                <div className={styles.empty_state}>
                  <div className={styles.empty_icon}>
                    <HiOutlineSparkles size={32} />
                  </div>
                  <p>Your generated job description will appear here.</p>
                  <p className={`p mono ${styles.empty_sub}`}>Fill in the form and click Generate Description</p>
                </div>
              )}
              {!loading && output && (
                <div
                  className={styles.jd_content}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(output) }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── MORE TOOLS ───────────────────────────────────── */}
      <section className={styles.more_tools}>
        <div className={styles.more_tools_inner}>
          <p className={`p mono ${styles.more_label}`}>More Tools</p>
          <h2 className={styles.more_title}>
            Explore More Smart AI Tools for{" "}
            <span className={styles.accent}>Hiring Success</span>
          </h2>
          <p className={`p md ${styles.more_sub}`}>
            Boost your recruitment process with our suite of AI-driven tools designed to save time and deliver exceptional results.
          </p>
          <div className={styles.tools_grid}>
            {MORE_TOOLS.map((tool) => (
              <a
                key={tool.title}
                href={tool.href}
                className={styles.tool_card}
              >
                <div className={styles.tool_card_icon}>{tool.icon}</div>
                <h4 className={styles.tool_card_title}>{tool.title}</h4>
                <p className={styles.tool_card_desc}>{tool.desc}</p>
                <span className={styles.tool_card_link}>Learn more →</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
