import { EntryList } from "@/components/entry-list";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talks",
  description: "Talks, panels, and podcast interviews.",
};

export default function TalksPage() {
  return (
    <main className="space-y-10">
      <h1 className="font-pixel text-2xl font-bold tracking-tight sm:text-3xl">
        Talks
      </h1>
      <EntryList
        entries={DATA.talks.map((t) => ({
          year: t.year,
          title: t.title,
          href: t.href,
          meta: t.event,
        }))}
      />
    </main>
  );
}
