// Guestbook entries live on public Nostr relays and can't be deleted, only
// hidden here. To hide one, inspect it on the page, copy its data-id (the
// Nostr event id) into this list, and redeploy.
export const HIDDEN: ReadonlySet<string> = new Set<string>([
  // Erik's launch-day tests, "test" and "hellooo".
  "000026c23d35e064024ba18f46289eb32bf897762254f3a744e2b28089cb861b",
  "000001492247ac43d72ae985381fd88876d8e09b8336106a61fb83fc5eb8d267",
]);
