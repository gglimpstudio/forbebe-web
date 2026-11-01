"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";

import { usePopupImageGesture } from "@/components/ui/usePopupImageGesture";
import { hidePopup, isPopupHidden } from "@/lib/homePopupStorage";
import type { PopupSlide } from "@/types";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
const controlClass = "flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-neutral-600 outline-none hover:bg-black/5 focus-visible:outline-solid focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-primary";
const hideClass = "min-h-11 max-w-full rounded-sm px-1 py-2 text-left text-[13px] leading-5 text-white underline-offset-4 outline-none hover:underline focus-visible:outline-solid focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white";

/** Render no slide markup until storage can be checked, including during SSR. */
export function ImagePopup({ slides }: { slides: PopupSlide[] }) {
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  return hydrated ? <PopupSession slides={slides} /> : null;
}

function PopupSession({ slides }: { slides: PopupSlide[] }) {
  const [state, setState] = useState(() => ({ items: slides.filter((item) => !isPopupHidden(item)), index: 0, open: true }));
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const backdropPress = useRef<{ id: number; x: number; y: number; outside: boolean; moved: boolean } | null>(null);
  const titleId = useId();
  const current = state.items[state.index];
  const open = state.open && Boolean(current);
  const multiple = state.items.length > 1;
  const imageGesture = usePopupImageGesture((offset) => { if (multiple) move(offset); }, contentRef);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const body = document.body;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const original = { overflow: body.style.overflow, position: body.style.position, top: body.style.top, left: body.style.left, width: body.style.width, paddingRight: body.style.paddingRight };
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const paddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    Object.assign(body.style, { overflow: "hidden", position: "fixed", top: `-${scrollY}px`, left: `-${scrollX}px`, width: "100%", paddingRight: `${paddingRight + scrollbarWidth}px` });
    let restored = false;
    const restore = () => {
      if (restored) return;
      restored = true;
      Object.assign(body.style, original);
      window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
    const restoreOnClose = () => { if (!dialog.open) restore(); };
    dialog.addEventListener("close", restoreOnClose);
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.removeEventListener("close", restoreOnClose);
      if (dialog.open) dialog.close();
      restore();
    };
  }, [open]);

  useLayoutEffect(() => {
    const content = contentRef.current;
    content?.scrollTo({ top: 0, behavior: "instant" });
    const dialog = dialogRef.current;
    if (dialog?.open && !dialog.contains(document.activeElement)) closeRef.current?.focus({ preventScroll: true });
    // A taller slide can move its previously focused controls below the viewport.
    const focused = document.activeElement;
    if (dialog?.open && content && focused instanceof HTMLElement && focused !== content && content.contains(focused)) {
      const bounds = content.getBoundingClientRect();
      const focusBounds = focused.getBoundingClientRect();
      if (focusBounds.top < bounds.top || focusBounds.bottom > bounds.bottom) content.focus({ preventScroll: true });
    }
  }, [current?.key, multiple]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const controls = controlsRef.current;
    const footer = footerRef.current;
    if (!open || !dialog || !controls) return;
    const measure = () => {
      dialog.style.setProperty("--popup-controls-height", `${controls.getBoundingClientRect().height}px`);
      dialog.style.setProperty("--popup-footer-height", `${footer?.getBoundingClientRect().height || 0}px`);
    };
    measure();
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    observer.observe(controls);
    if (footer) observer.observe(footer);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [open, current?.key, multiple]);

  useEffect(() => {
    const syncHiddenItems = (event: StorageEvent) => {
      if (event.key && !event.key.startsWith("forbebe:home-popup:")) return;
      setState((value) => {
        const items = value.items.filter((item) => !isPopupHidden(item));
        if (items.length === value.items.length) return value;
        const index = items.findIndex((item) => item.key === value.items[value.index]?.key);
        return { ...value, items, index: index >= 0 ? index : value.index % (items.length || 1) };
      });
    };
    window.addEventListener("storage", syncHiddenItems);
    return () => window.removeEventListener("storage", syncHiddenItems);
  }, []);

  function move(offset: number) {
    setState((value) => value.items.length ? { ...value, index: (value.index + offset + value.items.length) % value.items.length } : value);
  }

  function removeItem(key: string) {
    setState((value) => {
      const items = value.items.filter((item) => item.key !== key);
      const activeKey = value.items[value.index]?.key;
      const index = activeKey === key ? value.index % (items.length || 1) : Math.max(0, items.findIndex((item) => item.key === activeKey));
      return { ...value, items, index };
    });
  }

  function closeAll(scope: "session" | "day") {
    state.items.forEach((item) => hidePopup(item, scope));
    setState((value) => ({ ...value, open: false }));
  }

  function isOutsidePopup(x: number, y: number) {
    const bounds = dialogRef.current?.getBoundingClientRect();
    return Boolean(bounds && (x < bounds.left || x > bounds.right || y < bounds.top || y > bounds.bottom));
  }

  if (!open) return null;

  const external = /^https?:/.test(current.href);
  // The image remains a native link with the existing navigation/security rules.
  const linkProps = { href: current.href, target: external ? "_blank" : undefined, rel: external ? "noopener noreferrer" : undefined, prefetch: false };
  const imageLinkLabel = `${current.alt} — 연결 페이지로 이동${external ? " (새 탭에서 열림)" : ""}`;
  const popupStyle = {
    "--popup-image-ratio": current.width / current.height,
    width: "clamp(min(320px, var(--popup-preferred-width)), calc((var(--popup-max-height) - var(--popup-controls-height) - 8px - var(--popup-footer-height)) * var(--popup-image-ratio)), var(--popup-preferred-width))",
    maxHeight: "var(--popup-max-height)",
  } as CSSProperties;

  return (
    <dialog
      ref={dialogRef}
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-x-0 top-[var(--popup-safe-top)] bottom-[var(--popup-safe-bottom)] m-auto h-fit max-w-[calc(100vw-2rem)] flex-col overflow-y-auto border-0 bg-transparent p-0 text-white outline-none open:flex [scrollbar-width:thin] [--popup-safe-top:max(1rem,env(safe-area-inset-top))] [--popup-safe-bottom:max(1rem,env(safe-area-inset-bottom))] [--popup-max-height:calc(100dvh-var(--popup-safe-top)-var(--popup-safe-bottom))] [--popup-controls-height:44px] [--popup-footer-height:0px] [--popup-preferred-width:calc(100vw-2rem)] backdrop:bg-black/60 md:[--popup-preferred-width:min(50vw,720px)]"
      style={popupStyle}
      onPointerDownCapture={(event) => {
        backdropPress.current = event.isPrimary && event.button === 0
          ? { id: event.pointerId, x: event.clientX, y: event.clientY, outside: isOutsidePopup(event.clientX, event.clientY), moved: false }
          : null;
      }}
      onPointerMoveCapture={(event) => {
        const press = backdropPress.current;
        if (press?.id === event.pointerId && (Math.abs(event.clientX - press.x) > 10 || Math.abs(event.clientY - press.y) > 10)) press.moved = true;
      }}
      onPointerCancelCapture={() => { backdropPress.current = null; }}
      onClick={(event) => {
        const press = backdropPress.current;
        backdropPress.current = null;
        if (event.target === event.currentTarget && press?.outside && !press.moved && isOutsidePopup(event.clientX, event.clientY)) {
          event.preventDefault();
          event.stopPropagation();
          closeAll("session");
        }
      }}
      onCancel={(event) => { event.preventDefault(); closeAll("session"); }}
      onKeyDown={(event) => {
        if (multiple && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
        if (event.key !== "Tab") return;
        const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]')].filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }}
    >
      <h2 id={titleId} className="sr-only">포베베 안내 팝업</h2>
      <div ref={controlsRef} className="mb-2 flex shrink-0 items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2">
          <button type="button" className={hideClass} onClick={() => { hidePopup(current, "day"); removeItem(current.key); }}>오늘 보지 않기</button>
          {multiple ? <button type="button" className={`${hideClass} text-xs! text-white/90!`} onClick={() => closeAll("day")}>전체 오늘 보지 않기</button> : null}
        </div>
        <button
          ref={closeRef}
          type="button"
          aria-label="팝업 전체 닫기"
          title="현재 표시 대상 모두를 이 탭의 세션 동안 숨깁니다"
          className="flex h-11 w-11 shrink-0 items-center justify-center border-0 bg-transparent text-white outline-none hover:text-white/80 focus-visible:outline-solid focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
          onClick={() => closeAll("session")}
        >
          <X className="h-[22px] w-[22px]" aria-hidden="true" />
        </button>
      </div>
      <div
        ref={contentRef}
        role="region"
        aria-label="팝업 내용"
        tabIndex={0}
        className="min-h-[var(--popup-footer-height)] max-h-[max(44px,calc(var(--popup-max-height)-var(--popup-controls-height)-8px))] overflow-y-auto overscroll-contain rounded-xl bg-white text-text-main shadow-[0_8px_24px_rgba(0,0,0,0.14)] outline-none [scrollbar-width:thin] focus-visible:outline-solid focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-primary"
        onScroll={imageGesture.onScroll}
      >
        <Link
          {...linkProps}
          aria-label={imageLinkLabel}
          className="block outline-none [touch-action:pan-y_pinch-zoom] focus-visible:outline-solid focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-primary"
          draggable={false}
          onPointerDown={imageGesture.onPointerDown}
          onPointerMove={imageGesture.onPointerMove}
          onPointerUp={imageGesture.onPointerUp}
          onPointerCancel={imageGesture.onPointerCancel}
          onClickCapture={imageGesture.onClickCapture}
          onAuxClickCapture={imageGesture.onAuxClickCapture}
        >
          <Image key={current.key} src={current.src} alt={current.alt} width={current.width} height={current.height}
            sizes="(min-width: 1440px) 720px, (min-width: 768px) 50vw, calc(100vw - 32px)"
            className="block h-auto w-full" draggable={false}
            onError={() => removeItem(current.key)}
          />
        </Link>
        {multiple ? <div ref={footerRef} className="flex min-h-11 items-center justify-center bg-white px-2">
          <button type="button" className={controlClass} aria-label="이전 팝업" onClick={() => move(-1)}><ChevronLeft className="h-[18px] w-[18px]" aria-hidden="true" /></button>
          <span className="min-w-9 text-center text-xs font-medium text-neutral-600" aria-hidden="true">{state.index + 1} / {state.items.length}</span>
          <button type="button" className={controlClass} aria-label="다음 팝업" onClick={() => move(1)}><ChevronRight className="h-[18px] w-[18px]" aria-hidden="true" /></button>
        </div> : null}
      </div>
      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">현재 팝업 {state.index + 1} / {state.items.length}. {current.alt}</p>
    </dialog>
  );
}
