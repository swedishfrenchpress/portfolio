import { HackathonCard } from "@/components/hackathon-card";
import { TalkCard } from "@/components/talk-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Magnetic } from "@/components/magnetic";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-16">
      <section id="hero">
        <div className="flex flex-col gap-10 sm:gap-14">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="flex items-center gap-4 sm:gap-5">
              <Avatar className="size-16 sm:size-20 border border-border/40 shadow-sm shrink-0">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col leading-tight">
                <span className="text-2xl sm:text-3xl font-medium tracking-tight">
                  Hi, I’m {DATA.name.split(" ")[0]}.
                </span>
                <span className="text-xl sm:text-2xl text-muted-foreground mt-0.5">
                  {DATA.description}
                </span>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 3} yOffset={12}>
            <h1 className="text-[clamp(2.25rem,5vw+1rem,4.5rem)] font-black tracking-tighter leading-[0.95] text-foreground">
              I build tools<br />
              for private,<br />
              uncensorable money.
            </h1>
          </BlurFade>
        </div>
      </section>

      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose max-w-prose text-pretty font-sans text-lg leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown
              components={{
                a: ({ href, children, ...props }) => {
                  if (href?.startsWith("/")) {
                    return <Link href={href} {...props}>{children}</Link>;
                  }
                  if (href?.startsWith("#")) {
                    return <a href={href} {...props}>{children}</a>;
                  }
                  return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
                },
              }}
            >
              {DATA.summary}
            </Markdown>
          </div>
        </BlurFade>
      </section>

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="border-t border-foreground/15 pt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Work Experience
            </h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="selected-work">
        <div className="flex flex-col gap-y-8">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <h2 className="border-t border-foreground/15 pt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Selected Work
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  videoPlaybackRate={
                    "videoPlaybackRate" in project
                      ? project.videoPlaybackRate
                      : undefined
                  }
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="hackathons">
        <div className="flex flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <h2 className="border-t border-foreground/15 pt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Projects
            </h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="ml-4 divide-y divide-border/50 border-l border-border/50">
              {DATA.hackathons.map((project, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <HackathonCard
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>

      <section id="talks">
        <div className="flex flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <h2 className="border-t border-foreground/15 pt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Talks
            </h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 17}>
            <ul className="ml-4 divide-y divide-border/50 border-l border-border/50">
              {DATA.featuredTalks.map((talk, id) => (
                <BlurFade
                  key={talk.title + talk.dates}
                  delay={BLUR_FADE_DELAY * 18 + id * 0.05}
                >
                  <TalkCard
                    title={talk.title}
                    description={talk.description}
                    dates={talk.dates}
                    image={talk.image}
                    links={talk.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 19}>
            <details className="group ml-4">
              <summary className="relative ml-10 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-center select-none">
                <span
                  aria-hidden
                  className="absolute -left-16 top-1/2 -translate-y-1/2 flex size-12 items-center justify-center rounded-full border border-border bg-background transition-colors duration-300 group-hover:border-foreground/50 group-open:border-foreground/70"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M8 3v10M3 8h10" />
                  </svg>
                </span>
                <span className="text-base font-semibold tracking-tight text-foreground/75 transition-colors duration-200 group-hover:text-foreground group-open:hidden">
                  more
                </span>
                <span className="hidden text-base font-semibold tracking-tight text-foreground/60 transition-colors duration-200 group-open:inline">
                  less
                </span>
              </summary>
              <ul className="mt-2 ml-0 divide-y divide-border/50 border-l border-border/50">
                {DATA.additionalTalks.map((talk) => (
                  <TalkCard
                    key={talk.title + talk.dates}
                    title={talk.title}
                    description={talk.description}
                    dates={talk.dates}
                    image={talk.image}
                    links={talk.links}
                  />
                ))}
              </ul>
            </details>
          </BlurFade>
        </div>
      </section>

      <section id="contact">
        <div className="flex flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 20}>
            <h2 className="border-t border-foreground/15 pt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Contact
            </h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 21}>
            <p className="max-w-prose text-base text-muted-foreground md:text-lg/relaxed">
              Email me at{" "}
              <Magnetic className="inline-block">
                <Link
                  href="mailto:erikcativo@pm.me"
                  className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground/60 transition-colors"
                >
                  erikcativo@pm.me
                </Link>
              </Magnetic>
              , or find me on{" "}
              <Link
                href={DATA.contact.social.X.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground/60 transition-colors"
              >
                X
              </Link>{" "}
              and{" "}
              <Link
                href="https://primal.net/erik"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground/60 transition-colors"
              >
                Nostr
              </Link>
              . I read everything that lands.
            </p>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
