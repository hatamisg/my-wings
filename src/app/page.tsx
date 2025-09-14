import FAQsThree from "@/components/faqs-3";
import AboutSection from "@/components/about-section";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero-section";
import ProjectSection from "@/components/project-section";
import BlogSection from "@/components/blog-section";
import AdviceSection from "@/components/advice-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection id="about" />
      <ProjectSection id="projects" />
      <AdviceSection />
      <BlogSection id="blog" />
      <FAQsThree id="faqs" />
      <FooterSection />
    </div>
  );
}
