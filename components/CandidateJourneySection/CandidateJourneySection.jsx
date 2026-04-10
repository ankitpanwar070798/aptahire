"use client";
import styles from "./CandidateJourneySection.module.scss";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });

// ─── SVG Isometric Mockups ────────────────────────────────────────────────────

const MockupDashboard = () => (
  <svg viewBox="0 0 420 266" xmlns="http://www.w3.org/2000/svg" className={styles.mockup_svg}>
    <defs>
      <linearGradient id="bg_d" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#06091a" />
        <stop offset="100%" stopColor="#080f1e" />
      </linearGradient>
      <linearGradient id="fade_d" x1="0" y1="0" x2="0" y2="1">
        <stop offset="65%" stopColor="transparent" />
        <stop offset="100%" stopColor="#06091a" />
      </linearGradient>
      <radialGradient id="glow_d" cx="50%" cy="100%" r="60%">
        <stop offset="0%" stopColor="#4f8ef7" stopOpacity="0.12" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>

    {/* Base background */}
    <rect width="420" height="266" fill="url(#bg_d)" rx="14" />
    <rect width="420" height="266" fill="url(#glow_d)" rx="14" />

    {/* Nav bar */}
    <rect width="420" height="34" fill="#080f1e" rx="14" />
    <rect y="20" width="420" height="14" fill="#080f1e" />

    {/* Logo */}
    <text x="14" y="23" fill="#4f8ef7" fontSize="11" fontWeight="800" letterSpacing="-0.6">aptahire™</text>

    {/* Logout btn */}
    <rect x="358" y="10" width="48" height="16" rx="8" fill="#0c1e38" />
    <text x="366" y="22" fill="#6fbbee" fontSize="7.5" fontWeight="600">Logout</text>

    {/* Page title */}
    <text x="16" y="56" fill="#d4ebfa" fontSize="11" fontWeight="700">Your Interview Rounds</text>

    {/* Round 1 Card */}
    <rect x="16" y="64" width="140" height="118" rx="10" fill="#0a1428" stroke="#0d2040" strokeWidth="1" />
    <text x="28" y="84" fill="#d4ebfa" fontSize="9" fontWeight="700">Round 1: Apptitude</text>
    <text x="28" y="98" fill="#3a75e8" fontSize="8">Apt</text>
    <rect x="28" y="106" width="52" height="11" rx="5.5" fill="#0c1e38" />
    <text x="32" y="115.5" fill="#94c7f0" fontSize="6.5">Duration: 30 min</text>
    <rect x="86" y="106" width="40" height="11" rx="5.5" fill="#0c1e38" />
    <text x="90" y="115.5" fill="#94c7f0" fontSize="6.5">Questions: 5</text>
    <rect x="28" y="156" width="50" height="18" rx="9" fill="#4f8ef7" />
    <text x="41" y="168.5" fill="#030812" fontSize="8.5" fontWeight="800">Start</text>

    {/* Round 2 Card */}
    <rect x="166" y="64" width="140" height="118" rx="10" fill="#0a1428" stroke="#0d2040" strokeWidth="1" />
    <text x="178" y="84" fill="#d4ebfa" fontSize="9" fontWeight="700">Round 2: Technical</text>
    <text x="178" y="98" fill="#3a75e8" fontSize="8">Tech</text>
    <rect x="178" y="106" width="52" height="11" rx="5.5" fill="#0c1e38" />
    <text x="182" y="115.5" fill="#94c7f0" fontSize="6.5">Duration: 30 min</text>
    <rect x="236" y="106" width="40" height="11" rx="5.5" fill="#0c1e38" />
    <text x="240" y="115.5" fill="#94c7f0" fontSize="6.5">Questions: 5</text>
    <rect x="178" y="156" width="50" height="18" rx="9" fill="#0d1d35" />
    <text x="185" y="168.5" fill="#3a75e8" fontSize="8">pending</text>

    {/* Profile sidebar */}
    <rect x="322" y="44" width="84" height="212" rx="10" fill="#0a1428" stroke="#0d2040" strokeWidth="1" />
    <circle cx="364" cy="70" r="15" fill="#0f2847" />
    <circle cx="364" cy="70" r="15" fill="none" stroke="#4f8ef7" strokeWidth="1.5" />
    <text x="357" y="75" fill="#6fbbee" fontSize="10.5" fontWeight="800">YM</text>
    <text x="330" y="92" fill="#d4ebfa" fontSize="6.5" fontWeight="700">Welcome,</text>
    <text x="326" y="102" fill="#d4ebfa" fontSize="6.5" fontWeight="700">YOKESHWARAN M !</text>
    <text x="328" y="112" fill="#3a75e8" fontSize="5.5">Application ID: 0a358...</text>
    <text x="328" y="122" fill="#94c7f0" fontSize="5.5">Business Analyst · Full‑time</text>
    <rect x="330" y="128" width="14" height="14" rx="4" fill="#0f2847" />
    <rect x="348" y="128" width="14" height="14" rx="4" fill="#0f2847" />
    <text x="336" y="139" fill="#4f8ef7" fontSize="8">👤</text>
    <text x="354" y="139" fill="#4f8ef7" fontSize="8">📞</text>
    <text x="328" y="156" fill="#d4ebfa" fontSize="7" fontWeight="600">Your Profile</text>
    <rect x="328" y="160" width="24" height="24" rx="5" fill="#0c1e38" />
    <text x="334" y="176" fill="#4f8ef7" fontSize="9" fontWeight="700">25</text>
    <rect x="356" y="160" width="24" height="24" rx="5" fill="#0c1e38" />
    <text x="360" y="176" fill="#4f8ef7" fontSize="8">male</text>
    <rect x="328" y="190" width="72" height="24" rx="5" fill="#0c1e38" />
    <text x="334" y="202" fill="#94c7f0" fontSize="6.5">Resume Submitted</text>
    <text x="336" y="212" fill="#3a75e8" fontSize="5.5">April 6, 2026</text>
    <text x="328" y="226" fill="#d4ebfa" fontSize="6.5" fontWeight="600">Contact details</text>
    <text x="328" y="237" fill="#94c7f0" fontSize="5.5">mkyvyoke@gmail.com</text>
    <text x="328" y="248" fill="#94c7f0" fontSize="5.5">+91 8778591229</text>

    <rect width="420" height="266" fill="url(#fade_d)" rx="14" />
  </svg>
);

const MockupRules = () => (
  <svg viewBox="0 0 420 266" xmlns="http://www.w3.org/2000/svg" className={styles.mockup_svg}>
    <defs>
      <linearGradient id="bg_r" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#06091a" />
        <stop offset="100%" stopColor="#080f1e" />
      </linearGradient>
      <linearGradient id="fade_r" x1="0" y1="0" x2="0" y2="1">
        <stop offset="60%" stopColor="transparent" />
        <stop offset="100%" stopColor="#06091a" />
      </linearGradient>
    </defs>

    <rect width="420" height="266" fill="url(#bg_r)" rx="14" />

    {/* Nav */}
    <rect width="420" height="34" fill="#080f1e" rx="14" />
    <rect y="20" width="420" height="14" fill="#080f1e" />
    <text x="14" y="23" fill="#4f8ef7" fontSize="11" fontWeight="800" letterSpacing="-0.6">aptahire™</text>
    <rect x="336" y="10" width="76" height="16" rx="8" fill="#0c1e38" />
    <text x="346" y="22" fill="#94c7f0" fontSize="7">Round: Apptitude</text>

    {/* Progress steps */}
    <rect x="35" y="40" width="350" height="2" fill="#0c1e38" />
    <rect x="35" y="40" width="87" height="2" fill="#4f8ef7" />
    <circle cx="35" cy="41" r="5" fill="#4f8ef7" />
    <text x="32" y="44" fill="#030812" fontSize="7" fontWeight="900">✓</text>
    <circle cx="122" cy="41" r="5" fill="#4f8ef7" />
    <circle cx="209" cy="41" r="4" fill="#0c1e38" />
    <circle cx="296" cy="41" r="4" fill="#0c1e38" />
    <text x="22" y="54" fill="#94c7f0" fontSize="5.5">Introduction</text>
    <text x="96" y="54" fill="#94c7f0" fontSize="5.5">Device capability</text>
    <text x="183" y="54" fill="#3a75e8" fontSize="5.5">Enable Media</text>
    <text x="268" y="54" fill="#3a75e8" fontSize="5.5">Preparing Interview</text>

    {/* Shield icon + heading */}
    <circle cx="42" cy="72" r="8" fill="#0f2847" />
    <text x="38" y="76.5" fill="#4f8ef7" fontSize="9">🛡</text>
    <text x="58" y="70" fill="#94c7f0" fontSize="9" fontWeight="700">AI-Proctored Interview – Monitoring Notice</text>
    <text x="58" y="81" fill="#3a75e8" fontSize="7">This session will be monitored by automated systems.</text>

    {/* Rule block 1 - full width */}
    <rect x="20" y="90" width="380" height="32" rx="7" fill="#0a1428" stroke="#0c1e38" strokeWidth="1" />
    <circle cx="34" cy="106" r="5" fill="#0f2847" />
    <circle cx="34" cy="106" r="2.5" fill="#4f8ef7" />
    <text x="46" y="103" fill="#d4ebfa" fontSize="8" fontWeight="600">Monitoring &amp; Fair Use</text>
    <text x="46" y="114" fill="#94c7f0" fontSize="6.5">AI‑proctored to maintain fairness. Monitoring active only during the interview session.</text>

    {/* Rule blocks row 2 */}
    <rect x="20" y="128" width="186" height="30" rx="7" fill="#0a1428" stroke="#0c1e38" strokeWidth="1" />
    <circle cx="34" cy="143" r="5" fill="#0f2847" />
    <circle cx="34" cy="143" r="2.5" fill="#3a75e8" />
    <text x="44" y="140" fill="#d4ebfa" fontSize="8" fontWeight="600">Screen Sharing</text>
    <text x="44" y="151" fill="#94c7f0" fontSize="6.5">Share full screen. Keep active throughout interview.</text>
    <rect x="214" y="128" width="186" height="30" rx="7" fill="#0a1428" stroke="#0c1e38" strokeWidth="1" />
    <circle cx="228" cy="143" r="5" fill="#0f2847" />
    <circle cx="228" cy="143" r="2.5" fill="#6fbbee" />
    <text x="238" y="140" fill="#d4ebfa" fontSize="8" fontWeight="600">Camera &amp; Microphone</text>
    <text x="238" y="151" fill="#94c7f0" fontSize="6.5">Keep cam + mic on. Face clearly visible.</text>

    {/* Rule blocks row 3 */}
    <rect x="20" y="164" width="186" height="30" rx="7" fill="#0a1428" stroke="#0c1e38" strokeWidth="1" />
    <circle cx="34" cy="179" r="5" fill="#0f2847" />
    <circle cx="34" cy="179" r="2.5" fill="#4f8ef7" />
    <text x="44" y="176" fill="#d4ebfa" fontSize="8" fontWeight="600">Environment &amp; Integrity</text>
    <text x="44" y="187" fill="#94c7f0" fontSize="6.5">Quiet space. No external help, devices, or notes.</text>
    <rect x="214" y="164" width="186" height="30" rx="7" fill="#0a1428" stroke="#0c1e38" strokeWidth="1" />
    <circle cx="228" cy="179" r="5" fill="#0f2847" />
    <circle cx="228" cy="179" r="2.5" fill="#3a75e8" />
    <text x="238" y="176" fill="#d4ebfa" fontSize="8" fontWeight="600">Internet &amp; Technical</text>
    <text x="238" y="187" fill="#94c7f0" fontSize="6.5">Stable connection. Close unnecessary apps first.</text>

    {/* Footer consent */}
    <rect x="20" y="200" width="10" height="10" rx="2.5" fill="#4f8ef7" />
    <text x="36" y="209" fill="#94c7f0" fontSize="7">I have read and agree to the monitoring terms.</text>
    <rect x="304" y="198" width="96" height="20" rx="10" fill="#4f8ef7" />
    <text x="317" y="211.5" fill="#030812" fontSize="8" fontWeight="700">I'm Ready to Start</text>

    <rect width="420" height="266" fill="url(#fade_r)" rx="14" />
  </svg>
);

const MockupDeviceCheck = () => (
  <svg viewBox="0 0 420 266" xmlns="http://www.w3.org/2000/svg" className={styles.mockup_svg}>
    <defs>
      <linearGradient id="bg_c" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#06091a" />
        <stop offset="100%" stopColor="#080f1e" />
      </linearGradient>
      <linearGradient id="fade_c" x1="0" y1="0" x2="0" y2="1">
        <stop offset="60%" stopColor="transparent" />
        <stop offset="100%" stopColor="#06091a" />
      </linearGradient>
    </defs>

    <rect width="420" height="266" fill="url(#bg_c)" rx="14" />

    {/* Nav */}
    <rect width="420" height="34" fill="#080f1e" rx="14" />
    <rect y="20" width="420" height="14" fill="#080f1e" />
    <text x="14" y="23" fill="#4f8ef7" fontSize="11" fontWeight="800" letterSpacing="-0.6">aptahire™</text>
    <rect x="336" y="10" width="76" height="16" rx="8" fill="#0c1e38" />
    <text x="346" y="22" fill="#94c7f0" fontSize="7">Round: Apptitude</text>

    {/* Progress steps – step 2 active */}
    <rect x="35" y="40" width="350" height="2" fill="#0c1e38" />
    <rect x="35" y="40" width="180" height="2" fill="#4f8ef7" />
    <circle cx="35" cy="41" r="5" fill="#4f8ef7" />
    <text x="32" y="44" fill="#030812" fontSize="7" fontWeight="900">✓</text>
    <circle cx="122" cy="41" r="5" fill="#4f8ef7" />
    <text x="119" y="44" fill="#030812" fontSize="7" fontWeight="900">✓</text>
    <circle cx="209" cy="41" r="5" fill="#4f8ef7" />
    <text x="206" y="44" fill="#030812" fontSize="7" fontWeight="900">✓</text>
    <circle cx="296" cy="41" r="4" fill="#0c1e38" />
    <text x="22" y="54" fill="#94c7f0" fontSize="5.5">Introduction</text>
    <text x="96" y="54" fill="#6fbbee" fontSize="5.5">Device capability</text>
    <text x="183" y="54" fill="#6fbbee" fontSize="5.5">Enable Media</text>
    <text x="268" y="54" fill="#3a75e8" fontSize="5.5">Preparing Interview</text>

    {/* Main check card */}
    <rect x="70" y="64" width="280" height="180" rx="12" fill="#0a1428" stroke="#0d2040" strokeWidth="1" />

    {/* Screenshare row */}
    <circle cx="92" cy="90" r="8" fill="#0f2847" />
    <circle cx="92" cy="90" r="4" fill="#4f8ef7" />
    <text x="88" y="93.5" fill="#030812" fontSize="6" fontWeight="900">✓</text>
    <text x="106" y="87" fill="#d4ebfa" fontSize="8.5" fontWeight="600">Screenshare Capability</text>
    <rect x="106" y="93" width="232" height="18" rx="6" fill="#07101e" stroke="#0c1e38" strokeWidth="1" />
    <text x="118" y="106" fill="#94c7f0" fontSize="7">› Details</text>

    {/* Audio & Video row */}
    <circle cx="92" cy="127" r="8" fill="#0f2847" />
    <circle cx="92" cy="127" r="4" fill="#4f8ef7" />
    <text x="88" y="130.5" fill="#030812" fontSize="6" fontWeight="900">✓</text>
    <text x="106" y="124" fill="#d4ebfa" fontSize="8.5" fontWeight="600">Audio &amp; Video Capability</text>
    <rect x="106" y="130" width="232" height="18" rx="6" fill="#07101e" stroke="#0c1e38" strokeWidth="1" />
    <text x="118" y="143" fill="#94c7f0" fontSize="7">› Details</text>

    {/* Network row */}
    <circle cx="92" cy="164" r="8" fill="#0f2847" />
    <circle cx="92" cy="164" r="4" fill="#4f8ef7" />
    <text x="88" y="167.5" fill="#030812" fontSize="6" fontWeight="900">✓</text>
    <text x="106" y="161" fill="#d4ebfa" fontSize="8.5" fontWeight="600">Network Capability</text>
    <rect x="106" y="167" width="232" height="18" rx="6" fill="#07101e" stroke="#0c1e38" strokeWidth="1" />
    <text x="118" y="180" fill="#94c7f0" fontSize="7">› Measured metrics</text>

    {/* System row */}
    <circle cx="92" cy="201" r="8" fill="#0f2847" />
    <circle cx="92" cy="201" r="4" fill="#4f8ef7" />
    <text x="88" y="204.5" fill="#030812" fontSize="6" fontWeight="900">✓</text>
    <text x="106" y="198" fill="#d4ebfa" fontSize="8.5" fontWeight="600">System Capability</text>
    <rect x="106" y="204" width="232" height="18" rx="6" fill="#07101e" stroke="#0c1e38" strokeWidth="1" />
    <text x="118" y="217" fill="#94c7f0" fontSize="7">› Measured metrics</text>

    {/* Next btn */}
    <rect x="310" y="232" width="54" height="18" rx="9" fill="#0c1e38" />
    <text x="320" y="244.5" fill="#d4ebfa" fontSize="7.5" fontWeight="600">Next →</text>

    <rect width="420" height="266" fill="url(#fade_c)" rx="14" />
  </svg>
);

const MockupMediaSetup = () => (
  <svg viewBox="0 0 420 266" xmlns="http://www.w3.org/2000/svg" className={styles.mockup_svg}>
    <defs>
      <linearGradient id="bg_m" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#06091a" />
        <stop offset="100%" stopColor="#080f1e" />
      </linearGradient>
      <linearGradient id="fade_m" x1="0" y1="0" x2="0" y2="1">
        <stop offset="60%" stopColor="transparent" />
        <stop offset="100%" stopColor="#06091a" />
      </linearGradient>
      <radialGradient id="cam_bg" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#0f2847" />
        <stop offset="100%" stopColor="#061220" />
      </radialGradient>
    </defs>

    <rect width="420" height="266" fill="url(#bg_m)" rx="14" />

    {/* Nav */}
    <rect width="420" height="34" fill="#080f1e" rx="14" />
    <rect y="20" width="420" height="14" fill="#080f1e" />
    <text x="14" y="23" fill="#4f8ef7" fontSize="11" fontWeight="800" letterSpacing="-0.6">aptahire™</text>
    <rect x="286" y="10" width="62" height="16" rx="8" fill="#0c1e38" />
    <text x="294" y="22" fill="#94c7f0" fontSize="7">Round: Apptitude</text>
    <rect x="354" y="10" width="58" height="16" rx="8" fill="#0f2847" />
    <text x="358" y="22" fill="#6fbbee" fontSize="7">Terms &amp; Conditions</text>

    {/* Progress steps – step 3 active */}
    <rect x="35" y="40" width="296" height="2" fill="#4f8ef7" />
    <rect x="331" y="40" width="54" height="2" fill="#0c1e38" />
    <circle cx="35" cy="41" r="5" fill="#4f8ef7" />
    <text x="32" y="44" fill="#030812" fontSize="7" fontWeight="900">✓</text>
    <circle cx="122" cy="41" r="5" fill="#4f8ef7" />
    <text x="119" y="44" fill="#030812" fontSize="7" fontWeight="900">✓</text>
    <circle cx="209" cy="41" r="5" fill="#4f8ef7" />
    <text x="205" y="44" fill="#030812" fontSize="7" fontWeight="900">✓</text>
    <circle cx="296" cy="41" r="5" fill="#4f8ef7" />
    <circle cx="331" cy="41" r="4" fill="#0c1e38" />
    <text x="22" y="54" fill="#94c7f0" fontSize="5.5">Introduction</text>
    <text x="96" y="54" fill="#94c7f0" fontSize="5.5">Device capability</text>
    <text x="183" y="54" fill="#6fbbee" fontSize="5.5">Enable Media</text>
    <text x="272" y="54" fill="#3a75e8" fontSize="5.5">Preparing</text>

    {/* Left panel - setup */}
    <rect x="10" y="62" width="124" height="194" rx="10" fill="#0a1428" stroke="#0d2040" strokeWidth="1" />
    <text x="20" y="80" fill="#d4ebfa" fontSize="8.5" fontWeight="700">Setup</text>
    <rect x="68" y="68" width="58" height="15" rx="7.5" fill="#0c1e38" />
    <text x="72" y="79.5" fill="#94c7f0" fontSize="6">⚡ Quick setup tour</text>

    {/* Camera */}
    <rect x="20" y="88" width="104" height="15" rx="6" fill="#07101e" />
    <text x="28" y="99" fill="#94c7f0" fontSize="7">Camera</text>
    <rect x="96" y="90" width="24" height="11" rx="5.5" fill="#0f2847" />
    <text x="99" y="99" fill="#4f8ef7" fontSize="6.5">Enabled</text>

    {/* Microphone */}
    <rect x="20" y="108" width="104" height="15" rx="6" fill="#07101e" />
    <text x="28" y="119" fill="#94c7f0" fontSize="7">Microphone</text>
    <rect x="96" y="110" width="24" height="11" rx="5.5" fill="#0f2847" />
    <text x="99" y="119" fill="#4f8ef7" fontSize="6.5">Enabled</text>

    {/* Screen share */}
    <rect x="20" y="128" width="104" height="15" rx="6" fill="#07101e" />
    <text x="28" y="139" fill="#94c7f0" fontSize="7">Screen share</text>
    <rect x="96" y="130" width="24" height="11" rx="5.5" fill="#0f2847" />
    <text x="99" y="139" fill="#4f8ef7" fontSize="6.5">Enabled</text>

    <text x="20" y="158" fill="#d4ebfa" fontSize="7" fontWeight="600">Optional tests</text>
    <text x="20" y="170" fill="#94c7f0" fontSize="6">Mic recording sample</text>
    <text x="20" y="181" fill="#94c7f0" fontSize="6">Speaker / headphone test</text>

    <rect x="20" y="190" width="104" height="17" rx="8.5" fill="#0f2847" />
    <text x="24" y="201.5" fill="#6fbbee" fontSize="6.5" fontWeight="600">Proceed to interview →</text>

    {/* Right – camera preview panel */}
    <rect x="142" y="62" width="270" height="114" rx="10" fill="#0a1428" stroke="#0d2040" strokeWidth="1" />
    <text x="152" y="78" fill="#d4ebfa" fontSize="8" fontWeight="600">Camera preview</text>
    <rect x="220" y="66" width="44" height="14" rx="7" fill="#0f2847" />
    <text x="226" y="77" fill="#4f8ef7" fontSize="7">Enabled</text>
    {/* Camera feed area */}
    <rect x="152" y="82" width="250" height="84" rx="7" fill="url(#cam_bg)" />
    {/* Silhouette face */}
    <ellipse cx="277" cy="122" rx="20" ry="26" fill="#0e2a4a" />
    <ellipse cx="277" cy="110" rx="12" ry="14" fill="#1a3d6a" />
    <ellipse cx="271" cy="108" rx="2.5" ry="3" fill="#4f8ef7" opacity="0.7" />
    <ellipse cx="283" cy="108" rx="2.5" ry="3" fill="#4f8ef7" opacity="0.7" />
    <path d="M 270 117 Q 277 122 284 117" stroke="#4f8ef7" strokeWidth="1.5" fill="none" opacity="0.6" />
    <text x="152" y="175" fill="#3a75e8" fontSize="6.5">Ensure your face is clearly visible with good lighting.</text>

    {/* Mic test block */}
    <rect x="142" y="182" width="130" height="68" rx="10" fill="#0a1428" stroke="#0d2040" strokeWidth="1" />
    <text x="152" y="198" fill="#d4ebfa" fontSize="7.5" fontWeight="600">Microphone test (optional)</text>
    <rect x="228" y="187" width="36" height="12" rx="6" fill="#0f2847" />
    <text x="232" y="197" fill="#4f8ef7" fontSize="7">Enabled</text>
    <text x="152" y="212" fill="#94c7f0" fontSize="6">Record a 10‑second sample.</text>
    <rect x="152" y="220" width="54" height="14" rx="7" fill="#0f2847" />
    <text x="156" y="230.5" fill="#94c7f0" fontSize="6.5">Start 10s mic test</text>
    <rect x="212" y="220" width="48" height="14" rx="7" fill="#0c1e38" />
    <text x="220" y="230.5" fill="#94c7f0" fontSize="6.5">Play sample</text>

    {/* Speaker test block */}
    <rect x="280" y="182" width="132" height="68" rx="10" fill="#0a1428" stroke="#0d2040" strokeWidth="1" />
    <text x="290" y="198" fill="#d4ebfa" fontSize="7.5" fontWeight="600">Speaker test (optional)</text>
    <text x="290" y="212" fill="#94c7f0" fontSize="6">Play a test sound to confirm audio.</text>
    <rect x="290" y="220" width="104" height="14" rx="7" fill="#0c1e38" />
    <text x="322" y="230.5" fill="#94c7f0" fontSize="6.5">Play test sound</text>

    <rect width="420" height="266" fill="url(#fade_m)" rx="14" />
  </svg>
);

// ─── Step Data ────────────────────────────────────────────────────────────────

const steps = [
  {
    step: "01",
    title: "Interview Dashboard",
    description:
      "Candidates receive a secure link and access a personalized dashboard showing their assigned rounds, round status, and full profile at a glance.",
    Mockup: MockupDashboard,
  },
  {
    step: "02",
    title: "Rules & Consent",
    description:
      "Transparent AI‑proctoring guidelines are laid out before starting. Candidates acknowledge monitoring rules covering camera, screen, audio, and environment.",
    Mockup: MockupRules,
  },
  {
    step: "03",
    title: "Device Capability Check",
    description:
      "An automated pre‑flight scans screenshare, audio & video, network speed, and system health — ensuring zero technical surprises mid‑interview.",
    Mockup: MockupDeviceCheck,
  },
  {
    step: "04",
    title: "Media Setup & Test",
    description:
      "Candidates verify camera, microphone, and screen share are live and clear. Optional mic recording and speaker tests confirm audio quality before entering.",
    Mockup: MockupMediaSetup,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CandidateJourneySection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(
    () => {
      // --- header reveal ---
      if (headerRef.current) {
        const children = Array.from(headerRef.current.children);
        gsap.from(children, {
          y: 48,
          opacity: 0,
          stagger: 0.14,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 82%",
          },
        });
      }

      // --- cards reveal ---
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(`.${styles.card}`);

        gsap.from(cards, {
          y: 90,
          opacity: 0,
          scale: 0.88,
          stagger: 0.18,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 78%",
          },
        });


      }

      // --- parallax background orb ---
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Background glows */}
      <div ref={bgRef} className={styles.bg_orb} aria-hidden />
      <div className={styles.bg_grid} aria-hidden />

      <div className={styles.container}>
        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>Candidate Experience</span>
          <h2 className={styles.title}>
            From Invite to Interview —{" "}
            <span className={styles.title_accent}>
              Four Steps to a Seamless Journey
            </span>
          </h2>
          <p className={styles.description}>
            Once a job is posted, share a single link with your candidates.
            They move through a guided, AI‑proctored flow — from dashboard
            to live interview — without a single manual touchpoint from your team.
          </p>
        </div>

        {/* Step connector */}
        <div className={styles.connector} aria-hidden>
          {steps.map((s, i) => (
            <div key={s.step} className={styles.connector_item}>
              <span className={styles.connector_badge}>{s.step}</span>
              {i < steps.length - 1 && (
                <span className={styles.connector_line} />
              )}
            </div>
          ))}
        </div>

        {/* Cards */}
        <div ref={cardsRef} className={styles.cards_grid}>
          {steps.map((s, i) => (
            <div
              key={s.step}
              className={`${styles.card} ${i % 2 === 1 ? styles.card_offset : ""}`}
            >
              <div className={styles.card_frame}>
                <s.Mockup />
                <div className={styles.card_glow} aria-hidden />
                {/* corner accent */}
                <span className={styles.card_corner} aria-hidden />
              </div>
              <div className={styles.card_info}>
                <h3 className={styles.card_title}>{s.title}</h3>
                <p className={styles.card_desc}>{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
