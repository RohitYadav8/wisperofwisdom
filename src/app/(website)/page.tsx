import { HomeShell } from "../../features/home/home-shell";
import { Hero } from "../../features/home/hero";
import { Welcome } from "../../features/home/welcome";
import { Journey } from "../../features/home/journey";
import { Author } from "../../features/home/author";
import { LatestReviews, Testimonials } from "../../features/home/reviews";
import { Community } from "../../features/home/community";
import { Stats } from "../../features/home/stats";

/* Section order matches the live site. */
export default function Home() {
  return (
    <HomeShell>
      <Hero />
      <Welcome />
      <Journey />
      <Author />
      <LatestReviews />
      <Testimonials />
      <Community />
      <Stats />
    </HomeShell>
  );
}
