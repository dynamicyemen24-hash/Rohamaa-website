/**
 * Sanity Client Configuration
 * مع دعم Fetch API المتقدم و Image URL Builder
 */
import { createClient } from "@sanity/client";

import type { QueryParams } from "@sanity/client";

// Use environment variables with fallbacks for development
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "xd0ohyiz";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || "2026-02-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

/**
 * Fetch helper with consistent error handling
 */
export async function sanityFetch<QueryString extends string>({
  query,
  params = {},
}: {
  query: QueryString;
  params?: QueryParams;
}): Promise<ReturnType<typeof client.fetch<QueryString>>> {
  try {
    return await client.fetch(query, params);
  } catch (error) {
    console.error("[Sanity] Fetch error:", error);
    throw error;
  }
}

/**
 * Get a server-side client with write access
 */
export function getServerClient(token?: string) {
  return client.withConfig({
    useCdn: false,
    token: token || import.meta.env.VITE_SANITY_API_READ_TOKEN,
  });
}
