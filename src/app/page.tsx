import FAQsThree from "@/components/faqs-3";
import Features from "@/components/features-12";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero-section";
import IntegrationsSection from "@/components/integrations-1";
import TeamSection from "@/components/team";
import TestimonialsSection from "@/components/testimonials";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Features />
      <IntegrationsSection />
      <TestimonialsSection />
      <TeamSection />
      <FAQsThree />
      <FooterSection />
    </div>
  );
}
