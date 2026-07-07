"use client";

import { CalendarCheck, Map, MapPin, Phone } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { KoreaMap } from "@/components/ui/KoreaMap";
import { cn } from "@/lib/utils";
import type { Branch, BranchesPage } from "@/types";

const preferredRegionOrder = ["본사", "충남", "인천", "경기도 북부", "경기도 남부"];

const regionCardMeta: Record<string, { countLabel: string; description: string }> = {
  본사: { countLabel: "대표", description: "창업 문의와 지점 안내를 연결합니다." },
  충남: { countLabel: "3개", description: "천안·아산 중심의 세탁 상담 권역입니다." },
  인천: { countLabel: "4개", description: "영종·송도·부평·검단 권역을 안내합니다." },
  "경기도 북부": { countLabel: "3개", description: "김포·일산·덕양 인근 지점을 확인하세요." },
  "경기도 남부": { countLabel: "1개", description: "수지·광교 인근 상담이 가능합니다." },
};

export function BranchLocationExperience({ branches, finder }: { branches: Branch[]; finder?: BranchesPage["finder"] }) {
  const [filter, setFilter] = useState("전체");

  const regionOrder = useMemo(() => getRegionOrder(branches), [branches]);

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
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-primary">{finder?.eyebrow || "BRANCH FINDER"}</p>
          <h2 id="branch-finder-title" className="cms-lines fluid-panel-title mt-3 font-semibold leading-tight text-green-dark">
            {finder?.title || "지역별 지점을 빠르게 찾아보세요"}
          </h2>
          <p className="mt-4 text-base leading-7 text-text-sub">
            {finder?.description || "원하는 지역을 선택하면 해당 권역의 지점 연락처와 문의 버튼이 바로 표시됩니다."}
          </p>
        </div>

        <RegionSelectionPanel value={filter} branches={branches} regionOrder={regionOrder} onChange={updateFilter} />

        <div id="branch-finder-results" className="mt-8" aria-live="polite">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-brand-primary">필터 결과</p>
              <h3 className="mt-2 text-2xl font-semibold leading-tight text-green-dark">{filter}</h3>
            </div>
            <p className="text-sm text-text-sub">총 {visibleBranches.length}개 지점</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {visibleBranches.map((branch) => (
              <BranchContactCard key={slugifyBranchId(branch)} branch={branch} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RegionSelectionPanel({ value, branches, regionOrder, onChange }: { value: string; branches: Branch[]; regionOrder: string[]; onChange: (filter: string) => void }) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const previewRegion = hoveredRegion || value;
  const mapPreviewRegion = previewRegion === "본사" ? "충남" : previewRegion;
  const showRegionBubble = true;
  const previewBranches = previewRegion === "전체" ? branches : branches.filter((branch) => branch.region === previewRegion);
  const previewMeta = previewRegion === "전체" ? { countLabel: `${branches.length}개`, description: "전체 서비스 지점을 한 번에 확인합니다." } : regionCardMeta[previewRegion] || { countLabel: `${previewBranches.length}개`, description: "가까운 지점 정보를 확인하세요." };

  return (
    <div className="mt-8 rounded-[22px] border border-[#E2D4B8] bg-[#fffdf7] p-4 shadow-[0_18px_44px_rgba(72,54,28,0.08)] sm:mt-10 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-brand-primary">AREA SELECT</p>
          <h3 className="mt-2 text-xl font-semibold text-green-dark">지역 선택</h3>
          <p className="mt-2 text-sm leading-6 text-text-sub">지역 카드를 선택하면 해당 지점 연락처가 아래에 표시됩니다.</p>
        </div>
        <button
          type="button"
          aria-pressed={value === "전체"}
          aria-controls="branch-finder-results"
          onClick={() => onChange("전체")}
          onMouseEnter={() => setHoveredRegion("전체")}
          onMouseLeave={() => setHoveredRegion(null)}
          onFocus={() => setHoveredRegion("전체")}
          onBlur={() => setHoveredRegion(null)}
          className={cn(
            "shrink-0 rounded-full border px-3 py-1 text-xs font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(72,54,28,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
            value === "전체" || hoveredRegion === "전체" ? "border-brand-primary bg-brand-primary text-text-inverse" : "border-[#D8C7A5] bg-[#F3E8D0] text-[#6B4C21] hover:border-brand-primary/50",
          )}
        >
          전체 {branches.length}개
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(280px,0.46fr)_minmax(0,0.54fr)] lg:items-center">
        <div className="order-2 rounded-[20px] border border-[#E2D4B8] bg-[#FBF4E6] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] lg:order-1">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-green-dark">
            <Map className="h-4 w-4 text-brand-primary" aria-hidden />
            서비스 가능 지역
          </div>
          <div className="relative mx-auto flex min-h-[260px] max-w-[220px] justify-center sm:max-w-[260px] lg:min-h-[390px] lg:max-w-[340px]">
            <KoreaMap activeRegion={mapPreviewRegion} />
            {showRegionBubble ? (
              <div
                className={cn(
                  "absolute left-1/2 top-2 z-10 w-[min(220px,92%)] -translate-x-1/2 rounded-[16px] border border-[#D8C7A5] bg-[#fffdf7] px-4 py-3 text-left shadow-[0_16px_32px_rgba(72,54,28,0.14)] transition duration-200 sm:left-auto sm:right-0 sm:top-7 sm:w-[210px] sm:translate-x-6 lg:translate-x-10",
                  hoveredRegion ? "scale-100 opacity-100" : "scale-95 opacity-92",
                )}
                aria-live="polite"
              >
                <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-[#D8C7A5] bg-[#fffdf7] sm:bottom-auto sm:left-auto sm:right-full sm:top-6 sm:translate-x-2 sm:border-b-0 sm:border-l sm:border-r-0 sm:border-t" aria-hidden />
                <span className="block text-[11px] font-semibold tracking-[0.18em] text-brand-primary">{hoveredRegion ? "HOVER AREA" : "SELECTED AREA"}</span>
                <span className="mt-1 flex items-baseline justify-between gap-3">
                  <strong className="text-base font-semibold text-green-dark">{previewRegion}</strong>
                  <span className="rounded-full bg-[#F3E8D0] px-2.5 py-1 text-xs font-semibold text-[#6B4C21]">{previewMeta.countLabel}</span>
                </span>
                <span className="mt-2 block text-xs leading-5 text-text-sub">{previewMeta.description}</span>
                {previewBranches.length > 0 ? <span className="mt-2 block truncate text-xs font-semibold text-brand-primary/85">{previewBranches.map((branch) => branch.name).join(", ")}</span> : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className="order-1 grid gap-3 sm:grid-cols-2 lg:order-2" aria-label="지점 지역 카드">
          {regionOrder.map((region) => (
            <RegionCard
              key={region}
              region={region}
              branches={branches}
              active={value === region}
              preview={hoveredRegion === region}
              onSelect={() => onChange(region)}
              onPreview={setHoveredRegion}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function RegionCard({
  region,
  branches,
  active,
  preview,
  onSelect,
  onPreview,
}: {
  region: string;
  branches: Branch[];
  active: boolean;
  preview: boolean;
  onSelect: () => void;
  onPreview: (region: string | null) => void;
}) {
  const regionBranches = branches.filter((branch) => branch.region === region);
  const meta = regionCardMeta[region] || { countLabel: `${regionBranches.length}개`, description: "가까운 지점 정보를 확인하세요." };
  const highlighted = active || preview;

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-controls="branch-finder-results"
      onClick={onSelect}
      onMouseEnter={() => onPreview(region)}
      onMouseLeave={() => onPreview(null)}
      onFocus={() => onPreview(region)}
      onBlur={() => onPreview(null)}
      className={cn(
        "group min-h-[132px] rounded-[18px] border p-4 text-left shadow-[0_12px_30px_rgba(72,54,28,0.06)] transition duration-200 hover:-translate-y-1 hover:scale-[1.025] hover:shadow-[0_18px_36px_rgba(72,54,28,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
        highlighted ? "scale-[1.015] border-brand-primary bg-[#F4ECD8] ring-2 ring-brand-primary/12" : "border-[#E2D4B8] bg-[#fffdf7] hover:border-brand-primary/45 hover:bg-[#FBF4E6]",
      )}
    >
      <span className="flex items-start justify-between gap-3">
        <span className="text-lg font-semibold leading-tight text-green-dark">{region}</span>
        <span className={cn("rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors", highlighted ? "border-brand-primary bg-brand-primary text-text-inverse" : "border-[#D8C7A5] bg-[#F3E8D0] text-[#6B4C21]")}>
          {meta.countLabel}
        </span>
      </span>
      <span className="mt-3 block text-sm leading-6 text-text-sub">{meta.description}</span>
      <span className="mt-3 block text-xs font-semibold text-brand-primary/80">{regionBranches.map((branch) => branch.name).join(", ")}</span>
    </button>
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
