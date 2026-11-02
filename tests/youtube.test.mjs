import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

import { parseYouTubeLink, shouldUseYouTubeTitle, youtubeEmbedUrl } from "../src/lib/youtube.ts";

const id = "M7lc1UVf-VE";

test("watch, share and Shorts links identify the same video and discard tracking parameters", () => {
  for (const link of [
    `https://www.youtube.com/watch?v=${id}&list=PLtest&t=30`,
    `https://youtu.be/${id}?si=share&t=30`,
    `https://www.youtube.com/shorts/${id}?feature=share`,
    `  https://m.youtube.com/watch?v=${id}  `,
    `youtube.com/watch?v=${id}`,
    `https://youtu.be/${id}/`,
  ]) {
    assert.deepEqual(parseYouTubeLink(link), { video: {
      videoId: id,
      url: `https://www.youtube.com/watch?v=${id}`,
      thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    } });
  }
});

test("incomplete IDs, non-video pages, fake YouTube domains and executable URLs have helpful errors", () => {
  for (const link of [
    undefined, "", " ", "not a URL", "https://www.youtube.com/watch", "https://www.youtube.com/watch?v=short",
    "https://youtube.com/playlist?list=PLtest", `https://youtube.com.evil.test/watch?v=${id}`,
    `https://evil.test/shorts/${id}`, `https://youtube.com@evil.test/watch?v=${id}`,
    `https://user@youtube.com/watch?v=${id}`, `https://youtu.be/${id}/extra`,
    `https://youtube.com:8080/watch?v=${id}`, "javascript:alert(1)", `https://youtube.com/shorts/${id}%3F`,
  ]) {
    const result = parseYouTubeLink(link);
    assert.equal(result.video, undefined, String(link));
    assert.ok(result.error.length > 10, String(link));
  }
});

test("title lookup fills an empty title and refreshes automatic titles while preserving editor changes", () => {
  assert.equal(shouldUseYouTubeTitle(undefined, undefined), true);
  assert.equal(shouldUseYouTubeTitle("  ", "원래 제목"), true);
  assert.equal(shouldUseYouTubeTitle("원래 제목", "원래 제목"), true);
  assert.equal(shouldUseYouTubeTitle("직접 수정한 제목", "원래 제목"), false);
});

test("selected player requests autoplay and inline playback", () => {
  const embed = new URL(youtubeEmbedUrl(id));
  assert.equal(embed.hostname, "www.youtube-nocookie.com");
  assert.equal(embed.pathname, `/embed/${id}`);
  assert.equal(embed.searchParams.get("autoplay"), "1");
  assert.equal(embed.searchParams.get("playsinline"), "1");
});

// Import the actual route without requiring Next.js's path-alias loader.
const source = (await readFile(new URL("../src/app/api/youtube/route.ts", import.meta.url), "utf8"))
  .replace('"@/lib/youtube"', JSON.stringify(new URL("../src/lib/youtube.ts", import.meta.url).href));
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
const { GET } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);

test("metadata route validates before fetching and uses a fixed oEmbed host for all three formats", async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async (endpoint, options) => {
    calls++;
    assert.equal(endpoint.origin, "https://www.youtube.com");
    assert.equal(endpoint.pathname, "/oembed");
    assert.equal(endpoint.searchParams.get("url"), `https://www.youtube.com/watch?v=${id}`);
    assert.ok(options.signal);
    return Response.json({ title: "  유튜브 영상 제목  " });
  };
  try {
    assert.equal((await GET(new Request("https://forbebe.test/api/youtube?url=https://evil.test"))).status, 400);
    assert.equal(calls, 0);
    for (const link of [`https://youtube.com/watch?v=${id}`, `https://youtu.be/${id}`, `https://youtube.com/shorts/${id}`]) {
      const response = await GET(new Request(`https://forbebe.test/api/youtube?url=${encodeURIComponent(link)}`));
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { videoId: id, title: "유튜브 영상 제목" });
    }
    assert.equal(calls, 3);
  } finally { globalThis.fetch = originalFetch; }
});

test("private/deleted video and upstream connection failures return actionable metadata errors", async () => {
  const originalFetch = globalThis.fetch;
  const request = () => new Request(`https://forbebe.test/api/youtube?url=https://youtu.be/${id}`);
  try {
    globalThis.fetch = async () => new Response("Not Found", { status: 404 });
    const missing = await GET(request());
    assert.equal(missing.status, 422);
    assert.match((await missing.json()).error, /삭제·비공개/);
    globalThis.fetch = async () => { throw new Error("timeout"); };
    const offline = await GET(request());
    assert.equal(offline.status, 502);
    assert.match((await offline.json()).error, /직접 입력/);
  } finally { globalThis.fetch = originalFetch; }
});
