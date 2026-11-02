"use client";

import { ExternalLink, Play } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/ui/Card";
import { YouTubeThumbnail } from "@/components/ui/YouTubeThumbnail";
import { parseYouTubeLink, youtubeEmbedUrl } from "@/lib/youtube";
import type { YouTubeVideo } from "@/types";

export function VideoBoard({ videos }: { videos: YouTubeVideo[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const items = videos.flatMap((item) => {
    const { video } = parseYouTubeLink(item.url);
    return video ? [{ ...item, ...video, title: item.title?.trim() || item.youtubeTitle || "YouTube 영상" }] : [];
  });

  if (!items.length) {
    return <p className="py-16 text-center text-text-sub sm:py-24">아직 등록된 영상이 없습니다.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {items.map((item, index) => (
        <Card key={item._id} padding="compact" className="min-w-0 hover:translate-y-0">
          <div className="relative aspect-video overflow-hidden rounded-[10px] bg-green-dark sm:rounded-[12px]">
            {activeId === item._id ? (
              <iframe
                key={item.videoId}
                src={youtubeEmbedUrl(item.videoId)}
                title={item.title}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <button
                type="button"
                aria-label={`${item.title} 재생`}
                onClick={() => setActiveId(item._id)}
                className="group absolute inset-0 h-full w-full cursor-pointer overflow-hidden focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-brand-secondary"
              >
                <YouTubeThumbnail key={item.videoId} videoId={item.videoId} first={index === 0} />
                <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition group-hover:bg-black/20">
                  <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-background-main text-green-dark shadow-lg transition group-hover:scale-110 sm:h-[42px] sm:w-[42px]">
                    <Play aria-hidden="true" className="ml-0.5 h-4 w-4 fill-current sm:h-[18px] sm:w-[18px]" />
                  </span>
                </span>
              </button>
            )}
          </div>
          <h2 className="cms-lines mt-3 text-lg font-medium leading-7 text-brand-primary">{item.title}</h2>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-flex items-center gap-1 text-xs text-text-sub underline-offset-4 hover:text-brand-primary hover:underline focus-visible:outline-2 focus-visible:outline-brand-primary">
            YouTube에서 보기 <ExternalLink aria-hidden="true" className="h-3 w-3" />
          </a>
        </Card>
      ))}
    </div>
  );
}
