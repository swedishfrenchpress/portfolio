"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { type Entry, LIMITS, sign, watchEntries } from "./nostr";
import "./guestbook.css";

const COOLDOWN_MS = 60_000;
/** Anyone filling the form faster than this is a bot. */
const MIN_FILL_MS = 3000;
const LAST_SIGNED = "mondo-guestbook-signed-at";

type Status =
  | { kind: "idle" }
  | { kind: "signing" }
  | { kind: "done" }
  | { kind: "error"; message: string };

const date = (seconds: number) =>
  new Date(seconds * 1000).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

/** The MONDO guestbook: a 1996 sign-in form whose entries live on Nostr. */
export function Guestbook() {
  const [entries, setEntries] = useState<Map<string, Entry>>(new Map());
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [message, setMessage] = useState("");
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    setLoading(true);
    setOffline(false);
    let heard = false;
    const stop = watchEntries(
      (entry) => {
        heard = true;
        setEntries((all) => (all.has(entry.id) ? all : new Map(all).set(entry.id, entry)));
      },
      () => setLoading(false),
      () => {
        setLoading(false);
        if (!heard) setOffline(true);
      },
    );
    return stop;
  }, [attempt]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.kind === "signing") return;
    const form = new FormData(event.currentTarget);
    const formElement = event.currentTarget;

    // Bots fill the hidden field or the whole form at once; tell them it worked.
    if (form.get("website") || Date.now() - mountedAt.current < MIN_FILL_MS) {
      setStatus({ kind: "done" });
      return;
    }
    const last = Number(localStorage.getItem(LAST_SIGNED) ?? 0);
    if (Date.now() - last < COOLDOWN_MS) {
      setStatus({ kind: "error", message: "You just signed! Give it a minute before signing again." });
      return;
    }

    setStatus({ kind: "signing" });
    // Let "Signing…" paint before the proof of work ties up the main thread.
    await new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve)));
    try {
      const entry = await sign({
        name: String(form.get("name") ?? ""),
        homepage: String(form.get("homepage") ?? ""),
        message: String(form.get("message") ?? ""),
      });
      localStorage.setItem(LAST_SIGNED, String(Date.now()));
      setEntries((all) => new Map(all).set(entry.id, entry));
      setStatus({ kind: "done" });
      setMessage("");
      formElement.reset();
    } catch (error) {
      setStatus({
        kind: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Try again.",
      });
    }
  };

  const list = [...entries.values()].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="gb">
      <p className="gb-intro">
        Thanks for stopping by! Sign my guestbook and let me know you were here.
      </p>

      <form className="gb-form" onSubmit={onSubmit}>
        <label className="gb-field">
          <span>Your name</span>
          <input name="name" required maxLength={LIMITS.name} autoComplete="nickname" />
        </label>
        <label className="gb-field">
          <span>Your homepage <i>(optional)</i></span>
          <input name="homepage" maxLength={LIMITS.homepage} inputMode="url" autoComplete="url" placeholder="https://" />
        </label>
        <label className="gb-field">
          <span>Your message</span>
          <textarea
            name="message"
            required
            rows={4}
            maxLength={LIMITS.message}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <small className="gb-count">
            {message.length}/{LIMITS.message}
          </small>
        </label>
        {/* A field only bots can see. */}
        <input className="gb-trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <div className="gb-actions">
          <button type="submit" className="gb-button" disabled={status.kind === "signing"}>
            {status.kind === "signing" ? "Signing…" : "Sign my guestbook"}
          </button>
          <p className="gb-status" role="status" aria-live="polite">
            {status.kind === "done" && "Thanks for signing!"}
            {status.kind === "error" && status.message}
          </p>
        </div>
      </form>

      <hr className="gb-rule" />

      <h2>{list.length > 0 ? `${list.length} ${list.length === 1 ? "person has" : "people have"} signed` : "Guests"}</h2>

      {list.length > 0 ? (
        <ol className="gb-entries">
          {list.map((entry) => (
            // data-id is the Nostr event id, for hiding an entry in hidden.ts.
            <li key={entry.id} className="gb-entry" data-id={entry.id}>
              <p className="gb-who">
                <b>{entry.name}</b>
                {entry.homepage && (
                  <>
                    {" "}
                    <a href={entry.homepage} target="_blank" rel="nofollow ugc noopener noreferrer">
                      homepage
                    </a>
                  </>
                )}
                <span className="gb-date">{date(entry.createdAt)}</span>
              </p>
              <p className="gb-message">{entry.message}</p>
            </li>
          ))}
        </ol>
      ) : loading ? (
        <p className="gb-empty">Dialing up the relays…</p>
      ) : offline ? (
        <p className="gb-empty">
          Couldn&rsquo;t reach the Nostr relays.{" "}
          <button type="button" className="gb-retry link" onClick={() => setAttempt((n) => n + 1)}>
            Try again
          </button>
        </p>
      ) : (
        <p className="gb-empty">Nobody has signed yet. Be the first!</p>
      )}
    </div>
  );
}
