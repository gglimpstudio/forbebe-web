"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import type { NavigationItem } from "@/types";

export function MobileNav({ items }: { items: NavigationItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-background-light text-brand-primary"
        onClick={() => setOpen(true)}
        aria-label="메뉴 열기"
      >
        <Menu className="h-5 w-5" />
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 bg-brand-primary/30 backdrop-blur-sm">
          <div className="ml-auto flex h-full w-[88%] max-w-sm flex-col bg-background-light p-4 shadow-2xl sm:w-[82%] sm:p-5">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-medium text-brand-primary" onClick={() => setOpen(false)}>
                포베베
              </Link>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-background-main text-brand-primary" onClick={() => setOpen(false)} aria-label="메뉴 닫기">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-6 flex flex-col gap-1 sm:mt-8">
              {items.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl px-3 py-2.5 text-sm font-semibold text-brand-primary hover:bg-background-soft sm:px-4 sm:py-3 sm:text-base" onClick={() => setOpen(false)}>
                  {item.title}
                </Link>
              ))}
            </nav>
            <Button href="/branches" className="mt-6 w-full" size="lg" onClick={() => setOpen(false)}>
              가까운 지점 확인
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
