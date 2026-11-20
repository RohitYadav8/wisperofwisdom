import { HomeShell } from "../../../features/home/home-shell";
import { PageHeader } from "../../../features/home/page-header";
import { ChallengeHero } from "../../../features/challenge/challenge-hero";
import { WhyJoin } from "../../../features/challenge/why-join";
import { HowItWorks } from "../../../features/challenge/how-it-works";
import { JourneyCta } from "../../../features/challenge/journey-cta";
import { ChallengeForm } from "../../../features/challenge/challenge-form";

export default function TenDayEmailChallengePage() {
  return (
    <HomeShell>
      <PageHeader title="10 Day Email Challenge" />
      <ChallengeHero />
      <WhyJoin />
      <HowItWorks />
      <JourneyCta />
      <ChallengeForm />
    </HomeShell>
  );
}
