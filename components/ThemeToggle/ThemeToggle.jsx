"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.scss";

const ThemeToggle = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className={styles.placeholder} />;

  const isDark = resolvedTheme === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      className={`${styles.toggle} ${isDark ? styles.dark : styles.light}`}
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Track */}
      <span className={styles.track}>
        {/* Stars (dark mode decoration) */}
        <span className={styles.stars}>
          <span className={styles.star} />
          <span className={styles.star} />
          <span className={styles.star} />
        </span>
        {/* Sun rays (light mode decoration) */}
        <span className={styles.sunRays}>
          {[...Array(8)].map((_, i) => (
            <span key={i} className={styles.ray} style={{ "--i": i }} />
          ))}
        </span>
        {/* Sliding knob */}
        <span className={styles.knob}>
          {/* Moon face */}
          <svg className={styles.moon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
          </svg>
          {/* Sun face */}
          <svg className={styles.sun} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="5" fill="currentColor" />
          </svg>
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;
