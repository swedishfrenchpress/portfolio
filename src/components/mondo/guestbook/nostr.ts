import { getPow, minePow } from "nostr-tools/nip13";
import { SimplePool } from "nostr-tools/pool";
import { type Event, finalizeEvent, generateSecretKey, getPublicKey } from "nostr-tools/pure";
import { HIDDEN } from "./hidden";

// The guestbook lives on Nostr: every entry is a NIP-22 comment (kind 1111)
// on this page's URL, the standard way to comment on a website, so other
// Nostr clients can show it too. Each one is signed with a fresh throwaway
// key, so there's no server and no account. Spam is kept out by proof of
// work, and anything that slips through goes in hidden.ts.

export const GUESTBOOK_URL = "https://erik.day/guestbook";
export const RELAYS = ["wss://relay.damus.io", "wss://nos.lol", "wss://relay.primal.net"];
const COMMENT = 1111;
/** Leading zero bits every entry's id needs (NIP-13). A blink for a person, a cost for a bot. */
export const DIFFICULTY = 16;

export const LIMITS = { name: 40, homepage: 120, message: 500 };

export type Entry = {
  id: string;
  name: string;
  homepage?: string;
  message: string;
  createdAt: number;
};

const tag = (event: Event, name: string) => event.tags.find((t) => t[0] === name)?.[1];

function safeUrl(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

/** Turns a relay event into an entry, or null if it isn't one we show. */
export function toEntry(event: Event): Entry | null {
  if (event.kind !== COMMENT || tag(event, "I") !== GUESTBOOK_URL) return null;
  if (getPow(event.id) < DIFFICULTY || HIDDEN.has(event.id)) return null;
  const message = event.content.trim().slice(0, LIMITS.message);
  if (!message) return null;
  return {
    id: event.id,
    name: (tag(event, "name") ?? "").trim().slice(0, LIMITS.name) || "Anonymous",
    homepage: safeUrl(tag(event, "r")),
    message,
    createdAt: event.created_at,
  };
}

let pool: SimplePool | null = null;
const getPool = () => (pool ??= new SimplePool());

/**
 * Streams entries as relays send them. `ready` fires once every relay has
 * answered or timed out; `failed` if every relay drops the subscription.
 */
export function watchEntries(onEntry: (entry: Entry) => void, ready: () => void, failed: () => void) {
  let stopped = false;
  const sub = getPool().subscribeMany(
    RELAYS,
    { kinds: [COMMENT], "#I": [GUESTBOOK_URL], limit: 500 },
    {
      onevent(event) {
        const entry = toEntry(event);
        if (entry) onEntry(entry);
      },
      oneose: ready,
      onclose() {
        if (!stopped) failed();
      },
      maxWait: 6000,
    },
  );
  return () => {
    stopped = true;
    sub.close();
  };
}

export type Draft = { name: string; homepage: string; message: string };

/**
 * Builds the entry, mines its proof of work, signs it with a throwaway key
 * and publishes it. Resolves with the entry once at least one relay
 * accepts it.
 */
export async function sign(draft: Draft): Promise<Entry> {
  const secret = generateSecretKey();
  const homepage = safeUrl(draft.homepage.trim().slice(0, LIMITS.homepage));

  const mined = minePow(
    {
      kind: COMMENT,
      created_at: Math.floor(Date.now() / 1000),
      content: draft.message.trim().slice(0, LIMITS.message),
      tags: [
        ["I", GUESTBOOK_URL],
        ["K", "web"],
        ["i", GUESTBOOK_URL],
        ["k", "web"],
        ["name", draft.name.trim().slice(0, LIMITS.name)],
        ...(homepage ? [["r", homepage]] : []),
        ["client", "erik.day"],
      ],
      pubkey: getPublicKey(secret),
    },
    DIFFICULTY,
  );
  const event = finalizeEvent(mined, secret);

  const results = await Promise.allSettled(getPool().publish(RELAYS, event));
  if (!results.some((r) => r.status === "fulfilled")) {
    throw new Error("None of the relays took it. Check your connection and try again.");
  }
  return toEntry(event)!;
}
