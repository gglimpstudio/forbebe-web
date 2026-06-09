"use client";

import { CalendarCheck, ChevronRight, MessageCircle, Phone, X } from "lucide-react";
import type { ComponentType } from "react";
import { useMemo, useState } from "react";

import { cn, isExternalHref } from "@/lib/utils";
import type { Branch, FloatingCtaAction, FloatingCtaSettings, SiteSettings } from "@/types";

type CtaAction = "phone" | "booking" | "kakao";

type BranchActionLink = {
  branch: Branch;
  href: string;
  value: string;
};

const actionMeta: Record<
  CtaAction,
  {
    label: string;
    title: string;
    icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
    buttonClassName: string;
  }
> = {
  phone: {
    label: "전화",
    title: "전화할 지점 선택",
    icon: Phone,
    buttonClassName: "border border-brand-primary/30 bg-background-light text-brand-primary shadow-[0_8px_18px_rgba(18,58,50,0.08)] hover:bg-background-soft",
  },
  booking: {
    label: "네이버예약",
    title: "예약할 지점 선택",
    icon: CalendarCheck,
    buttonClassName: "border border-brand-primary/30 bg-background-light text-brand-primary shadow-[0_8px_18px_rgba(18,58,50,0.08)] hover:bg-background-soft",
  },
  kakao: {
    label: "카카오톡",
    title: "상담할 지점 선택",
    icon: MessageCircle,
    buttonClassName: "border border-brand-primary/30 bg-background-light text-brand-primary shadow-[0_8px_18px_rgba(18,58,50,0.08)] hover:bg-background-soft",
  },
};

function isCtaAction(value: FloatingCtaAction["actionType"]): value is CtaAction {
  return value === "phone" || value === "booking" || value === "kakao";
}

function getVisibleActions(floatingCta?: FloatingCtaSettings) {
  const configuredActions = floatingCta?.actions
    ?.filter((action) => action.isVisible !== false && isCtaAction(action.actionType))
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const sourceActions: FloatingCtaAction[] =
    configuredActions && configuredActions.length > 0
      ? configuredActions
      : (Object.keys(actionMeta) as CtaAction[]).map((actionType, index) => ({ actionType, order: index + 1 }));

  return sourceActions.map((action) => {
    const actionType = isCtaAction(action.actionType) ? action.actionType : "phone";
    const defaults = actionMeta[actionType];

    return {
      actionType,
      label: defaults.label,
      title: defaults.title,
      icon: defaults.icon,
      iconImageUrl: action.iconImage?.asset?.url,
      buttonClassName: defaults.buttonClassName,
    };
  });
}

function getActionHref(branch: Branch, action: CtaAction, settings: SiteSettings) {
  if (action === "phone") return branch.phone ? `tel:${branch.phone}` : settings.phone ? `tel:${settings.phone}` : "";
  if (action === "booking") return branch.naverBookingUrl || branch.bookingUrl || "";
  return branch.kakaoUrl || settings.kakaoUrl || "";
}

function getActionValue(branch: Branch, action: CtaAction, settings: SiteSettings) {
  if (action === "phone") return branch.phone || settings.phone || "전화번호 준비 중";
  if (action === "booking") return branch.naverBookingUrl || branch.bookingUrl ? "네이버예약 바로가기" : "예약 링크 준비 중";
  return branch.kakaoUrl || settings.kakaoUrl ? "카카오톡 상담 바로가기" : "상담 링크 준비 중";
}

export function MobileBottomCta({
  settings,
  branches,
  floatingCta,
}: {
  settings: SiteSettings;
  branches: Branch[];
  floatingCta?: FloatingCtaSettings;
}) {
  const [activeAction, setActiveAction] = useState<CtaAction | null>(null);
  const visibleActions = useMemo(() => getVisibleActions(floatingCta), [floatingCta]);
  const activeMeta = activeAction ? visibleActions.find((action) => action.actionType === activeAction) : null;
  const emptyMessage = floatingCta?.emptyMessage || "표시할 지점 정보가 없습니다. Sanity 지점 문서에 연락처와 링크를 입력해주세요.";

  const actionLinks = useMemo<BranchActionLink[]>(() => {
    if (!activeAction) return [];

    return branches
      .map((branch) => ({
        branch,
        href: getActionHref(branch, activeAction, settings),
        value: getActionValue(branch, activeAction, settings),
      }))
      .filter((item) => item.href);
  }, [activeAction, branches, settings]);

  if (floatingCta?.isVisible === false || visibleActions.length === 0) return null;

  return (
    <>
      {activeAction ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-green-dark/18 backdrop-blur-[2px] md:hidden"
          aria-label="지점 선택 닫기"
          onClick={() => setActiveAction(null)}
        />
      ) : null}

      <div
        className={cn(
          "fixed inset-x-0 bottom-[calc(74px+env(safe-area-inset-bottom))] z-50 mx-3 overflow-hidden rounded-[22px] border border-border-soft/80 bg-background-main/90 p-3 shadow-[0_-18px_58px_rgba(18,58,50,0.2)] backdrop-blur transition md:hidden",
          activeAction ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0",
        )}
      >
        {activeMeta ? (
          <>
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border-soft" aria-hidden />
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-primary/70">BRANCH</p>
                <p className="mt-1 text-base font-semibold leading-6 text-green-dark">{activeMeta.title}</p>
              </div>
              <button
                type="button"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background-main text-brand-primary transition hover:bg-background-soft"
                aria-label="지점 선택 닫기"
                onClick={() => setActiveAction(null)}
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <div className="grid max-h-[52vh] gap-2 overflow-y-auto pb-1">
              {actionLinks.length > 0 ? (
                actionLinks.map(({ branch, href, value }) => (
                  <a
                    key={`${activeAction}-${branch.name}`}
                    href={href}
                    target={isExternalHref(href) && !href.startsWith("tel:") ? "_blank" : undefined}
                    rel={isExternalHref(href) && !href.startsWith("tel:") ? "noopener noreferrer" : undefined}
                    className="group flex min-h-[74px] items-center justify-between gap-3 rounded-[16px] border border-border-soft bg-background-main px-3.5 py-3 text-left transition hover:border-brand-primary hover:bg-background-soft"
                    onClick={() => setActiveAction(null)}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-green-dark">{branch.name}</span>
                      {branch.serviceArea ? <span className="mt-1 block truncate text-xs font-medium text-text-sub">{branch.serviceArea}</span> : null}
                      <span className="mt-1.5 block truncate text-xs font-medium text-brand-primary">{value}</span>
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background-light text-brand-primary transition group-hover:bg-brand-primary group-hover:text-text-inverse">
                      <ChevronRight className="h-4 w-4" aria-hidden />
                    </span>
                  </a>
                ))
              ) : (
                <p className="rounded-[16px] bg-background-main p-4 text-sm leading-6 text-text-sub">
                  {emptyMessage}
                </p>
              )}
            </div>
          </>
        ) : null}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden">
        <div className="rounded-[22px] border border-border-soft/80 bg-background-main/90 p-1.5 shadow-[0_-10px_38px_rgba(18,58,50,0.18)] backdrop-blur">
          <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${visibleActions.length}, minmax(0, 1fr))` }}>
          {visibleActions.map((meta) => {
            const Icon = meta.icon;
            const isActive = activeAction === meta.actionType;

            return (
              <button
                key={meta.actionType}
                type="button"
                className={cn(
                  "flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-[18px] px-2 text-[11px] font-semibold leading-tight transition sm:min-h-14",
                  meta.buttonClassName,
                  isActive ? "ring-2 ring-brand-primary ring-offset-2 ring-offset-background-main" : "",
                )}
                aria-expanded={isActive}
                onClick={() => setActiveAction(isActive ? null : meta.actionType)}
              >
                {meta.iconImageUrl ? (
                  <span
                    className="h-[18px] w-[18px] bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${meta.iconImageUrl}')` }}
                    aria-hidden
                  />
                ) : (
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                )}
                <span className="max-w-full truncate">{meta.label}</span>
              </button>
            );
          })}
          </div>
        </div>
      </div>
    </>
  );
}
