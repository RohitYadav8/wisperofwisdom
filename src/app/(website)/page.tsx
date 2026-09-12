import { HeroSection } from "../../components/home/hero-section";
import { WelcomeSection } from "../../components/home/welcome-section";
import { JourneySection } from "../../components/home/journey-section";
import { AuthorSection } from "../../components/home/author-section";
import { LatestReviewsSection } from "../../components/home/latest-reviews-section";
import { TestimonialsSection } from "../../components/home/testimonials-section";
import { CommunitySection } from "../../components/home/community-section";
import { StatsSection } from "../../components/home/stats-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <JourneySection />
      <AuthorSection />
      <LatestReviewsSection />
      <TestimonialsSection />
      <CommunitySection />
      <StatsSection />
    </>
  );
}