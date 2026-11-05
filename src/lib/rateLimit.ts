import 'server-only';

/**
 * Simple in-memory sliding-window rate limiter for the enquiry endpoint.
 * Good enough for a single Node server. If you deploy across several
 * instances or serverless functions, swap this for a shared store
 * (for example Redis or a MongoDB collection with a TTL index).
 */
type Bucket = { hits: number[] };

const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);

  if (bucket.hits.length >= limit) {
    const retryAfterSec = Math.ceil((windowMs - (now - bucket.hits[0])) / 1000);
    buckets.set(key, bucket);
    return { ok: false, retryAfterSec };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);

  // Occasional cleanup so the map doesn't grow forever
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) {
      if (b.hits.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }

  return { ok: true, retryAfterSec: 0 };
}
