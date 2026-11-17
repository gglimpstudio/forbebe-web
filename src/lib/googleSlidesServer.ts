import { DEFAULT_SLIDE_ASPECT, googleSlidesEmbedUrl, parseSlideAspect } from "@/lib/googleSlides";

/** Page size rarely changes, so the embed page is re-read with the page's 5-minute revalidation. */
export async function getSlideAspect(presentationId: string) {
  try {
    const response = await fetch(googleSlidesEmbedUrl(presentationId), {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(10_000),
    });
    return (response.ok && parseSlideAspect(await response.text())) || DEFAULT_SLIDE_ASPECT;
  } catch {
    return DEFAULT_SLIDE_ASPECT;
  }
}
