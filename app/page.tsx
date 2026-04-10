import { HeroSection } from '@/components/portfolio/hero-section'
import { AboutSection } from '@/components/portfolio/about-section'
import { SkillsSection } from '@/components/portfolio/skills-section'
import { ExperienceSection } from '@/components/portfolio/experience-section'
import { FeaturedProjects } from '@/components/portfolio/featured-projects'

export default function HomePage() {
  return (
    <div className="pt-16 lg:pt-20">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <FeaturedProjects />
    </div>
  )
}
