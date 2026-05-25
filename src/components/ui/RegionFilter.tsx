"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { BranchCard } from "@/components/ui/BranchCard";
import { Button } from "@/components/ui/Button";
import { regions } from "@/lib/constants";
import type { Branch } from "@/types";

export function RegionFilter({ branches, searchable = false }: { branches: Branch[]; searchable?: boolean }) {
  const [region, setRegion] = useState("전체");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      branches.filter((branch) => {
        const regionMatch = region === "전체" || branch.region === region;
        const text = `${branch.name} ${branch.serviceArea || ""} ${branch.address || ""}`.toLowerCase();
        return regionMatch && text.includes(query.toLowerCase());
      }),
    [branches, query, region],
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {regions.map((item) => (
            <Button key={item} variant={region === item ? "primary" : "outline"} size="sm" onClick={() => setRegion(item)} className="shrink-0">
              {item}
            </Button>
          ))}
        </div>
        {searchable ? (
          <label className="relative block max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-sub" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="지점명, 지역, 주소 검색"
              className="h-12 w-full rounded-full border border-border-soft bg-background-light pl-11 pr-4 text-sm outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-brand-secondary"
            />
          </label>
        ) : null}
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((branch) => (
          <BranchCard key={`${branch.name}-${branch.region}`} branch={branch} />
        ))}
      </div>
      {filtered.length === 0 ? <p className="rounded-[18px] bg-background-light p-6 text-sm text-text-sub">조건에 맞는 지점이 없습니다.</p> : null}
    </div>
  );
}
