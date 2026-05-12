# Product

## Register

brand

## Users

Three audiences land here:

1. **Bitcoin and freedom-tech operators** — founders, grant program leads (HRF, OpenSats), open-source maintainers, and protocol-adjacent teams looking for a designer who already lives in this world. They're skimming for credibility (HRF grant, Hoseki, Cashu.me, ecash guide) and proof of taste.
2. **Hiring managers and collaborators** outside bitcoin — product leads at privacy/security-leaning companies who arrived via a talk, a Substack post, or a referral. They need a fast read on what Erik does and why he's different from a generic UX designer.
3. **Peers in the bitcoin design community** — other designers, contributors, hackathon teammates. They're checking what's shipped recently, what's open-source, and how to reach Erik (X, Nostr, GitHub, email).

Context of use: desktop on a second monitor between meetings, or phone during a recommended-by-a-friend skim. Visit is short. The site has to land its claim in seconds and reward 60 seconds of scrolling with substance.

## Product Purpose

Erik's professional home on the open web. It exists to:

- Make the positioning immediate — Bitcoin Product Designer, Stockholm, HRF grantee, Lead Designer at Hoseki, designer-who-also-ships-code.
- Show receipts: Hoseki, Cashu.me, ecash design guide, OpenCash, Bitcoin for Signal, hackathon wins, talks.
- Route the right people to the right channel — Substack for writing, X / Nostr / GitHub / email for contact, project links for the work itself.

Success is a visitor who, after one scroll, can describe Erik to someone else without ambiguity and knows exactly where to follow up.

## Brand Personality

Three words: **principled, hands-on, sovereign.**

- **Principled** — bitcoin-only, not crypto. The site is allowed to take a side, and it does. "Front row seat to the blockchain theater and a reminder that Bitcoin is the only thing in the space that's real" is not edited out for politeness.
- **Hands-on** — designer who ships. Vibe-coding into production, Kotlin, SwiftUI, Next.js, Jekyll. Open-source contribution counts (second most active on Cashu.me) are stated as fact. Receipts, not adjectives.
- **Sovereign** — the aesthetic lives next to the values: privacy, self-custody, freedom tech, building in public on open protocols. The site should feel adjacent to that culture, not to VC web3 culture.

Voice: declarative, first-person, no hedging, no marketing-speak. Sentences end. Short paragraphs. Specific over abstract — name the protocol, name the project, name the hackathon, link the post.

## Anti-references

What this should explicitly NOT look or feel like:

- **Web3 / NFT / crypto-exchange aesthetics** — neon-on-black hero, glowing orbs, "the future of finance" gradient walls. Bitcoin culture is the opposite of this and the site needs to signal that before a single word is read.
- **Generic SaaS portfolio template** — hero metric tile, identical project card grid, "Let's build something amazing together" CTA. The dillionverma starter is the floor, not the ceiling — anything that still looks like the template after edits is a tell.
- **Corporate consulting (Accenture-era) polish** — stock-photo abstraction, navy + white, "transforming experiences", soft drop shadows on everything.
- **Maximalist designer-portfolio dribbble** — full-bleed reels, scroll-jacked sections, custom cursors, hero animations that delay the substance. Erik's work is the substance; the chrome shouldn't compete with it.
- **Founder-bro personal brand** — giant face photo, growth-tweet quotes, "I help builders ship." That's not the register.

## Design Principles

1. **Receipts before claims.** Every assertion ("Lead Designer", "HRF grantee", "second most active contributor") is paired with a link, a logo, a video, or a date. The site never asks the reader to take Erik's word for it.
2. **Practice what you preach.** Erik designs and ships product UI for a living, and increasingly ships code directly. The site is itself one of those shipped artifacts — typography, motion, code, performance, and copy all have to be at a level the work claims.
3. **Stand somewhere.** A bitcoin-only stance, an open-source stance, a privacy stance. The site is allowed opinions; neutrality reads as evasion in this audience.
4. **Substance over chrome.** Animation, color, and ornament earn their place by making the work clearer or more memorable — never by filling space. The default for any decorative element is "delete it and see if anything breaks."
5. **Built in public.** Links to GitHub, posts, blog write-ups, and live URLs are first-class. The site behaves like a hub of an active open-source life, not a closed brochure.

## Accessibility & Inclusion

- Target WCAG AA contrast across light and dark themes. The current near-black-on-white and near-white-on-near-black surfaces meet this; any future accent color needs to be checked against both.
- Theme toggle is already user-controlled — preserve that. Don't force a single theme.
- Respect `prefers-reduced-motion` for all BlurFade and Framer Motion entrances. Provide a no-motion fallback that still reveals content in correct order.
- Keep focus rings visible on every interactive element (links, navbar dock items, theme toggle). Don't hide them in pursuit of cleanliness.
- Body line length stays in the 65–75ch range — already enforced by the `max-w-4xl` container.
- Alt text on every project image, video, and avatar. Talks and hackathons that point to external posts should describe what the link is, not "click here."
- The site is read by people on slow connections in adversarial environments (this is part of the audience). Keep total weight low, avoid blocking fonts, and never gate content behind JS-only interactions.
