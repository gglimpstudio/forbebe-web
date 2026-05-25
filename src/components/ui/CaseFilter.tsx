"use client";

import { useMemo, useState } from "react";

import { BeforeAfterCard } from "@/components/ui/BeforeAfterCard";
import { Button } from "@/components/ui/Button";
import type { CleaningCase } from "@/types";

export function CaseFilter({ cases }: { cases: CleaningCase[] }) {
  const [itemType, setItemType] = useState("전체");
  const [problemType, setProblemType] = useState("전체");
  const itemTypes = ["전체", ...Array.from(new Set(cases.map((item) => item.itemType).filter(Boolean)))];
  const problemTypes = ["전체", ...Array.from(new Set(cases.map((item) => item.problemType).filter(Boolean)))];

  const filtered = useMemo(
    () =>
      cases.filter((item) => {
        return (itemType === "전체" || item.itemType === itemType) && (problemType === "전체" || item.problemType === problemType);
      }),
    [cases, itemType, problemType],
  );

  return (
    <div>
      <div className="mb-6 space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {itemTypes.map((item) => (
            <Button key={item} variant={itemType === item ? "primary" : "outline"} size="sm" onClick={() => setItemType(item || "전체")} className="shrink-0">
              {item}
            </Button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {problemTypes.map((item) => (
            <Button key={item} variant={problemType === item ? "secondary" : "outline"} size="sm" onClick={() => setProblemType(item || "전체")} className="shrink-0">
              {item}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {filtered.map((item) => (
          <BeforeAfterCard key={item.slug || item.title} item={item} />
        ))}
      </div>
    </div>
  );
}
