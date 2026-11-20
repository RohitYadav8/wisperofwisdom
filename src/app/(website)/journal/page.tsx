import { HomeShell } from "../../../features/home/home-shell";
import { PageHeader } from "../../../features/home/page-header";
import { JournalHero } from "../../../features/journal/journal-hero";
import { DontMissOut, InsideJournal, MoreThanPages, ReadersLove } from "../../../features/journal/journal-sections";
import { JournalForm } from "../../../features/journal/journal-form";

/* Section order matches the live site's Journal page. */
export default function JournalPage() {
  return (
    <HomeShell>
      <PageHeader title="Journal" />
      <JournalHero />
      <MoreThanPages />
      <InsideJournal />
      <ReadersLove />
      <JournalForm />
      <DontMissOut />
    </HomeShell>
  );
}
