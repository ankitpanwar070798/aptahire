"use client";
import dynamic from "next/dynamic";

// All below-fold sections loaded lazily — keeps GSAP/ScrollTrigger out of the
// initial JS bundle so it doesn't block mobile paint.
const BrandsSection = dynamic(() => import("./BrandsSection/BrandsSection"), { ssr: false });
const AICapabilitiesSection = dynamic(() => import("./AICapabilitiesSection/AICapabilitiesSection"), { ssr: false });
const ImageShowcaseSection = dynamic(() => import("./ImageShowcaseSection/ImageShowcaseSection"), { ssr: false });
const FeaturesSection = dynamic(() => import("./FeaturesSection/FeaturesSection"), { ssr: false });
const BentoGallerySection = dynamic(() => import("./BentoGallerySection/BentoGallerySection"), { ssr: false });
const HowWeWork = dynamic(() => import("./HowWeWork/HowWeWork"), { ssr: false });
const TestimonialsSection = dynamic(() => import("./TestimonialsSection/TestimonialsSection"), { ssr: false });
const FAQSection = dynamic(() => import("./FAQSection/FAQSection"), { ssr: false });
const ContactSection = dynamic(() => import("./ContactSection/ContactSection"), { ssr: false });

export default function BelowFoldSections() {
  return (
    <>
      <BrandsSection />
      <HowWeWork />
      <AICapabilitiesSection />
      <ImageShowcaseSection />
      <FeaturesSection />
      <BentoGallerySection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection sectionTitle="Reach us anywhere" />
    </>
  );
}
