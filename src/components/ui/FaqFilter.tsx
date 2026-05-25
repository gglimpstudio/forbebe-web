"use client";

import { useMemo, useState } from "react";

import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import type { FaqItem } from "@/types";

export function FaqFilter({ faqs }: { faqs: FaqItem[] }) {
  const [category, setCategory] = useState("전체");
  const categories = ["전체", ...Array.from(new Set(faqs.map((faq) => faq.category).filter(Boolean)))];
  const filtered = useMemo(() => faqs.filter((faq) => category === "전체" || faq.category === category), [category, faqs]);

  return (
    <div>
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {categories.map((item) => (
          <Button key={item} variant={category === item ? "primary" : "outline"} size="sm" onClick={() => setCategory(item || "전체")} className="shrink-0">
            {item}
          </Button>
        ))}
      </div>
      <Accordion items={filtered} />
    </div>
  );
}
