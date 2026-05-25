import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/env";
import type { SanityImage } from "@/types";

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

export function urlForImage(image?: SanityImage) {
  if (!builder || !image?.asset) return null;
  return builder.image(image);
}

export function imageAlt(image: SanityImage | undefined, fallback: string) {
  return image?.alt || fallback;
}
