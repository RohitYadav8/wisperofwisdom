import { HomeShell } from "../../../features/home/home-shell";
import { PageHeader } from "../../../features/home/page-header";
import { AboutIntro } from "../../../features/about/about-intro";
import { AboutBookInfo } from "../../../features/about/about-book-info";
import { Testimonials } from "../../../features/home/reviews";
import { Community } from "../../../features/home/community";
import { Stats } from "../../../features/home/stats";

/* Section order matches the live site's About Us page. */
export default function AboutPage() {
  return (
    <HomeShell>
      <PageHeader title="About Us" />
      <AboutIntro />
      <AboutBookInfo />
      <Testimonials />
      <Community />
      <Stats />
    </HomeShell>
  );
}
