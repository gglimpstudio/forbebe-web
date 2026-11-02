"use client";

import { useEffect, useRef, useState } from "react";
import { set, type ObjectInputProps, type StringInputProps } from "sanity";

import { parseYouTubeLink, shouldUseYouTubeTitle } from "@/lib/youtube";

type VideoDocument = { url?: string; title?: string; youtubeTitle?: string; youtubeVideoId?: string };

export function YouTubeUrlInput(props: StringInputProps) {
  const { video, error } = parseYouTubeLink(props.value);
  return (
    <div>
      {props.renderDefault(props)}
      {props.value && error ? <p role="alert" style={{ color: "#b42318", fontSize: 13, marginTop: 8 }}>{error}</p> : null}
      {video ? (
        <div style={{ marginTop: 16 }}>
          {/* YouTube already serves optimized thumbnails; no image proxy is needed. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={video.thumbnailUrl} alt="등록할 유튜브 영상 썸네일" style={{ display: "block", width: "100%", maxWidth: 480, aspectRatio: "16/9", objectFit: "cover", borderRadius: 8 }} />
          <p style={{ fontSize: 12, marginTop: 8 }}>썸네일 미리보기 · <a href={video.url} target="_blank" rel="noopener noreferrer">YouTube에서 원본 확인</a></p>
        </div>
      ) : null}
    </div>
  );
}

export function YouTubeVideoInput(props: ObjectInputProps) {
  const { value, onChange, readOnly } = props;
  const document = value as VideoDocument | undefined;
  const latestDocument = useRef(document);
  const { video } = parseYouTubeLink(document?.url);
  const videoId = video?.videoId;
  const [result, setResult] = useState<{ videoId: string; error?: string } | null>(null);

  useEffect(() => { latestDocument.current = document; }, [document]);

  useEffect(() => {
    if (!videoId || readOnly) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/youtube?url=${encodeURIComponent(`https://youtu.be/${videoId}`)}`, { signal: controller.signal });
        const data = await response.json();
        if (!response.ok || typeof data.title !== "string" || data.videoId !== videoId) {
          throw new Error(data.error || "영상 제목을 가져오지 못했습니다. 제목을 직접 입력해주세요.");
        }
        const current = latestDocument.current;
        if (controller.signal.aborted || parseYouTubeLink(current?.url).video?.videoId !== videoId) return;
        const patches = [];
        if (shouldUseYouTubeTitle(current?.title, current?.youtubeTitle) && current?.title !== data.title) patches.push(set(data.title, ["title"]));
        if (current?.youtubeTitle !== data.title) patches.push(set(data.title, ["youtubeTitle"]));
        if (current?.youtubeVideoId !== videoId) patches.push(set(videoId, ["youtubeVideoId"]));
        if (patches.length) onChange(patches);
        setResult({ videoId });
      } catch (error) {
        if (!controller.signal.aborted) setResult({ videoId, error: error instanceof Error ? error.message : "영상 제목을 가져오지 못했습니다." });
      }
    }, 400);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [videoId, onChange, readOnly]);

  return (
    <div>
      {props.renderDefault(props)}
      {videoId && !readOnly ? (
        <p role="status" style={{ fontSize: 13, lineHeight: 1.6, marginTop: 16 }}>
          {result?.videoId !== videoId ? "유튜브 영상 제목을 불러오는 중입니다…" : result.error || "유튜브 제목을 불러왔습니다. 제목은 자유롭게 수정할 수 있습니다."}
        </p>
      ) : null}
    </div>
  );
}
