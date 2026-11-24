"use client";

import { Check, Copy, Download, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

import { detectInstallEnvironment, dismissInstallBanner, installGuides, isInstallBannerSuppressed, markAppInstalled, type InstallGuide } from "@/lib/appInstall";
import { cn } from "@/lib/utils";

type BeforeInstallPromptEvent = Event & {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

// Chrome can fire beforeinstallprompt before React hydrates, so capture it when this module loads.
let deferredPrompt: BeforeInstallPromptEvent | null = null;
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event as BeforeInstallPromptEvent;
  });
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    const register = () => {
      navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch(() => {});
    };
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }
}

const subscribe = () => () => {};

function currentGuide() {
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
  return installGuides[detectInstallEnvironment({ userAgent: navigator.userAgent, isStandalone, maxTouchPoints: navigator.maxTouchPoints })];
}

/** Renders nothing during SSR and hydration, then shows the install path for this browser. */
export function AppInstallBanner({ aboveBottomCta }: { aboveBottomCta: boolean }) {
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const guide = hydrated ? currentGuide() : null;
  return guide ? <InstallSession guide={guide} aboveBottomCta={aboveBottomCta} /> : null;
}

type View = "hidden" | "banner" | "guide";

function InstallSession({ guide, aboveBottomCta }: { guide: InstallGuide; aboveBottomCta: boolean }) {
  const [view, setView] = useState<View>(() => (isInstallBannerSuppressed() ? "hidden" : "banner"));
  const titleId = useId();

  useEffect(() => {
    const onInstalled = () => {
      markAppInstalled();
      setView("hidden");
    };
    window.addEventListener("appinstalled", onInstalled);
    return () => window.removeEventListener("appinstalled", onInstalled);
  }, []);

  async function install() {
    const prompt = deferredPrompt;
    deferredPrompt = null;
    if (!prompt) {
      setView("guide");
      return;
    }
    try {
      await prompt.prompt();
      if ((await prompt.userChoice).outcome === "accepted") {
        markAppInstalled();
        setView("hidden");
      }
    } catch {
      setView("guide");
    }
  }

  if (view === "hidden") return null;

  return (
    <>
      <section
        aria-labelledby={titleId}
        className={cn(
          "fixed inset-x-0 z-40 mx-3 rounded-[22px] border border-border-soft/80 bg-background-main/95 p-3 shadow-[0_-10px_38px_rgba(18,58,50,0.18)] backdrop-blur lg:hidden",
          aboveBottomCta ? "bottom-[calc(86px+env(safe-area-inset-bottom))]" : "bottom-[calc(12px+env(safe-area-inset-bottom))]",
        )}
      >
        <div className="flex items-start gap-3 pr-7">
          <Image src="/icon-192x192.png" alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-[12px]" />
          <div className="min-w-0">
            <p id={titleId} className="text-[14px] font-semibold leading-5 text-green-dark [word-break:keep-all]">
              포베베를 앱처럼 편리하게 이용하세요!
            </p>
            <p className="mt-0.5 text-[12px] leading-[18px] text-text-sub [word-break:keep-all]">홈 화면에 포베베를 설치하면 언제든 빠르게 이용하실 수 있습니다.</p>
          </div>
        </div>
        <button
          type="button"
          className="mt-2.5 flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-brand-primary text-[13px] font-semibold text-text-inverse shadow-[0_8px_18px_rgba(18,58,50,0.16)] transition hover:bg-green-dark"
          onClick={install}
        >
          <Download className="h-4 w-4" aria-hidden />
          포베베 앱 설치하기
        </button>
        <button
          type="button"
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full text-text-sub transition hover:bg-background-soft"
          aria-label="설치 안내 닫기"
          onClick={() => {
            dismissInstallBanner();
            setView("hidden");
          }}
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </section>
      {view === "guide" ? <GuideSheet guide={guide} onClose={() => setView("banner")} /> : null}
    </>
  );
}

function GuideSheet({ guide, onClose }: { guide: InstallGuide; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="fixed inset-x-0 bottom-0 top-auto m-0 max-h-[calc(100dvh-2rem)] w-full max-w-none overflow-y-auto rounded-t-[22px] border border-b-0 border-border-soft bg-background-main p-0 text-text-main shadow-[0_-18px_58px_rgba(18,58,50,0.2)] backdrop:bg-green-dark/30 backdrop:backdrop-blur-[2px] sm:inset-x-auto sm:left-1/2 sm:max-w-[480px] sm:-translate-x-1/2"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-3">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border-soft" aria-hidden />
        <div className="flex items-start justify-between gap-3">
          <h2 id={titleId} className="pt-1.5 text-[17px] font-semibold leading-6 text-green-dark [word-break:keep-all]">
            {guide.title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background-light text-brand-primary transition hover:bg-background-soft"
            aria-label="설치 방법 닫기"
            onClick={() => dialogRef.current?.close()}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        {guide.notes.length > 0 ? (
          <ul className="mt-3 grid gap-1.5">
            {guide.notes.map((note) => (
              <li key={note} className="rounded-[12px] bg-background-soft px-3 py-2 text-[13px] font-medium leading-5 text-green-dark [word-break:keep-all]">
                {note}
              </li>
            ))}
          </ul>
        ) : null}
        <ol className="mt-4 grid gap-2.5">
          {guide.steps.map((step, index) => (
            <li key={step} className="flex gap-3 text-[14px] leading-[22px] text-text-main [word-break:keep-all]">
              <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand-primary text-[12px] font-semibold text-text-inverse" aria-hidden>
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        {guide.copyLink ? <CopyLink /> : null}
      </div>
    </dialog>
  );
}

type CopyStatus = "idle" | "copied" | "manual";

const copyStatusMessage: Record<CopyStatus, string> = {
  idle: "",
  copied: "복사되었습니다",
  manual: "링크를 길게 눌러 복사해 주세요.",
};

function CopyLink() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<CopyStatus>("idle");
  const [url] = useState(() => window.location.href);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
      return;
    } catch { /* In-app browsers may block the Clipboard API. Fall back to copying the selected input. */ }
    const input = inputRef.current;
    input?.focus();
    input?.setSelectionRange(0, url.length);
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch { /* The selected link stays on screen for a manual copy. */ }
    setStatus(copied ? "copied" : "manual");
  }

  return (
    <div className="mt-5">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          readOnly
          value={url}
          aria-label="포베베 홈페이지 링크"
          className="min-w-0 flex-1 rounded-full border border-border-soft bg-background-light px-4 text-[13px] text-text-sub outline-none focus-visible:border-brand-primary"
          onFocus={(event) => event.currentTarget.select()}
        />
        <button
          type="button"
          className="flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-brand-primary px-4 text-[13px] font-semibold text-text-inverse transition hover:bg-green-dark"
          onClick={copy}
        >
          {status === "copied" ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
          링크 복사
        </button>
      </div>
      <p className={cn("mt-2 min-h-5 text-[13px] font-medium leading-5", status === "copied" ? "text-brand-primary" : "text-text-sub")} aria-live="polite">
        {copyStatusMessage[status]}
      </p>
    </div>
  );
}
