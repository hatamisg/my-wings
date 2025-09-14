import FAQsThree from "@/components/faqs-3";
import AboutSection from "@/components/about-section";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero-section";
import ProjectSection from "@/components/project-section";
import BlogSection from "@/components/blog-section";
import AdviceSection from "@/components/advice-section";
import { getFeaturedProjects } from "@/lib/actions/projects";
import { getFeaturedBlogs } from "@/lib/actions/blogs";

export default async function Home() {
  // Fetch data from Supabase
  const [projects, blogs] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedBlogs()
  ]);

  return (
    <div>
      <HeroSection />
      <AboutSection id="about" />
      <ProjectSection id="projects" projects={projects} />
      <AdviceSection />
      <BlogSection id="blog" blogs={blogs} />
      <FAQsThree id="faqs" />
      <FooterSection />
    </div>
  );
}
