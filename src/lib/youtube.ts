export type YouTubeLink = { videoId: string; url: string; thumbnailUrl: string };
export type YouTubeLinkResult = { video: YouTubeLink; error?: never } | { video?: never; error: string };

/** Only accept known YouTube hosts and a single, complete video identifier. */
export function parseYouTubeLink(value: unknown): YouTubeLinkResult {
  if (typeof value !== "string" || !value.trim()) return { error: "유튜브 링크를 입력해주세요." };
  const input = value.trim();
  let url: URL;
  try {
    url = new URL(/^(?:www\.|m\.)?(?:youtube\.com|youtu\.be)\//i.test(input) ? `https://${input}` : input);
  } catch {
    return { error: "올바른 유튜브 주소를 입력해주세요. 예: https://youtu.be/영상ID" };
  }
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password || url.port) {
    return { error: "http 또는 https로 시작하는 유튜브 영상 주소를 입력해주세요." };
  }
  const host = url.hostname.toLowerCase();
  if (!["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be", "www.youtu.be"].includes(host)) {
    return { error: "youtube.com 또는 youtu.be 링크만 등록할 수 있습니다." };
  }
  const path = url.pathname.replace(/\/$/, "");
  let videoId: string | null = null;
  if (host === "youtu.be" || host === "www.youtu.be") videoId = path.slice(1);
  else if (path === "/watch") videoId = url.searchParams.get("v");
  else if (path.startsWith("/shorts/")) videoId = path.slice("/shorts/".length);
  else return { error: "일반 영상(/watch?v=…), 공유(youtu.be/…), 쇼츠(/shorts/…) 링크를 입력해주세요." };

  if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    return { error: "영상 ID가 없거나 올바르지 않습니다. 유튜브에서 영상 링크를 다시 복사해주세요." };
  }
  return {
    video: {
      videoId,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    },
  };
}

export function youtubeEmbedUrl(videoId: string) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;
}

/** A later metadata response must never overwrite an editor's custom title. */
export function shouldUseYouTubeTitle(title?: string, previousYouTubeTitle?: string) {
  return !title?.trim() || title === previousYouTubeTitle;
}
