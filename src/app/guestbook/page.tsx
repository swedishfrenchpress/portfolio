import { Guestbook } from "@/components/mondo/guestbook/guestbook";
import type { Metadata } from "next";

// Unlisted: only MONDO's marquee links here, and search engines stay out.
export const metadata: Metadata = {
  title: "Guestbook",
  description: "Sign my guestbook.",
  robots: { index: false, follow: false },
};

export default function GuestbookPage() {
  return (
    <main className="guestbook space-y-10">
      <h1 className="font-pixel text-2xl font-bold tracking-tight sm:text-3xl">
        Guestbook
      </h1>
      <Guestbook />
    </main>
  );
}
