import HeroSection from "../components/HeroSection/HeroSection";
// import ScrollAnimationComponent from "../components/ScrollAnimationComponent/ScrollAnimationComponent";
import BrandsSection from "../components/BrandsSection/BrandsSection";
import MetricsSection from "../components/MetricsSection/MetricsSection";
import AICapabilitiesSection from "../components/AICapabilitiesSection/AICapabilitiesSection";
import FeaturesSection from "../components/FeaturesSection/FeaturesSection";
import HowWeWork from "../components/HowWeWork/HowWeWork";
import TestimonialsSection from "../components/TestimonialsSection/TestimonialsSection";
import FAQSection from "../components/FAQSection/FAQSection";
import ContactSection from "../components/ContactSection/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <ScrollAnimationComponent /> */}
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
