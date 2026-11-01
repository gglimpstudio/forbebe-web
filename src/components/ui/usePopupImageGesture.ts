"use client";

import { useRef, type MouseEvent, type PointerEvent, type RefObject } from "react";

/** Keep native anchor behavior for taps/keyboard, but never activate after a drag. */
export function usePopupImageGesture(onSwipe: (offset: number) => void, scrollRef: RefObject<HTMLElement | null>) {
  const gesture = useRef<{ id: number; x: number; y: number; scrollTop: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  function guardClick(event: MouseEvent<HTMLAnchorElement>) {
    // Keyboard and assistive activation have detail=0 and must remain available.
    if (event.detail > 0 && suppressClick.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  return {
    onPointerDown(event: PointerEvent<HTMLAnchorElement>) {
      suppressClick.current = false;
      gesture.current = null;
      if (!event.isPrimary) {
        suppressClick.current = true;
        return;
      }
      if (event.pointerType === "mouse" && event.button !== 0) return;
      gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, scrollTop: scrollRef.current?.scrollTop || 0, moved: false };
    },
    onPointerMove(event: PointerEvent<HTMLAnchorElement>) {
      const start = gesture.current;
      if (!start || start.id !== event.pointerId) return;
      if (Math.abs(event.clientX - start.x) > 10 || Math.abs(event.clientY - start.y) > 10) {
        start.moved = true;
        suppressClick.current = true;
      }
    },
    onPointerUp(event: PointerEvent<HTMLAnchorElement>) {
      const start = gesture.current;
      gesture.current = null;
      if (!start || start.id !== event.pointerId) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      const scrolled = Math.abs((scrollRef.current?.scrollTop || 0) - start.scrollTop) > 2;
      const moved = start.moved || Math.abs(dx) > 10 || Math.abs(dy) > 10 || scrolled;
      if (moved) suppressClick.current = true;
      if (event.pointerType !== "mouse" && !scrolled && Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.3) onSwipe(dx < 0 ? 1 : -1);
    },
    onPointerCancel() {
      gesture.current = null;
      suppressClick.current = true;
    },
    onScroll() {
      suppressClick.current = true;
      if (gesture.current) gesture.current.moved = true;
    },
    onClickCapture: guardClick,
    onAuxClickCapture: guardClick,
  };
}
