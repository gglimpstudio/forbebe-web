import { connection } from "next/server";

import { normalizeRefreshMinutes, parseGoogleSlidesLink } from "@/lib/googleSlides";
import { getLaundryStatusPage } from "@/lib/sanity/queries";

/** Current board settings, so open screens pick up a new link or interval without a page reload. */
export async function GET() {
  // Run per request (not prerendered) while keeping the Sanity fetch cache from fetchSanity.
  await connection();
  const page = await getLaundryStatusPage();
  const { presentationId } = parseGoogleSlidesLink(page?.slidesUrl);
  return Response.json(
    {
      presentationId: presentationId ?? null,
      autoAdvanceSeconds: page?.autoAdvanceSeconds ?? null,
      refreshMinutes: normalizeRefreshMinutes(page?.refreshMinutes),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
