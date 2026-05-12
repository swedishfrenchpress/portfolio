import { Icons } from "@/components/icons";
import { NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Erik Cativo",
  initials: "EC",
  url: "https://erik.day",
  location: "Stockholm, Sweden",
  locationLink: "https://www.google.com/maps/place/stockholm",
  description:
    "Design engineer based in Stockholm.",
  tagline:
    "I build tools for private, uncensorable money.",
  summary:
    "Money is the most surveilled thing in your life. Every transaction watched, scored, and stored, often forever. It doesn’t have to be this way, and a small group of people are working to change it. I’m one of them.\n\nI’m a [Human Rights Foundation grantee](https://hrf.org/latest/hrf-grants-800-million-satoshis-to-22-freedom-tech-projects-worldwide/) working on [Cashu](https://cashu.space), an open ecash protocol for bitcoin, descended from David Chaum’s 1983 work on untraceable digital cash. I’m also Lead Designer at [Hoseki](https://hoseki.app), building proof of ownership infrastructure for bitcoin.",
  avatarUrl: "me.jpg",
  navbar: [
    { href: "https://orangewindjammer.substack.com", icon: NotebookIcon, label: "Substack" },
  ],
  contact: {
    email: "erikcativo@pm.me",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/swedishfrenchpress",
        icon: Icons.github,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/eriklocalhost",
        icon: Icons.x,

        navbar: true,
      },
      Nostr: {
        name: "Nostr",
        url: "https://primal.net/erik",
        icon: Icons.nostr,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Hoseki",
      href: "https://hoseki.app",
      badges: [],
      location: "Remote",
      title: "Lead Designer",
      logoUrl: "/hoseki.png",
      start: "December 2021",
      end: "Present",
      description:
        "Leading design across brand, UX, and product for a platform that helps users prove Bitcoin ownership without giving up custody.",
    },
    {
      company: "Ericsson",
      badges: [],
      href: "https://ericsson.com",
      location: "Remote",
      title: "Senior UX Designer",
      logoUrl: "/ericsson.jpg",
      start: "September 2020",
      end: "October 2024",
      description:
        "Led design for a telecom network acceptance platform built on R3 Corda, a “private blockchain.” A front-row seat to the blockchain theater, and a reminder that Bitcoin is the only thing in the space that’s real.",
    },
    {
      company: "Accenture",
      href: "https://accenture.com/",
      badges: [],
      location: "Washington, DC",
      title: "UX / UI Designer",
      logoUrl: "/accenture.png",
      start: "February 2020",
      end: "September 2020",
      description:
        "Designed web applications for government clients on Salesforce, ServiceNow, and Pega. Short to mid-term engagements, shipped end-to-end with both client and internal teams.",
    },
  ],
  projects: [
    {
      title: "Hoseki",
      href: "https://hoseki.app",
      active: true,
      description:
        "Leading design across brand, UX, and product. Building the visual identity and interface for a product that makes proving Bitcoin ownership feel as simple as showing a screenshot.",
      technologies: [
        "Figma",
        "Design systems",
        "Prototyping",
        "User testing",
      ],
      links: [
        {
          type: "Website",
          href: "https://hoseki.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "/hoseki.mp4",
    },
    {
      title: "SL Tracker",
      href: "https://sltracker.app/",
      active: true,
      description:
        "A lightweight SwiftUI app for checking Stockholm Tunnelbana departures. Native iOS, home screen widget, no accounts.",
      technologies: [
        "SwiftUI",
        "Xcode",
        "iOS",
        "WidgetKit",
      ],
      links: [
        {
          type: "Website",
          href: "https://sltracker.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/swedishfrenchpress/SLTracker",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/sl-tracker.mp4",
    },
    {
      title: "Palantir for the People",
      href: "https://www.palantirforthepeople.com/",
      active: true,
      description:
        "An open-source triage tool for journalists working with leaked document dumps. Sorts by topic, rates each doc for bias and consistency, and explains its reasoning. Built at HRF's second AI Hack for Freedom; I led the front end and UX.",
      technologies: [
        "Next.js",
        "TypeScript",
        "React",
        "TailwindCSS",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.palantirforthepeople.com/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Front end",
          href: "https://github.com/swedishfrenchpress/pftp-ui",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Back end",
          href: "https://github.com/carlaKC/pftp-backend",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/pftp.mp4",
      videoPlaybackRate: 3,
    },
    {
      title: "Ecash Design Guide",
      href: "https://bitcoin.design/guide/how-it-works/ecash/introduction/",
      active: true,
      description:
        "Wrote, designed, and deployed the ecash section of the Bitcoin Design Community's official guide. Covers both Cashu and Fedimint, with design patterns for wallets, mints, and recovery flows.",
      technologies: [
        "Jekyll",
        "Ruby",
        "Bundler",
        "Docker",
      ],
      links: [
        {
          type: "Website",
          href: "https://bitcoin.design/guide/how-it-works/ecash/introduction/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/BitcoinDesign/Guide",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/ecashguide.mp4",
    },
  ],
  hackathons: [
    {
      title: "Corruption Disrespector",
      dates: "January 2026",
      description:
        "Built and deployed the front end for Corruption Disrespector, a tool for anti-corruption investigations. The project won third place at the [Human Rights Foundation's AI Hack for Freedom hackathon](https://mailchi.mp/hrf.org/hrf-sponsors-ai-hackathon-for-freedom-in-austin-pairing-dissidents-and-developers-9102958), where activists and developers paired up to vibe-code freedom tools in 28 hours.",
      image: "/corruptiondisrespector.jpg",
      links: [
        {
          title: "Website",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://www.corruptiondisrespector.com/",
        },
        {
          title: "Post",
          icon: <Icons.x className="h-4 w-4" />,
          href: "https://x.com/eriklocalhost/status/2013280213623329189?s=20",
        },
      ],
    },
    {
      title: "Cashu.me",
      dates: "2024 - Present",
      description:
        "I'm the [second most active contributor](https://github.com/cashubtc/cashu.me/graphs/contributors) to Cashu.me, behind most of the UI and UX. Recently designed the [mint review](https://x.com/eriklocalhost/status/1987173744582783084) and web of trust features, which help users decide which mints to actually trust.",
      image:
        "/cashume.png",
      links: [
        {
          title: "Application",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://cashu.me",
        },
        {
          title: "GitHub",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/cashubtc/cashu.me",
        },
      ],
    },
    {
      title: "Bitcoin For Signal",
      dates: "October 2025",
      description:
        "Created and led the Bitcoin for Signal campaign. Designed the identity, the site, and the launch strategy that took a hackathon weekend to a viral privacy-tech moment.",
      image:
        "/b4s-logo.svg",
      links: [
        {
          title: "Website",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://bitcoinforsignal.org/",
        },
        {
          title: "Post",
          icon: <Icons.x className="h-4 w-4" />,
          href: "https://x.com/CashuBTC/status/1978853994635117043",
        },
      ],
    },
    {
      title: "Bitchat Cashu Wallet",
      dates: "July 2025",
      description:
        "Integrated a working Cashu wallet into Bitchat for Android. Designed the UI in Figma, vibe-coded the Kotlin components in Cursor. Whole build: 72 hours.",
      image:
        "/bitchat.svg",
      links: [
        {
          title: "GitHub",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/swedishfrenchpress/bitchat-android/tree/parse-cashu-remote",
        },
        {
          title: "Post",
          icon: <Icons.x className="h-4 w-4" />,
          href: "https://x.com/eriklocalhost/status/1947309923517218965",
        },
        {
          title: "Blog",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://orangewindjammer.substack.com/p/vibe-designing-a-bitchat-cashu-wallet",
        },
      ],
    },
    {
      title: "Minor League Miners",
      dates: "June 2025",
      description:
        "Won first place in both the Software Prize and HashLeague tracks at ATL Bit Labs’ Battle of the Mine Hackers. A new leaderboard for small miners and solo Bitaxe users that ranks by best session difficulty instead of total hashrate. To build it I spun up my own public pool, forked HashLeague, and built a UI on top of its API.",
      image:
        "https://pbs.twimg.com/profile_images/1640759486305431552/cavNb8x1_400x400.jpg",
      links: [
        {
          title: "GitHub",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/swedishfrenchpress/hash-league/tree/sbd_pool",
        },
        {
          title: "Post",
          icon: <Icons.x className="h-4 w-4" />,
          href: "https://x.com/atlbitlab/status/1942626382003200366",
        },
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://www.youtube.com/live/yQjVJcQ9L1M?feature=shared&t=3273",
        },
      ],
    },
    {
      title: "Athenut",
      dates: "October 2024",
      description:
        "A privacy-preserving, pay-per-query search engine built on top of Kagi and Cashu. I designed the brand and built the front end. Pay with ecash to search. No accounts, no tracking.",
      image:
        "/athenut.png",
      links: [
        {
          title: "Website",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://athenut.com",
        },
        {
          title: "No BS Bitcoin",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://www.nobsbitcoin.com/athenut-privacy-preserving-web-search-powered-by-kagi-cashu/",
        },
      ],
    },
    {
      title: "Cashu 95",
      dates: "July 2024",
      description:
        "A Figma prototype that drops the Cashu protocol into a full Windows 95 interface. Built a complete Win95 design system to do it. Half experiment, half love letter to old UI.",
      image:
        "/cashu95.png",
      links: [
        {
          title: "Post",
          icon: <Icons.x className="h-4 w-4" />,
          href: "https://x.com/eriklocalhost/status/1814091080389767592",
        },
      ],
    },
  ],
  featuredTalks: [
    {
      title: "Why AI Agents Want Bitcoin",
      dates: "April 2026",
      description: "A panel at Bitcoin 2026 in Las Vegas on why AI agents need bitcoin as their native settlement layer. We got into machine-to-machine payments, why censorship-resistance and programmability matter more once humans are out of the loop, and where ecash fits for the small, frequent transactions agents actually make.",
      image: "https://i.ytimg.com/vi/ApuXgFoKkQc/hqdefault.jpg",
      links: [
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://youtu.be/ApuXgFoKkQc",
        },
      ],
    },
    {
      title: "Lightning + Ecash: An Atomic Match Made in Heaven?",
      dates: "April 2026",
      description: "A Bitcoin 2026 talk in Las Vegas on how Lightning and ecash fit together. We dug into the trade-offs each one solves on its own, how atomic swaps between them work in practice, and why a layered approach (Lightning for routing and settlement, ecash for privacy and UX) is starting to feel inevitable.",
      image: "https://i.ytimg.com/vi/4iwEBvEByA4/hqdefault.jpg",
      links: [
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://youtu.be/4iwEBvEByA4",
        },
      ],
    },
    {
      title: "Why Ecash Matters For Bitcoin",
      dates: "December 2025",
      description: "I went on Cody's podcast and we talked about what ecash is and how it relates to Bitcoin, why a layered approach to digital money matters, and why getting the UX of payments right is so important.",
      image: "/transform.jpg",
      links: [
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://www.youtube.com/watch?v=dPC99lXzWtw",
        },
      ],
    },
    {
      title: "The State of Ecash Design",
      dates: "August 2025",
      description: "A talk I gave at Bitcoin ++ Privacy Edition in Riga focused on the current state of Cashu design, progress, challenges, and things that are ahead.",
      image: "https://yt3.googleusercontent.com/C-P6Xa_F5JxoUCgacx1ZxZu1y9sUZplWBD_-fNKUPstrBh0CK38HcLx8tReh6D0-gX8ybaCkMQ=s900-c-k-c0x00ffffff-no-rj",
      links: [
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://youtu.be/rZmbjWuO940",
        },
      ],
    },
    {
      title: "Ecash Panel [Baltic Honey Badger]",
      dates: "August 2024",
      description: "A bit of a dream come true, I got to sit next to one of my heroes, Adam Back, and talk about ecash. This panel dives into what ecash is, what problems it solves (like privacy and scalability), and where it still falls short.",
      image: "/bhb.png",
      links: [
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://youtu.be/4TxlCdI4AMg",
        },
      ],
    },
    {
      title: "Designing for Ecash [Bitcoin Asia: Hong Kong]",
      dates: "May 2024",
      description: "A talk on the future of Bitcoin through the lens of ecash design, tracing its roots from David Chaum to modern Bitcoin implementations. It explores how ecash can improve privacy, reduce censorship risks, and bring better UX to Bitcoin.",
      image: "https://yt3.ggpht.com/hkwmU6TbqoMxhXRjOHVCIy38oSNZrCX_sbmtbHyR3TdjWOXgFmrPe8T0WtCOPKrbGr_9XwQQ0HI=s88-c-k-c0x00ffffff-no-rj",
      links: [
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://youtu.be/SM5t3JULg_0",
        },
      ],
    },
  ],
  additionalTalks: [
    {
      title: "21 in 21, a Rapid-Fire Bitcoin Q&A Podcast",
      dates: "September 2025",
      description: "Recorded during Bitcoin Design Week in San Francisco. I talked about designing the future of money and how we can capture that feeling of 'magic' in digital money. Got into my experiments with ecash and bitchat, the magic of bump to pay NFC interactions, and how the small design details make a big difference.",
      image: "https://yt3.googleusercontent.com/628CqOS86_4xL7L3LP4V3DMrLBc9e_t3PgNTk_cZwRtO3WHMwsyTpuMGGqNIdhjEr5XfCz0Q=s160-c-k-c0x00ffffff-no-rj",
      links: [
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://youtu.be/1mDxk-P8uzA",
        },
      ],
    },
    {
      title: "Bitcoin Insider Interview",
      dates: "August 2025",
      description: "An interview with Lisa (Nity Nei), the founder of Bitcoin ++. We talked about how I got involved in Cashu, some designs I'm proud of, and what's coming next.",
      image: "https://i.ytimg.com/vi/gA1ULUv0gQw/maxresdefault.jpg",
      links: [
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://youtu.be/N2lKSRUUdKY",
        },
      ],
    },
    {
      title: "How Better Design Will Impact Bitcoin",
      dates: "October 2024",
      description: "Discussed the history of other peer to peer protocols like BitTorrent and The Pirate Bay, and how those early systems shaped my thinking around Bitcoin. We also got into wallet UX, how to simplify the orange pill process, and where scaling tools like ecash can make a difference.",
      image: "https://yt3.ggpht.com/ZjC_IT8jV1DG916UNQHO9uAeNmrKWxoOiXhXCeUn_qSjEDz7n_1hJeVYabJx0YOAi8DvmWYIZQ=s88-c-k-c0x00ffffff-no-rj",
      links: [
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://youtu.be/qniGWrVwey8",
        },
      ],
    },
    {
      title: "What is \"Good\" Bitcoin Design?",
      dates: "August 2024",
      description: "This was a fun and thoughtful chat with Skyler, a fellow Bitcoin designer I really respect and admire. We talked about what it actually means to design in this space. Not just making things look good, but making them work well for real people.",
      image: "https://yt3.ggpht.com/yamPR71SXZzvT9xbRTt2g_laf3NBUuCvuOMfWS5L9iEQAxFcPfn9Al_WKU0unVCokxzkR_Y9Lwc=s88-c-k-c0x00ffffff-no-rj",
      links: [
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://youtu.be/jXanC8tp940",
        },
      ],
    },
    {
      title: "Bitcoin Design and Ecash UX",
      dates: "August 2024",
      description: "This was a fun one, recorded while walking along the river in Riga. We talked about designing peer-to-peer systems, the challenges of ecash UX, working on institutional products like Hoseki, and how cities like Stockholm and Riga inspire better design.",
      image: "https://yt3.ggpht.com/ytc/AIdro_nbAZie74dK7vaZiM9edcVn-Oce_6yhOisb5buQpamAz5yB=s88-c-k-c0x00ffffff-no-rj",
      links: [
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://www.youtube.com/watch?v=r9i6uO7UtjE",
        },
      ],
    },
    {
      title: "Sprint Planning & Interviews",
      dates: "January 2024",
      description: "We talked about how sprint planning works in open source projects, and where user research can fit into the process to actually make an impact.",
      image: "https://yt3.ggpht.com/fIR0Iqy0I95MFqH0N4JkJ6f3T2T-2zDyPEMH95_rge6VOdQY_K-T61Q_2agY404hccGdVnlYzEo=s88-c-k-c0x00ffffff-no-rj",
      links: [
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://youtu.be/WI6p9LU66Uk",
        },
      ],
    },
    {
      title: "Scaling Bitcoin",
      dates: "January 2024",
      description: "A deep dive into Bitcoin design, privacy, and why tools like Cashu matter. We talked about scaling, culture, freedom of speech, and the trade-offs that come with building for a more open, resilient internet.",
      image: "https://yt3.ggpht.com/3RXDryR7JuYe0E3H8v7mGMgUSZ3CF8AsVDeDO7DDettjjtLVnPrF6WT3ds7AMo424Ckh3Ew=s88-c-k-c0x00ffffff-no-rj",
      links: [
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://youtu.be/Y01URgO_x4g",
        },
      ],
    },
    {
      title: "Designing for Bitcoin [Baltic Honey Badger]",
      dates: "September 2023",
      description: "A talk on the evolution of Bitcoin wallet UI, exploring common UX challenges and how different wallets address them. It also shares lessons from mainstream tech and the design trade-offs involved in building Bitcoin products.",
      image: "/bhb.png",
      links: [
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://youtu.be/RWtqsgtsYTA",
        },
      ],
    },
    {
      title: "Nostr 101: What the F#&* is Nostr?",
      dates: "March 2023",
      description: "Introduction to the Nostr protocol and its applications.",
      image: "https://yt3.ggpht.com/3HlqI4yhkmXAwMFJiSYhUqL-UY_NrPhjMfMsiqmZ-Lj00l7WhkpCOg67YtQVUe09T8W-1Knn=s88-c-k-c0x00ffffff-no-rj",
      links: [
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://youtu.be/QSX2zYa0RIU",
        },
      ],
    },
  ],
} as const;
