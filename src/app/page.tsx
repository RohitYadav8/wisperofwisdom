import { HeroSection } from "../components/home/hero-section";
import { WelcomeSection } from "../components/home/welcome-section";
import { JourneySection } from "../components/home/journey-section";
import { AuthorSection } from "../components/home/author-section";
import { LatestReviewsSection } from "../components/home/latest-reviews-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <JourneySection />
      <AuthorSection />
      <LatestReviewsSection />
    </>
  );
}