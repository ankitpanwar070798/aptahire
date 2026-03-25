"use client";
import dynamic from "next/dynamic";

// All below-fold sections loaded lazily — keeps GSAP/ScrollTrigger out of the
// initial JS bundle so it doesn't block mobile paint.
const BrandsSection = dynamic(() => import("./BrandsSection/BrandsSection"), { ssr: false });
const MetricsSection = dynamic(() => import("./MetricsSection/MetricsSection"), { ssr: false });
const AICapabilitiesSection = dynamic(() => import("./AICapabilitiesSection/AICapabilitiesSection"), { ssr: false });
const FeaturesSection = dynamic(() => import("./FeaturesSection/FeaturesSection"), { ssr: false });
const HowWeWork = dynamic(() => import("./HowWeWork/HowWeWork"), { ssr: false });
const TestimonialsSection = dynamic(() => import("./TestimonialsSection/TestimonialsSection"), { ssr: false });
const FAQSection = dynamic(() => import("./FAQSection/FAQSection"), { ssr: false });
const ContactSection = dynamic(() => import("./ContactSection/ContactSection"), { ssr: false });

export default function BelowFoldSections() {
  return (
    <>
      <BrandsSection />
      <MetricsSection />
      <AICapabilitiesSection />
      <HowWeWork />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection sectionTitle="Reach us anywhere" />
    </>
  );
}
