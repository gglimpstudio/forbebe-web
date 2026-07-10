import type { Metadata } from "next";
import { MapPinned } from "lucide-react";

import { FinalCtaSection } from "@/components/sections/FinalCTASection";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getContentIcon } from "@/lib/contentIcons";
import { getWhyForbebePage } from "@/lib/sanity/queries";
import { createSeoMetadata } from "@/lib/seo";
import type { ContentCard } from "@/types";

export const metadata: Metadata = createSeoMetadata({
  title: "왜 포베베인가",
  description: "포베베가 카시트와 유모차 전문 세탁 브랜드로 신뢰받는 이유와 케어 기준을 안내합니다.",
  path: "/why-forbebe",
  keywords: ["왜 포베베인가", "전문 세탁", "유아용품 케어 기준"],
});

const strengths: ContentCard[] = [
  { title: "전문 품목 집중", description: "카시트와 유모차처럼 구조가 복잡한 유아 이동용품에 집중합니다.", icon: "ShieldCheck" },
  { title: "제품별 사전 점검", description: "분해 가능 범위, 소재 약화, 오염도를 먼저 확인하고 진행합니다.", icon: "ScanSearch" },
  { title: "오염 부위 집중 관리", description: "아이 피부에 닿는 패브릭, 벨트, 쿠션과 틈새를 중점적으로 확인합니다.", icon: "Sparkles" },
  { title: "건조와 검수", description: "세탁 후 건조 상태와 조립 상태를 확인해 고객 인도 전 한 번 더 점검합니다.", icon: "ClipboardCheck" },
];

export default async function WhyForbebePage() {
  const page = await getWhyForbebePage();
  const hero = page?.hero;
  const cards = page?.strengths?.length ? page.strengths : strengths;
  const branchCta = page?.branchCta;

  return (
    <>
      <section className="bg-background-main py-12 sm:py-16 lg:py-20">
        <Container>
          <SectionHeader
            eyebrow={hero?.eyebrow || "Why Forbebe"}
            title={hero?.title || "아이에게 닿는 제품이라, 세탁 기준도 달라야 합니다."}
            description={hero?.description || "포베베는 단순 세탁보다 제품 상태 확인, 오염 원인 분리, 건조 후 검수까지 이어지는 관리 흐름을 중요하게 봅니다."}
            headingLevel="h1"
          />
        </Container>
      </section>
      <section className="bg-background-light py-10 sm:py-14 lg:py-16">
        <Container>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ title, description, icon }) => {
              const Icon = getContentIcon(icon);

              return (
                <Card key={title}>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-background-soft text-brand-primary sm:mb-4 sm:h-12 sm:w-12 sm:rounded-2xl">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h2 className="cms-lines text-xl font-medium text-brand-primary">{title}</h2>
                  <p className="cms-lines mt-3 text-sm leading-7 text-text-sub">{description}</p>
                </Card>
              );
            })}
          </div>
          <div className="mt-8 rounded-[18px] bg-background-main p-4 sm:mt-10 sm:rounded-[24px] sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-background-light text-brand-primary sm:mb-4 sm:h-12 sm:w-12 sm:rounded-2xl">
                  <MapPinned className="h-6 w-6" aria-hidden />
                </div>
                <h2 className="cms-lines text-xl font-medium text-brand-primary sm:text-2xl">{branchCta?.title || "가까운 지점에서 제품 상태를 상담하세요."}</h2>
                <p className="cms-lines mt-3 text-sm leading-7 text-text-sub">
                  {branchCta?.description || "실제 세탁 범위와 비용은 제품 모델, 오염도, 소재 상태에 따라 달라질 수 있습니다. 가까운 지점에서 사진과 함께 상담하면 더 정확합니다."}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button href={branchCta?.primaryCtaHref || "/process"} size="lg">
                  {branchCta?.primaryCtaLabel || "세탁과정 보기"}
                </Button>
                <Button href={branchCta?.secondaryCtaHref || "/branches"} variant="outline" size="lg">
                  {branchCta?.secondaryCtaLabel || "지점소개 보기"}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {page?.finalCta?.isVisible === false ? null : <FinalCtaSection finalCta={page?.finalCta} />}
    </>
  );
}
