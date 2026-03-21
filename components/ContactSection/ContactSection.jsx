"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./ContactSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

// ── Locations ─────────────────────────────────────────────────
const locations = [
  {
    id: "new-york",
    city: "New York",
    address: "350 Fifth Avenue, Suite 4200",
    fullAddress: "350 Fifth Avenue, Suite 4200\nNew York, NY 10118",
    phone: "+1 (212) 555-0123",
    email: "nyc@aptahire.com",
    mapQuery: "350+Fifth+Avenue+Suite+4200+New+York+NY+10118",
  },
  {
    id: "los-angeles",
    city: "Los Angeles",
    address: "633 West 5th Street, Suite 2600",
    fullAddress: "633 West 5th Street, Suite 2600\nLos Angeles, CA 90071",
    phone: "+1 (213) 555-0147",
    email: "la@aptahire.com",
    mapQuery: "633+West+5th+Street+Suite+2600+Los+Angeles+CA+90071",
  },
  {
    id: "chicago",
    city: "Chicago",
    address: "233 South Wacker Drive, Suite 8400",
    fullAddress: "233 South Wacker Drive, Suite 8400\nChicago, IL 60606",
    phone: "+1 (312) 555-0191",
    email: "chi@aptahire.com",
    mapQuery: "233+South+Wacker+Drive+Chicago+IL+60606",
  },
  {
    id: "miami",
    city: "Miami",
    address: "1395 Brickell Avenue, Suite 800",
    fullAddress: "1395 Brickell Avenue, Suite 800\nMiami, FL 33131",
    phone: "+1 (305) 555-0162",
    email: "mia@aptahire.com",
    mapQuery: "1395+Brickell+Avenue+Suite+800+Miami+FL+33131",
  },
  {
    id: "boston",
    city: "Boston",
    address: "100 Federal Street, Suite 2000",
    fullAddress: "100 Federal Street, Suite 2000\nBoston, MA 02110",
    phone: "+1 (617) 555-0134",
    email: "bos@aptahire.com",
    mapQuery: "100+Federal+Street+Suite+2000+Boston+MA+02110",
  },
  {
    id: "seattle",
    city: "Seattle",
    address: "1201 Third Avenue, Suite 5400",
    fullAddress: "1201 Third Avenue, Suite 5400\nSeattle, WA 98101",
    phone: "+1 (206) 555-0178",
    email: "sea@aptahire.com",
    mapQuery: "1201+Third+Avenue+Suite+5400+Seattle+WA+98101",
  },
];

// ── Icons ─────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.8 19.8 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.79a16 16 0 0 0 6.29 6.29l1.86-1.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────
export default function ContactSection({ sectionTitle = "Get in touch" }) {
  const [active, setActive] = useState(locations[0]);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const rootRef    = useRef(null);
  const detailRef  = useRef(null);
  const mapRef     = useRef(null);

  // Entrance animations
  useGSAP(() => {
    gsap.fromTo(
      rootRef.current?.querySelectorAll("[data-h]"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power4.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 80%", once: true } }
    );
    gsap.fromTo(
      rootRef.current?.querySelectorAll("[data-loc]"),
      { x: -24, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%", once: true } }
    );
    gsap.fromTo(
      rootRef.current?.querySelectorAll("[data-field]"),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 50%", once: true } }
    );
  }, { scope: rootRef });

  const handleSelect = (loc) => {
    if (loc.id === active.id) return;
    // Animate detail out and in
    if (detailRef.current) {
      gsap.fromTo(detailRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }
      );
    }
    if (mapRef.current) {
      gsap.fromTo(mapRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }
    setActive(loc);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section className={styles.section} ref={rootRef}>
      <div className={styles.container}>

        {/* ── Header ─────────────────────────────────────────── */}
        <div className={styles.header}>
          <span data-h className={styles.tag}>Locations</span>
          <h2 data-h className={styles.heading}>{sectionTitle}</h2>
          <p data-h className={styles.sub}>
            Reach out from any of our global offices or send us a message directly.
          </p>
        </div>

        {/* ── Body ───────────────────────────────────────────── */}
        <div className={styles.body}>

          {/* Left — location list */}
          <aside className={styles.sidebar}>
            <ul className={styles.loc_list}>
              {locations.map((loc) => (
                <li key={loc.id} data-loc>
                  <button
                    className={`${styles.loc_btn} ${active.id === loc.id ? styles.loc_active : ""}`}
                    onClick={() => handleSelect(loc)}
                  >
                    <span className={styles.loc_city}>{loc.city}</span>
                    <span className={styles.loc_addr}>{loc.address}</span>
                    <span className={styles.loc_arrow}><ArrowIcon /></span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Right — map + details + form */}
          <div className={styles.main}>

            {/* Map */}
            <div className={styles.map_wrap} ref={mapRef}>
              <iframe
                key={active.id}
                className={styles.map_iframe}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${active.mapQuery}&output=embed`}
                title={`Map — ${active.city}`}
              />
            </div>

            {/* Location detail */}
            <div className={styles.detail} ref={detailRef}>
              <div className={styles.detail_info}>
                <h3 className={styles.detail_city}>{active.city}</h3>
                <address className={styles.detail_address}>
                  <span className={styles.info_row}>
                    <PinIcon />
                    <span>{active.fullAddress.replace("\n", ", ")}</span>
                  </span>
                  <span className={styles.info_row}>
                    <PhoneIcon />
                    <a href={`tel:${active.phone}`}>{active.phone}</a>
                  </span>
                  <span className={styles.info_row}>
                    <MailIcon />
                    <a href={`mailto:${active.email}`}>{active.email}</a>
                  </span>
                </address>
              </div>
            </div>

            {/* Contact form */}
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.form_row}>
                <div className={styles.field_group} data-field>
                  <label className={styles.label}>Name <span className={styles.req}>*</span></label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className={styles.input}
                    value={formState.name}
                    onChange={(e) => setFormState(p => ({ ...p, name: e.target.value }))}
                    required
                  />
                </div>
                <div className={styles.field_group} data-field>
                  <label className={styles.label}>Email <span className={styles.req}>*</span></label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={styles.input}
                    value={formState.email}
                    onChange={(e) => setFormState(p => ({ ...p, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className={styles.field_group} data-field>
                <label className={styles.label}>Message <span className={styles.req}>*</span></label>
                <textarea
                  placeholder="How can we help you?"
                  className={styles.textarea}
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState(p => ({ ...p, message: e.target.value }))}
                  required
                />
              </div>

              <button data-field type="submit" className={`${styles.submit_btn} ${submitted ? styles.submitted : ""}`}>
                {submitted ? "Message Sent ✓" : "Send Message"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
}
