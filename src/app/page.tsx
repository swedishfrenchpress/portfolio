import { CopyEmail } from "@/components/copy-email";
import { DATA } from "@/data/resume";
import Link from "next/link";

const social = Object.fromEntries(
  DATA.socials.map((s) => [s.label, s.href]),
);

export default function Page() {
  return (
    <main className="space-y-4">
      <section id="intro" className="space-y-6">
        <div className="space-y-2">
          <h1 className="font-pixel text-3xl font-bold tracking-tight sm:text-4xl">
            Hej, I’m Er<span className="inline-block ml-[0.04em]">ik</span>
          </h1>
          <p className="text-foreground">{DATA.description}</p>
        </div>

        <div className="space-y-4 text-base leading-relaxed text-muted-foreground text-pretty">
          <p>
            Money is the most surveilled thing in your life. Every transaction
            watched, scored, and stored, often forever. It doesn’t have to be
            this way, and a small group of people are working to change it.
            I’m one of them.
          </p>
          <p>
            I’m a{" "}
            <a
              href="https://hrf.org/latest/hrf-grants-800-million-satoshis-to-22-freedom-tech-projects-worldwide/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Human Rights Foundation grantee
            </a>{" "}
            working on{" "}
            <a
              href="https://cashu.space"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cashu
            </a>
            , an open ecash protocol for bitcoin, descended from David Chaum’s
            1983 work on untraceable digital cash. I’m also Lead Designer at{" "}
            <a
              href="https://hoseki.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hoseki
            </a>
            , building proof of ownership infrastructure for bitcoin.
          </p>
          <p>
            Right now I’m designing{" "}
            <a
              href="https://cashu.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cashu.me
            </a>
            ’s native Apple and Android apps, and lead product design on{" "}
            <a
              href="https://numopay.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Numo
            </a>
            , a point-of-sale app for accepting Bitcoin with a tap. I’m also
            building{" "}
            <a
              href="https://www.zeileapp.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zeile
            </a>
            , an iPhone app for leaving little notes and doodles on someone’s
            home screen, mine from the first sketch to the last line of code.
          </p>
          <p>
            Before those came{" "}
            <a
              href="https://sltracker.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SL Tracker
            </a>
            , a native app for checking Stockholm’s Tunnelbana departures, and{" "}
            <a
              href="https://www.cypherpunklibrary.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Cypherpunk Library
            </a>
            , a collection of public-domain cypherpunk texts that hit #1 on
            Hacker News. The full list is on the{" "}
            <Link href="/projects">projects</Link> page.
          </p>
          <p>
            In my previous life I was a Senior UX Designer at Ericsson and a UX
            / UI Designer at Accenture.
          </p>
        </div>
      </section>

      <section id="contact">
        <p className="text-base leading-relaxed text-muted-foreground text-pretty">
          Email me at <CopyEmail email={DATA.email} />, or find me on{" "}
          <a href={social.X} target="_blank" rel="noopener noreferrer">
            X
          </a>
          ,{" "}
          <a href={social.Nostr} target="_blank" rel="noopener noreferrer">
            Nostr
          </a>
          ,{" "}
          <a href={social.GitHub} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          , and{" "}
          <a href={social.Substack} target="_blank" rel="noopener noreferrer">
            Substack
          </a>
          . I read everything that lands.
        </p>
      </section>
    </main>
  );
}
