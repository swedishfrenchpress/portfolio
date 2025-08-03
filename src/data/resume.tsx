import { Icons } from "@/components/icons";
import { Figma, HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Erik Cativo",
  initials: "EC",
  url: "https://erik.day",
  location: "Stockholm, Sweden",
  locationLink: "https://www.google.com/maps/place/stockholm",
  description:
    "Bitcoin Product Designer based in Stockholm, Sweden",
  summary:
    "At the end of 2024, I left my job as a UX designer to go full time into building for bitcoin. I’m currently a [Human Rights Foundation grantee](https://hrf.org/latest/hrf-grants-800-million-satoshis-to-22-freedom-tech-projects-worldwide/) working on improving ecash design, and I’m the Lead Designer at [Hoseki](https://hoseki.app), where we’re helping people prove bitcoin ownership.\n\nLately I’ve been getting deeper into UI engineering. Trying to move beyond just Figma and [ship my designs](/#projects) to life in code. I’ve been using Cursor a lot to build and ship faster, and it’s been fun pushing real projects out into the world.",
  avatarUrl: "me.jpg",
  skills: [
    "Product Design",
    "Figma",
    "UX / UI Design",
    "Vibe Coding",
    "User Research",
    "Prototyping",
    "Design Systems",
    "Wireframing",
  ],
  navbar: [
    { href: "https://erik.day", icon: HomeIcon, label: "Home" },
    { href: "https://orangewindjammer.substack.com", icon: NotebookIcon, label: "Substack" },
  ],
  contact: {
    email: "eriksadder@gmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/swedishfrenchpress",
        icon: Icons.github,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/uxerik_",
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
        "Leading design across brand, UX, and product for a platform that helps users prove Bitcoin ownership. Responsible for the visual identity, user experience, and interface design.",
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
        "Led design for a telecom network acceptance platform built on R3 Corda, a “private blockchain.” It was a front row seat to the blockchain theater and a reminder that Bitcoin is the only thing in the space that’s real.",
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
        "Designed web applications for government clients, mostly using platforms like Salesforce, ServiceNow, and Pega. Projects were short to mid-term, and I worked closely with both the client and internal teams to get things shipped.",
    },
  ],
  projects: [
    {
      title: "Hoseki",
      href: "https://hoseki.app",
      active: true,
      description:
        "Leading design across brand, UX, and product. Responsible for shaping the visual identity, designing user interfaces, and building a product that makes proving Bitcoin ownership easy and delightful.",
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
      title: "Ecash Design Guide",
      href: "https://bitcoin.design/guide/how-it-works/ecash/introduction/",
      active: true,
      description:
        "Wrote, designed, and deployed an ecash section to the Bitcoin Design Community’s official design guide. A comprehensive design guide that provides an overview of both ecash protocols, along with design best practices for each.",
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
    {
      title: "eNuts",
      href: "https://www.enuts.cash/",
      active: true,
      description:
        "Cashu wallet for iOS and Android. It supports Lightning swaps, multi-mint management, and private payments via Nostr. The UI hides protocol complexity while giving power users full control.",
      technologies: [
        "React Native",
        "Expo (EAS)",
        "Node.js",
        "Nostr",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.enuts.cash/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/cashubtc/eNuts",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/enuts.mp4",
    },
    {
      title: "Open Cash",
      href: "https://opencash.dev/",
      active: true,
      description:
        "Designed, built, and shipped the OpenCash website. A non-profit supporting open-source ecash development. Presents the organization’s mission, grant program, and donation portal, with clear messaging around privacy and digital cash.",
      technologies: [
        "Next.js",
        "TypeScript",
        "React",
        "TailwindCSS",
        "Vercel",
      ],
      links: [
        {
          type: "Website",
          href: "https://opencash.dev/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "/opencash.mp4",
    },
  ],
  hackathons: [
    {
      title: "Bitchat Cashu Wallet",
      dates: "July 2025",
      description:
        "Integrated a functional Cashu wallet into Bitchat for Android using Figma, Cursor, and Kotlin. Designed the UI in Figma and used Cursor to vibe coded the components into Kotlin. Entire build took 72 hours.",
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
          href: "https://x.com/uxerik_/status/1947309923517218965",
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
        "My hackathon submission won first place in both the Software Prize and HashLeague tracks at ATL Bit Labs’ Battle of the Mine Hackers. It introduced a new leaderboard for small miners and solo Bitaxe users, ranking them by their best session difficulty rather than total hashrate. To build it I spun up my own public pool instance, connected its API to a forked version of HashLeague, and built a UI to display best-difficulty stats.",
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
      title: "Save Our Wallets",
      dates: "June 2025",
      description:
        "Save Our Wallets is an advocacy website built with Nuxt.js and to support Section 110 of the CLARITY Act (HR 1747), which protects the right to use non-custodial crypto wallets. I led development of the site, which provides a bill overview and lets users contact their representatives by ZIP code. The campaign went viral, sparking podcast appearances, conference talks, and even merchandise in support of the cause.",
      icon: "public",
              image:
          "https://pbs.twimg.com/profile_images/1926687703636025344/iESa4aSm_400x400.jpg",
        links: [
          {
            title: "Website",
            icon: <Icons.globe className="h-4 w-4" />,
            href: "https://saveourwallets.org/",
          },
          {
            title: "GitHub",
            icon: <Icons.github className="h-4 w-4" />,
            href: "https://github.com/swedishfrenchpress/save-our-wallets",
          },
          {
            title: "Profile",
            icon: <Icons.x className="h-4 w-4" />,
            href: "https://x.com/saveourwalets",
          },
          {
            title: "YouTube",
            icon: <Icons.youtube className="h-4 w-4" />,
            href: "https://www.youtube.com/watch?v=0iMhYvu5KqU",
          },
        ],
    },
    {
      title: "Cashu.me",
      dates: "March 2024",
              description:
          "Submitted PR #341 and PR #345 to cashu.me, redesigning the mint info screen and improving mint selection. Users can now tap the entire card to switch mints instead of a small radio button, and mint info updates automatically. Small change, big UX win.",
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
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://github.com/cashubtc/cashu.me/pull/341",
        },
      ],
    },
    {
      title: "Cashu.space",
      dates: "October 2024",
      description:
        "Cashu.space provides a comprehensive overview of the Cashu protocol, including its history, features, and how it works. I built the site using Next.js, TypeScript, and Tailwind CSS, and deployed it on Vercel. The site is designed to be a resource for anyone interested in learning more about Cashu.",
      image:
        "https://cashu.space/mstile-150x150.png",
      links: [
        {
          title: "Website",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://cashu.space",
        },
      ],
    },
    {
      title: "Athenut",
      dates: "October 2024",
              description:
          "Athenut is a privacy-preserving, pay-per-query search engine built on Kagi and Cashu. I designed the brand identity and built the entire front-end. Users pay with ecash to search. No accounts, no tracking. For technical details, check out the No BS Bitcoin article.",
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
        "Cashu 95 is a playful Figma prototype that reimagines the modern Cashu protocol with a retro Windows 95 interface. Built using a full Win95-style design system, it explores how old-school UI can still deliver a functional and fun ecash experience.",
      image:
        "/cashu95.png",
      links: [
        {
          title: "Post",
          icon: <Icons.x className="h-4 w-4" />,
          href: "https://x.com/uxerik_/status/1814091080389767592",
        },
      ],
    },
  ],
  talks: [
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
      description: "This was a fun and thoughtful chat with Skyler, a fellow Bitcoin designer I really respect and admire. We talked about what it actually means to design in this space — not just making things look good, but making them work well for real people.",
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
      title: "Bitcoin Design and Ecash UX",
      dates: "August 2024",
      description: "This was a fun one—recorded while walking along the river in Riga. We talked about designing peer-to-peer systems, the challenges of ecash UX, working on institutional products like Hoseki, and how cities like Stockholm and Riga inspire better design.",
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
      title: "Designing for Ecash [Bitcoin Asia: Hong Kong]",
      dates: "May 2024",
      description: "A talk on the future of Bitcoin through the lens of ecash design—tracing its roots from David Chaum to modern Bitcoin implementations. It explores how ecash can improve privacy, reduce censorship risks, and bring better UX to Bitcoin.",
      image: "https://yt3.ggpht.com/hkwmU6TbqoMxhXRjOHVCIy38oSNZrCX_sbmtbHyR3TdjWOXgFmrPe8T0WtCOPKrbGr_9XwQQ0HI=s88-c-k-c0x00ffffff-no-rj",
      links: [
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://youtu.be/SM5t3JULg_0",
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
