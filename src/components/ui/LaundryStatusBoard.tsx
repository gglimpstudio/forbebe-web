"use client";

import { Maximize2, RefreshCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  DEFAULT_SLIDE_ASPECT,
  EMBED_EDGE_CROP_PX,
  EMBED_TOOLBAR_PX,
  googleSlidesEmbedUrl,
  normalizeRefreshMinutes,
} from "@/lib/googleSlides";

const SETTINGS_POLL_MS = 60_000;
const TICK_MS = 15_000;

type Frame = { key: number; src: string; loaded: boolean };
type SettingsResponse = { presentationId: string | null; autoAdvanceSeconds?: number | null; refreshMinutes?: number };

const clock = () => new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });

export function LaundryStatusBoard({ presentationId, autoAdvanceSeconds, refreshMinutes, slideAspect = DEFAULT_SLIDE_ASPECT, title }: {
  presentationId: string;
  autoAdvanceSeconds?: number | null;
  refreshMinutes?: number | null;
  slideAspect?: number;
  title: string;
}) {
  const [frames, setFrames] = useState<Frame[]>(() => [
    { key: 0, src: googleSlidesEmbedUrl(presentationId, autoAdvanceSeconds), loaded: false },
  ]);
  const [interval, setIntervalMinutes] = useState(() => normalizeRefreshMinutes(refreshMinutes));
  const [loadedAt, setLoadedAt] = useState<string | null>(null);
  const state = useRef({ src: frames[0].src, refreshMs: interval * 60_000, lastLoad: 0, lastSettings: 0, nextKey: 1 });

  useEffect(() => {
    const current = state.current;
    current.lastLoad = current.lastSettings = Date.now();
    let cancelled = false;

    // Google gives no change signal without download access, so the deck is simply reloaded on a timer.
    // The new copy loads behind the visible one and replaces it once rendered (no blank flash).
    const reload = (src: string) => {
      current.src = src;
      current.lastLoad = Date.now();
      const key = current.nextKey++;
      setFrames((previous) => [...previous, { key, src, loaded: false }]);
    };

    async function syncSettings() {
      current.lastSettings = Date.now();
      try {
        const data: SettingsResponse = await (await fetch("/api/laundry-status", { cache: "no-store" })).json();
        if (cancelled || !data.presentationId) return;
        const minutes = normalizeRefreshMinutes(data.refreshMinutes);
        current.refreshMs = minutes * 60_000;
        setIntervalMinutes(minutes);
        const src = googleSlidesEmbedUrl(data.presentationId, data.autoAdvanceSeconds);
        if (src !== current.src) reload(src);
      } catch {
        // Network hiccup: keep the current settings and try again next round.
      }
    }

    function tick() {
      if (document.visibilityState !== "visible") return;
      const now = Date.now();
      if (now - current.lastSettings >= SETTINGS_POLL_MS) void syncSettings();
      if (now - current.lastLoad >= current.refreshMs) reload(current.src);
    }

    const timer = setInterval(tick, TICK_MS);
    document.addEventListener("visibilitychange", tick);
    return () => {
      cancelled = true;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);

  const onFrameLoad = (key: number) => {
    setFrames((previous) => previous.filter((frame) => frame.key >= key).map((frame) => frame.key === key ? { ...frame, loaded: true } : frame));
    setLoadedAt(clock());
  };

  return (
    // Phones: edge-to-edge slides without card chrome so the deck gets every pixel of width.
    <div className="-mx-4 min-w-0 sm:mx-0 sm:rounded-[22px] sm:border sm:border-border-soft sm:bg-background-light sm:p-2.5 sm:shadow-[0_14px_40px_rgba(18,58,50,0.06)] lg:p-3">
      {/* Embed box = slide at its own ratio + Google's control bar, so it never letterboxes in black;
          it is slightly wider than the visible box so the dark edge Google draws is clipped away. */}
      <div className="overflow-hidden sm:rounded-[12px]">
        <div
          className="relative"
          style={{ margin: `-${EMBED_EDGE_CROP_PX}px -${EMBED_EDGE_CROP_PX}px 0`, paddingBottom: EMBED_TOOLBAR_PX }}
        >
          <div aria-hidden="true" style={{ aspectRatio: slideAspect }} />
          {frames.map((frame, index) => (
          <iframe
            key={frame.key}
            src={frame.src}
            title={title}
            onLoad={() => onFrameLoad(frame.key)}
            className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-300 ${index === 0 || frame.loaded ? "opacity-100" : "opacity-0"}`}
            style={{ zIndex: index }}
            allowFullScreen
          />
          ))}
        </div>
      </div>
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 sm:mt-3 sm:px-1">
        <p className="inline-flex items-center gap-1.5 text-xs text-text-sub" aria-live="polite">
          <RefreshCw aria-hidden="true" className="h-3 w-3" />
          {interval}분마다 자동으로 새로고침됩니다.{loadedAt && ` (마지막 ${loadedAt})`}
        </p>
        <a
          href={frames[frames.length - 1].src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-border-soft bg-background-main px-3 py-1.5 text-xs font-medium text-brand-primary hover:border-brand-primary focus-visible:outline-2 focus-visible:outline-brand-primary"
        >
          <Maximize2 aria-hidden="true" className="h-3.5 w-3.5" /> 크게 보기
        </a>
      </div>
    </div>
  );
}
