import { Redis } from "@upstash/redis";

// MONDO's visitor counter: one Redis key, bumped once per MONDO page view.
// Nothing about the visitor is stored. Needs the Upstash Redis integration
// from the Vercel project's Storage tab, which sets the env vars below.
const KEY = "mondo:visits";

const configured = () =>
  !!(process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) &&
  !!(process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN);

export async function POST() {
  if (!configured()) {
    return Response.json({ count: null }, { status: 503 });
  }
  try {
    const count = await Redis.fromEnv().incr(KEY);
    return Response.json({ count }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ count: null }, { status: 502 });
  }
}
