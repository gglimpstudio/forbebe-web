import type { Metadata } from "next";
import { Bubbles, ClipboardCheck, PackageCheck, ShieldCheck, Truck, Wrench } from "lucide-react";

import { FinalCtaSection } from "@/components/sections/FinalCTASection";
import { Container } from "@/components/ui/Container";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { SanityImage } from "@/components/ui/SanityImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getProcessPage, getProcessSteps } from "@/lib/sanity/queries";
import { createSeoMetadata } from "@/lib/seo";
import type { ContentCard } from "@/types";

export const metadata: Metadata = createSeoMetadata({
  title: "세탁 과정",
  description: "포베베의 예약 접수, 제품 상태 확인, 세척, 살균 케어, 건조, 최종 검수 과정을 안내합니다.",
  path: "/process",
  keywords: ["세탁 과정", "살균 케어", "카시트 세척", "유모차 세척"],
});

export const revalidate = 300;

type CareItem = {
  title: string;
  description: string;
  photoGuide: string;
  icon: typeof ClipboardCheck;
  image?: ContentCard["image"];
};

const coreCareItems: CareItem[] = [
  {
    title: "수거",
    description: "집 앞 수거로 고객과 비대면으로 제품을 맡길 수 있습니다.",
    photoGuide: "집 앞에서 포장된 카시트나 유모차를 비대면으로 수거하는 장면",
    icon: Truck,
  },
  {
    title: "상태 확인",
    description: "땀, 먼지, 음식물, 틈새 이물질을 먼저 확인합니다.",
    photoGuide: "오염 부위를 가까이 확인하는 손과 카시트 디테일 컷",
    icon: ClipboardCheck,
  },
  {
    title: "분해·사전 케어",
    description: "제품 구조와 소재에 맞춰 분해 가능한 범위를 확인합니다.",
    photoGuide: "분리된 커버, 벨트, 쿠션을 작업대 위에 정리한 컷",
    icon: Wrench,
  },
  {
    title: "세척·살균",
    description: "유아전용 세제와 장비로 세척하고 UV+오존 살균을 진행합니다.",
    photoGuide: "세척 장비 또는 살균 장비 안에 들어간 부품 컷",
    icon: Bubbles,
  },
  {
    title: "최종 검수",
    description: "충분히 건조한 뒤 조립 상태와 주요 오염 부위를 다시 확인합니다.",
    photoGuide: "건조 후 깨끗하게 조립된 카시트와 검수 체크 장면",
    icon: ShieldCheck,
  },
  {
    title: "배송",
    description: "세탁 완료 후 제품을 안전하게 포장해 고객에게 배송합니다.",
    photoGuide: "세탁 완료 제품을 보호 포장한 뒤 배송 준비하는 장면",
    icon: PackageCheck,
  },
];

function getCareItems(cmsItems?: ContentCard[]): CareItem[] {
  const itemCount = Math.min(Math.max(cmsItems?.length || 0, coreCareItems.length), coreCareItems.length);

  return Array.from({ length: itemCount }, (_, index) => {
    const cmsItem = cmsItems?.[index];
    const fallback = coreCareItems[index] || coreCareItems[coreCareItems.length - 1];
    return {
      ...fallback,
      title: cmsItem?.title || fallback.title,
      description: cmsItem?.description || fallback.description,
      image: cmsItem?.image,
    };
  });
}

function MockProcessPhoto({ label, icon: Icon }: { label: string; icon: typeof ClipboardCheck }) {
  return (
    <div className="relative flex aspect-[16/10] min-h-[170px] overflow-hidden rounded-[18px] border border-border-soft bg-background-soft shadow-[0_14px_36px_rgba(18,58,50,0.055)]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,254,250,0.86),rgba(239,232,210,0.82)),radial-gradient(circle_at_72%_28%,rgba(30,88,74,0.18),transparent_34%)]" />
      <div className="absolute inset-4 rounded-[14px] border border-dashed border-brand-primary/25" aria-hidden />
      <div className="relative flex h-full w-full flex-col justify-between p-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary text-text-inverse">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <div className="max-w-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary/70">사진 자리</p>
          <p className="mt-1.5 text-sm font-medium leading-6 text-brand-primary">{label}</p>
        </div>
      </div>
    </div>
  );
}

export default async function ProcessPage() {
  const [steps, page] = await Promise.all([getProcessSteps(), getProcessPage()]);
  const hero = page?.hero;
  const careItems = getCareItems(page?.coreCareItems);
  const detailSection = page?.detailSection;

  return (
    <>
      <section className="bg-background-main py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <SectionHeader
              eyebrow={hero?.eyebrow || "Process"}
              title={hero?.title || "제품 상태를 확인하고 단계별로 케어합니다."}
              description={hero?.description || "분해 가능한 범위와 소재 상태를 먼저 확인한 뒤 세척, 살균 케어, 건조, 검수 순서로 진행합니다."}
              headingLevel="h1"
            />
            {hero?.image ? (
              <SanityImage image={hero.image} alt={hero.image.alt || hero?.title || "세탁 완료 후 깨끗하게 정돈된 카시트와 유모차"} className="min-h-[260px] sm:min-h-[340px]" priority sizes="(min-width: 1024px) 48vw, 100vw" />
            ) : (
              <MockProcessPhoto label="세탁 완료 후 깨끗하게 정돈된 카시트와 유모차 대표 사진" icon={PackageCheck} />
            )}
          </div>
        </Container>
      </section>

      <section className="bg-background-light py-12 sm:py-16 lg:py-20">
        <Container className="!max-w-5xl 2xl:!max-w-7xl">
          <SectionHeader eyebrow="Care Process" title="한눈에 보는 포베베 세탁 과정" description="수거부터 배송까지 고객이 가장 궁금해하는 흐름을 6단계로 먼저 보여주고, 아래에서 세부 진행 순서를 이어서 확인할 수 있게 구성했습니다." align="center" />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {careItems.map((item, index) => {
              const Icon = item.icon;
              const isCenteredFinalItem = careItems.length % 2 === 1 && index === careItems.length - 1;

              return (
                <article
                  key={`${item.title}-${index}`}
                  className={`overflow-hidden rounded-[22px] border border-border-soft bg-background-main shadow-[0_14px_38px_rgba(18,58,50,0.055)] ${isCenteredFinalItem ? "md:col-span-2 md:mx-auto md:w-full md:max-w-[calc(50%-0.625rem)]" : ""}`}
                >
                  {item.image ? (
                    <SanityImage image={item.image} alt={item.image.alt || item.title} className="aspect-[16/10] min-h-[170px] rounded-none shadow-none" sizes="(min-width: 768px) 45vw, 100vw" />
                  ) : (
                    <MockProcessPhoto label={item.photoGuide} icon={Icon} />
                  )}
                  <div className="p-5">
                    <h3 className="cms-lines text-lg font-semibold text-brand-primary">{item.title}</h3>
                    <p className="cms-lines mt-2 text-sm leading-6 text-text-sub">{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>

          {detailSection?.isVisible === false ? null : (
            <>
              <div className="mt-12 border-t border-border-soft pt-10">
                <SectionHeader
                  eyebrow={detailSection?.eyebrow || "Detail"}
                  title={detailSection?.title || "세부 진행 순서"}
                  description={detailSection?.description || "실제 제품 상태와 소재에 따라 세부 과정은 달라질 수 있습니다."}
                  align="center"
                />
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                {steps.map((step, index) => (
                  <div key={`${step.title}-${index}`} className="flex flex-col">
                    {step.image ? (
                      <SanityImage
                        image={step.image}
                        alt={step.image.alt || step.title}
                        className="mb-4 aspect-[4/3] overflow-hidden rounded-[18px] border border-border-soft shadow-[0_14px_36px_rgba(18,58,50,0.055)] sm:rounded-[22px]"
                      />
                    ) : null}
                    <ProcessStep step={step} index={index} />
                  </div>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>
      {page?.finalCta?.isVisible === false ? null : <FinalCtaSection finalCta={page?.finalCta} />}
    </>
  );
}
