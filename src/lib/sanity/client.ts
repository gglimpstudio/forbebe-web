import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

export const sanityEnabled = Boolean(projectId && dataset);
export const sanityCacheTag = "sanity";

export const client = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_READ_TOKEN,
      perspective: "published",
    })
  : null;

export async function fetchSanity<T>(query: string, params?: Record<string, string | number | boolean>) {
  if (!client) return null;

  try {
    return await client.fetch<T>(query, params || {}, { next: { revalidate: 300, tags: [sanityCacheTag] } });
  } catch {
    return null;
  }
}
