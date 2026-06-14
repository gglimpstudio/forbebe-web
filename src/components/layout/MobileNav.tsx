"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/types";

export function MobileNav({ items, logoSrc, logoAlt }: { items: NavigationItem[]; logoSrc: string; logoAlt: string }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setOpen(false);
          setClosing(false);
          return;
        }

        setClosing(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const openMenu = () => {
    setClosing(false);
    setOpen(true);
  };

  const closeMenu = () => {
    if (!open || closing) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(false);
      setClosing(false);
      return;
    }

    setClosing(true);
  };

  const completeClose = () => {
    if (!closing) {
      return;
    }

    setOpen(false);
    setClosing(false);
  };

  const menu = open ? (
    <div
      id="mobile-navigation"
      className={cn("fixed inset-0 z-[80] bg-brand-primary/30 backdrop-blur-sm lg:hidden", closing ? "mobile-nav-overlay-exit" : "mobile-nav-overlay-enter")}
      onClick={closeMenu}
    >
      <div
        className={cn("ml-auto flex h-dvh w-[88%] max-w-sm flex-col bg-background-light p-4 shadow-2xl sm:w-[82%] sm:p-5", closing ? "mobile-nav-panel-exit" : "mobile-nav-panel-enter")}
        role="dialog"
        aria-modal="true"
        aria-label="모바일 메뉴"
        onClick={(event) => event.stopPropagation()}
        onAnimationEnd={(event) => {
          if (event.currentTarget === event.target) {
            completeClose();
          }
        }}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            <Image src={logoSrc} alt={logoAlt} width={243} height={50} className="h-8 w-auto object-contain sm:h-10" />
          </Link>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-background-main text-brand-primary" onClick={closeMenu} aria-label="메뉴 닫기">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-6 flex flex-col gap-1 overflow-y-auto pb-4 sm:mt-8">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-2xl px-3 py-2.5 text-sm font-semibold text-brand-primary hover:bg-background-soft sm:px-4 sm:py-3 sm:text-base" onClick={closeMenu}>
              {item.title}
            </Link>
          ))}
        </nav>
        <Button href="/branches" className="mt-auto w-full" size="lg" onClick={closeMenu}>
          가까운 지점 확인
        </Button>
      </div>
    </div>
  ) : null;

  return (
    <div className="lg:hidden">
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-background-light text-brand-primary"
        onClick={openMenu}
        aria-label="메뉴 열기"
        aria-expanded={open && !closing}
        aria-controls="mobile-navigation"
      >
        <Menu className="h-5 w-5" />
      </button>
      {open ? createPortal(menu, document.body) : null}
    </div>
  );
}
