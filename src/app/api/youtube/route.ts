import { parseYouTubeLink } from "@/lib/youtube";

export async function GET(request: Request) {
  const { video, error } = parseYouTubeLink(new URL(request.url).searchParams.get("url"));
  if (!video) return Response.json({ error }, { status: 400 });

  try {
    // Rebuild the target from the validated ID; never fetch an arbitrary supplied URL.
    const endpoint = new URL("https://www.youtube.com/oembed");
    endpoint.searchParams.set("url", video.url);
    endpoint.searchParams.set("format", "json");
    const response = await fetch(endpoint, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) {
      return Response.json(
        { error: "영상 정보를 가져올 수 없습니다. 삭제·비공개 영상인지 확인하거나 제목을 직접 입력해주세요." },
        { status: 422 },
      );
    }
    const metadata = await response.json();
    if (typeof metadata.title !== "string" || !metadata.title.trim()) throw new Error("Missing title");
    return Response.json({ videoId: video.videoId, title: metadata.title.trim() });
  } catch {
    return Response.json(
      { error: "유튜브에 연결하지 못했습니다. 잠시 후 다시 시도하거나 제목을 직접 입력해주세요." },
      { status: 502 },
    );
  }
}
