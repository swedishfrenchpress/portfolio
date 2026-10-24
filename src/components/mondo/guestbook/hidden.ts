// Guestbook entries live on public Nostr relays and can't be deleted, only
// hidden here. To hide one, inspect it on the page, copy its data-id (the
// Nostr event id) into this list, and redeploy.
export const HIDDEN: ReadonlySet<string> = new Set<string>([]);
