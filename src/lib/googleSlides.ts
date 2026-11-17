export type GoogleSlidesLinkResult = { presentationId: string; error?: never } | { presentationId?: never; error: string };

/** Google Slides auto-advance only accepts these delays (milliseconds). */
export const slideDelayOptions = [3, 5, 10, 15, 30, 60] as const;

/** Only accept a docs.google.com presentation link with a complete file ID. */
export function parseGoogleSlidesLink(value: unknown): GoogleSlidesLinkResult {
  if (typeof value !== "string" || !value.trim()) return { error: "구글 슬라이드 링크를 입력해주세요." };
  const input = value.trim();
  let url: URL;
  try {
    url = new URL(/^docs\.google\.com\//i.test(input) ? `https://${input}` : input);
  } catch {
    return { error: "올바른 구글 슬라이드 주소를 입력해주세요. 예: https://docs.google.com/presentation/d/파일ID/edit" };
  }
  if (url.protocol !== "https:" || url.username || url.password || url.port || url.hostname.toLowerCase() !== "docs.google.com") {
    return { error: "https://docs.google.com/presentation/… 형식의 구글 슬라이드 링크만 등록할 수 있습니다." };
  }
  // Optional account segment: /presentation/u/0/d/<id>
  const match = url.pathname.match(/^\/presentation\/(?:u\/\d+\/)?d\/([^/]+)/);
  if (!match) return { error: "구글 슬라이드(presentation) 링크가 아닙니다. 슬라이드의 공유 링크를 복사해주세요." };
  if (match[1] === "e") {
    return { error: "‘웹에 게시’ 링크는 변경 감지가 되지 않습니다. 오른쪽 위 ‘공유’ → ‘링크 복사’로 받은 주소를 입력해주세요." };
  }
  if (!/^[a-zA-Z0-9_-]{25,}$/.test(match[1])) {
    return { error: "슬라이드 파일 ID가 올바르지 않습니다. 공유 링크를 다시 복사해주세요." };
  }
  return { presentationId: match[1] };
}

export function googleSlidesEmbedUrl(presentationId: string, autoAdvanceSeconds?: number | null) {
  const url = new URL(`https://docs.google.com/presentation/d/${presentationId}/embed`);
  const delay = slideDelayOptions.find((seconds) => seconds === autoAdvanceSeconds);
  url.searchParams.set("start", delay ? "true" : "false");
  url.searchParams.set("loop", delay ? "true" : "false");
  if (delay) url.searchParams.set("delayms", String(delay * 1000));
  return url.toString();
}

/** How often (minutes) the board reloads the slides to pick up edits. */
export const refreshMinuteOptions = [1, 3, 5, 10] as const;
export const DEFAULT_REFRESH_MINUTES = 5;

export function normalizeRefreshMinutes(value: unknown) {
  return refreshMinuteOptions.find((minutes) => minutes === value) ?? DEFAULT_REFRESH_MINUTES;
}

/** Height (px) of the control bar Google draws under the slide inside /embed (measured 2026-11). */
export const EMBED_TOOLBAR_PX = 36;
/** Google rings the slide with a thin dark edge; this much is cropped off the top and sides. */
export const EMBED_EDGE_CROP_PX = 2;
export const DEFAULT_SLIDE_ASPECT = 16 / 9;

/** Read the deck's page size (e.g. 960×540) from the embed page's slide SVG viewBox. */
export function parseSlideAspect(html: string) {
  const match = html.match(/viewBox(?:\\x3d\\x22|=")0(?:\.0)? 0(?:\.0)? ([\d.]+) ([\d.]+)/);
  const ratio = match ? Number(match[1]) / Number(match[2]) : NaN;
  return Number.isFinite(ratio) && ratio > 0.2 && ratio < 5 ? ratio : null;
}
