"use client";

import { CalendarCheck, MapPin, Phone } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Branch } from "@/types";

const preferredRegionOrder = ["본사", "충남", "인천", "경기도 북부", "경기도 남부"];

const regionAccents: Record<string, { bg: string; text: string; border: string }> = {
  본사: { bg: "bg-[#F3E8D0]", text: "text-[#6B4C21]", border: "border-[#D8BE8A]" },
  충남: { bg: "bg-[#F3E8D0]", text: "text-[#6B4C21]", border: "border-[#D8BE8A]" },
  인천: { bg: "bg-[#DDEBDD]", text: "text-brand-primary", border: "border-[#B8D0BA]" },
  "경기도 북부": { bg: "bg-[#F2DFBF]", text: "text-[#6B4C21]", border: "border-[#D8BE8A]" },
  "경기도 남부": { bg: "bg-[#E7EADC]", text: "text-brand-primary", border: "border-[#C8D3B9]" },
};

const defaultRegionAccent = { bg: "bg-[#E7EADC]", text: "text-brand-primary", border: "border-[#C8D3B9]" };

export function BranchLocationExperience({ branches }: { branches: Branch[] }) {
  const [filter, setFilter] = useState("전체");

  const regionOrder = useMemo(() => getRegionOrder(branches), [branches]);
  const filterOptions = useMemo(() => ["전체", ...regionOrder], [regionOrder]);

  const visibleBranches = useMemo(
    () => branches.filter((branch) => filter === "전체" || branch.region === filter),
    [branches, filter],
  );

  function updateFilter(nextFilter: string) {
    setFilter(nextFilter);
  }

  return (
    <section id="branch-finder" className="bg-[#fffaf0] py-12 sm:py-16 lg:py-20" aria-labelledby="branch-finder-title">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-primary">BRANCH FINDER</p>
          <h2 id="branch-finder-title" className="cms-lines fluid-panel-title mt-3 font-semibold leading-tight text-green-dark">
            지역별 지점을 빠르게 찾아보세요
          </h2>
          <p className="mt-4 text-base leading-7 text-text-sub">
            원하는 지역을 선택하면 해당 권역의 지점 연락처와 문의 버튼이 바로 표시됩니다.
          </p>
        </div>

        <RegionFilter value={filter} options={filterOptions} onChange={updateFilter} />

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <QuickRegionPanel value={filter} branches={branches} regionOrder={regionOrder} onChange={updateFilter} />
          </div>

          <div id="branch-finder-results" aria-live="polite">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-brand-primary">필터 결과</p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight text-green-dark">{filter}</h3>
              </div>
              <p className="text-sm text-text-sub">총 {visibleBranches.length}개 지점</p>
            </div>
            <div className="grid gap-4">
              {visibleBranches.map((branch) => (
                <BranchContactCard key={slugifyBranchId(branch)} branch={branch} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RegionFilter({ value, options, onChange }: { value: string; options: string[]; onChange: (filter: string) => void }) {
  return (
    <div className="mt-8 overflow-x-auto pb-2 sm:mt-10" role="tablist" aria-label="지점 지역 필터">
      <div className="flex min-w-max gap-2 sm:justify-center">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={value === option}
            aria-controls="branch-finder-results"
            onClick={() => onChange(option)}
            className={cn(
              "min-h-11 shrink-0 rounded-full border px-5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
              value === option
                ? "border-brand-primary bg-brand-primary text-text-inverse shadow-[0_12px_26px_rgba(30,88,74,0.18)]"
                : "border-border-soft bg-[#fffdf7] text-brand-primary hover:border-brand-primary/50 hover:bg-background-main",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function QuickRegionPanel({ value, branches, regionOrder, onChange }: { value: string; branches: Branch[]; regionOrder: string[]; onChange: (filter: string) => void }) {
  return (
    <aside className="rounded-[22px] border border-border-soft bg-[#fffdf7] p-4 shadow-[0_18px_44px_rgba(18,58,50,0.07)] sm:p-6" aria-labelledby="quick-region-title">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-brand-primary">AREA SELECT</p>
          <h3 id="quick-region-title" className="mt-2 text-xl font-semibold text-green-dark">
            지역 선택
          </h3>
          <p className="mt-2 text-sm leading-6 text-text-sub">이용하려는 지역을 선택하세요.</p>
        </div>
        <span className="rounded-full bg-background-soft px-3 py-1 text-xs font-semibold text-brand-primary">
          {branches.length}개 지점
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {regionOrder.map((region) => {
          const regionBranches = branches.filter((branch) => branch.region === region);
          const active = value === region;
          const accent = regionAccents[region] || defaultRegionAccent;

          return (
            <button
              key={region}
              type="button"
              aria-pressed={active}
              aria-controls="branch-finder-results"
              onClick={() => onChange(region)}
              className={cn(
                "rounded-2xl border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                active ? "border-brand-primary bg-background-main ring-2 ring-brand-primary/12" : "border-border-soft bg-[#fffdf7] hover:border-brand-primary/45",
              )}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-base font-semibold text-green-dark">{region}</span>
                <span className={cn("rounded-full border px-2.5 py-1 text-xs font-semibold", accent.bg, accent.text, accent.border)}>
                  {regionBranches.length}개
                </span>
              </span>
              <span className="mt-3 block text-sm leading-6 text-text-sub">{regionBranches.map((branch) => branch.name).join(", ")}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function BranchContactCard({ branch }: { branch: Branch }) {
  const bookingUrl = branch.naverBookingUrl || branch.bookingUrl;
  const phoneHref = branch.phone ? `tel:${branch.phone}` : undefined;

  return (
    <article
      id={`branch-card-${slugifyBranchId(branch)}`}
      aria-label={`${branch.name} 연락처 카드`}
      className="rounded-[20px] border border-border-soft bg-[#fffdf7] p-5 shadow-[0_14px_36px_rgba(18,58,50,0.06)] sm:p-6"
    >
      <div className="flex flex-wrap gap-2">
        <Badge>{branch.region}</Badge>
      </div>
      <h4 className="mt-3 text-xl font-semibold leading-tight text-green-dark">{branch.name}</h4>
      {branch.description || branch.serviceArea ? <p className="mt-2 text-sm leading-6 text-text-sub">{branch.description || branch.serviceArea}</p> : null}
      {branch.address ? (
        <p className="mt-3 flex gap-2 text-sm leading-6 text-text-sub">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
          {branch.address}
        </p>
      ) : null}
      {branch.phone ? (
        <a href={`tel:${branch.phone}`} className="mt-3 inline-flex text-lg font-semibold text-brand-primary" aria-label={`${branch.name} ${branch.phone}로 전화하기`}>
          {branch.phone}
        </a>
      ) : null}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Button href={phoneHref} className="gap-2" disabled={!phoneHref} aria-label={`${branch.name} 전화하기`}>
          <Phone className="h-4 w-4" aria-hidden />
          전화하기
        </Button>
        <Button href={bookingUrl} variant="secondary" className="gap-2" disabled={!bookingUrl} aria-label={`${branch.name} 네이버 예약하기`}>
          <CalendarCheck className="h-4 w-4" aria-hidden />
          {bookingUrl ? "네이버 예약" : "예약 준비중"}
        </Button>
      </div>
    </article>
  );
}

function getRegionOrder(branches: Branch[]) {
  const regions = Array.from(new Set(branches.map((branch) => branch.region).filter(Boolean)));

  return regions.sort((a, b) => {
    const aIndex = preferredRegionOrder.indexOf(a);
    const bIndex = preferredRegionOrder.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b, "ko");
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
}

function slugifyBranchId(branch: Branch) {
  return `${branch.region}-${branch.name}`.replace(/\s+/g, "-");
}
