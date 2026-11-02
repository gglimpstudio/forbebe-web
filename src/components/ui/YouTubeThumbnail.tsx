"use client";

import { useState } from "react";

// YouTube may return a tiny placeholder with HTTP 200 for unavailable sizes.
const candidates = [
  { filename: "maxresdefault", minWidth: 641 },
  { filename: "sddefault", minWidth: 481 },
  { filename: "hqdefault", minWidth: 0 },
] as const;

export function YouTubeThumbnail({ videoId, first = false }: { videoId: string; first?: boolean }) {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const candidate = candidates[candidateIndex];
  const loadFallback = () => setCandidateIndex((current) => Math.min(current + 1, candidates.length - 1));

  return (
    // YouTube serves the original thumbnail; retain the existing hqdefault as the final fallback.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://i.ytimg.com/vi/${videoId}/${candidate.filename}.jpg`}
      alt=""
      width={1280}
      height={720}
      loading={first ? "eager" : "lazy"}
      fetchPriority={first ? "high" : "auto"}
      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      onError={candidateIndex < candidates.length - 1 ? loadFallback : undefined}
      onLoad={(event) => {
        if (event.currentTarget.naturalWidth < candidate.minWidth) loadFallback();
      }}
    />
  );
}
