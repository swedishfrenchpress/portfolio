import { EntryList } from "@/components/entry-list";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Side projects and hackathon builds.",
};

export default function ProjectsPage() {
  return (
    <main className="space-y-10">
      <h1 className="font-pixel text-2xl font-bold tracking-tight sm:text-3xl">
        Projects
      </h1>
      <EntryList
        entries={DATA.projects.map((p) => ({
          year: p.year,
          title: p.title,
          href: p.href,
          meta: p.description,
        }))}
      />
    </main>
  );
}
