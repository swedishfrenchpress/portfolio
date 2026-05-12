import { HackathonCard } from "@/components/hackathon-card";
import { TalkCard } from "@/components/talk-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-12">
      <section id="hero">
        <div className="mx-auto w-full space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I’m ${DATA.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl pt-2 font-medium"
                delay={BLUR_FADE_DELAY * 2}
                text={DATA.tagline}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border border-border/40 shadow-sm">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose max-w-full text-pretty font-sans text-base text-muted-foreground dark:prose-invert">
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
            <h2 className="text-xl font-bold">Work Experience</h2>
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
        <div className="flex flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <h2 className="text-xl font-bold">Selected Work</h2>
          </BlurFade>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            <h2 className="text-xl font-bold">Projects</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-border/50 border-l border-border/50">
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
            <h2 className="text-xl font-bold">Talks</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 17}>
            <ul className="mb-2 ml-4 divide-y divide-border/50 border-l border-border/50">
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
              <summary className="ml-10 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors list-none [&::-webkit-details-marker]:hidden inline-flex items-center gap-2 select-none">
                <span aria-hidden className="inline-block transition-transform group-open:rotate-90">›</span>
                <span className="group-open:hidden">Show {DATA.additionalTalks.length} more appearances</span>
                <span className="hidden group-open:inline">Hide additional appearances</span>
              </summary>
              <ul className="mt-4 ml-0 divide-y divide-border/50 border-l border-border/50">
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
            <h2 className="text-xl font-bold">Contact</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 21}>
            <p className="text-base text-muted-foreground md:text-lg/relaxed">
              Email me at{" "}
              <Link
                href="mailto:erikcativo@pm.me"
                className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground/60 transition-colors"
              >
                erikcativo@pm.me
              </Link>
              , or find me on{" "}
              <Link
                href={DATA.contact.social.X.url}
                className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground/60 transition-colors"
              >
                X
              </Link>{" "}
              and{" "}
              <Link
                href="https://primal.net/erik"
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
