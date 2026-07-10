import type { Metadata } from "next";
import { MapPin, Phone, Search } from "lucide-react";

import { BranchLocationExperience } from "@/components/sections/BranchLocationExperience";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getBranches, getBranchesPage } from "@/lib/sanity/queries";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "지점 안내",
  description: "전국 주요 지역의 가까운 포베베 지점 연락처와 전화 문의 정보를 확인하세요.",
  path: "/branches",
  keywords: ["지점 안내", "가까운 지점", "카시트 세탁 지점", "유모차 세탁 지점"],
});

export default async function BranchesPage() {
  const [branches, page] = await Promise.all([getBranches(), getBranchesPage()]);
  const primaryBranchPhone = branches.find((branch) => branch.region === "본사")?.phone || branches[0]?.phone;
  const hero = page?.hero;
  const summary = page?.summary;
  const finalCta = page?.finalCta;

  return (
    <>
      <section className="relative overflow-hidden bg-background-main py-12 sm:py-16 lg:py-22">
        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-primary">{hero?.eyebrow || "FORBEBE BRANCH"}</p>
              <h1 className="cms-lines fluid-page-title mt-4 max-w-3xl font-medium leading-tight text-green-dark">
                {hero?.title || "가까운 포베베 지점을 확인하세요"}
              </h1>
              <p className="cms-lines fluid-body mt-5 max-w-2xl leading-8 text-hero-body">
                {hero?.description || "카시트와 유모차 세탁이 필요한 지역을 선택하면 가까운 포베베 지점의 연락처와 예약 정보를 바로 확인할 수 있습니다."}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#branch-finder" size="lg" className="gap-2">
                  <Search className="h-4 w-4" aria-hidden />
                  지점 찾기
                </Button>
                <Button href={primaryBranchPhone ? `tel:${primaryBranchPhone}` : "#branch-finder"} variant="outline" size="lg" className="gap-2">
                  <Phone className="h-4 w-4" aria-hidden />
                  대표 문의하기
                </Button>
              </div>
            </div>
            <div className="rounded-[24px] border border-border-soft bg-[#fffdf7] p-5 shadow-[0_20px_52px_rgba(18,58,50,0.08)] sm:p-6">
              <div className="flex items-center justify-between gap-4 border-b border-border-soft pb-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.22em] text-brand-primary">{summary?.label || "BRANCH SUMMARY"}</p>
                  <h2 className="cms-lines mt-2 text-2xl font-semibold text-green-dark">{summary?.title || "지역별 지점 안내"}</h2>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background-soft text-brand-primary">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
              </div>
              <div className="mt-5 grid gap-3">
                <SummaryMetric value={`${branches.length}개`} label="지점" />
                <div className="rounded-2xl border border-border-soft bg-background-light px-4 py-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-green-dark">
                    <Phone className="h-4 w-4 text-brand-primary" aria-hidden />
                    전화·네이버 예약 가능
                  </div>
                  <p className="cms-lines mt-2 text-sm leading-6 text-text-sub">{summary?.description || "지역을 선택하면 지점별 전화와 예약 버튼이 표시됩니다."}</p>
                </div>
              </div>
              <Button href="#branch-finder" className="mt-5 w-full gap-2">
                <Search className="h-4 w-4" aria-hidden />
                지점 찾기
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <BranchLocationExperience branches={branches} finder={page?.finder} />

      {finalCta?.isVisible === false ? null : <section className="bg-[radial-gradient(circle_at_center,#1E584A_0%,#123F35_48%,#0B3029_100%)] py-16 text-text-inverse sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-secondary">CONTACT</p>
            <h2 className="cms-lines fluid-panel-title mt-4 font-medium leading-tight">
              {finalCta?.title || "가까운 지점에서 세탁 상담을 받아보세요"}
            </h2>
            <p className="cms-lines fluid-body mx-auto mt-4 max-w-2xl leading-7 text-brand-secondary">
              {finalCta?.description || "카시트와 유모차의 상태, 오염 정도, 소재에 맞춰 가까운 포베베 지점에서 상담을 도와드립니다."}
            </p>
            <div className="mt-8 flex justify-center">
              <Button href={finalCta?.primaryCtaHref || (primaryBranchPhone ? `tel:${primaryBranchPhone}` : "#branch-finder")} variant="secondary" size="lg" className="gap-2 !bg-[#DFD9B3] !text-[#123F35] hover:!bg-[#F3EFE2]">
                <Phone className="h-4 w-4" aria-hidden />
                {finalCta?.primaryCtaLabel || "대표번호로 문의하기"}
              </Button>
            </div>
          </div>
        </Container>
      </section>}
    </>
  );
}

function SummaryMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border-soft bg-background-light px-4 py-4">
      <p className="text-2xl font-semibold text-green-dark">{value}</p>
      <p className="mt-1 text-sm text-text-sub">{label}</p>
    </div>
  );
}
