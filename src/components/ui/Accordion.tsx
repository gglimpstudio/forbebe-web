"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types";

export function Accordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={`${item.question}-${index}`} className="rounded-[18px] border border-border-soft bg-background-light">
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span>{item.question}</span>
              <ChevronDown className={cn("h-5 w-5 shrink-0 transition", isOpen && "rotate-180")} aria-hidden />
            </button>
            {isOpen ? <div className="px-5 pb-5 text-sm leading-7 text-text-sub">{item.answer}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
