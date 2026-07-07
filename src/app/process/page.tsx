import type { Metadata } from "next";
import { Bubbles, ClipboardCheck, PackageCheck, ShieldCheck, SprayCan, Wrench } from "lucide-react";

import { FinalCtaSection } from "@/components/sections/FinalCTASection";
import { Container } from "@/components/ui/Container";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { SanityImage } from "@/components/ui/SanityImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getProcessPage, getProcessSteps } from "@/lib/sanity/queries";
import type { ContentCard } from "@/types";

export const metadata: Metadata = {
  title: "세탁 과정",
  description: "포베베의 예약 접수, 제품 상태 확인, 세척, 살균 케어, 건조, 최종 검수 과정을 안내합니다.",
};

export const revalidate = 300;

const coreCareItems = [
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
    title: "건조·최종 검수",
    description: "충분히 건조한 뒤 조립 상태와 주요 오염 부위를 다시 확인합니다.",
    photoGuide: "건조 후 깨끗하게 조립된 카시트와 검수 체크 장면",
    icon: ShieldCheck,
  },
];

function getCareItems(cmsItems?: ContentCard[]) {
  return coreCareItems.map((fallback, index) => {
    const cmsItem = cmsItems?.[index];

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
  const noticeCards = page?.noticeCards?.length
    ? page.noticeCards
    : [
        { title: "세탁 전 확인사항", description: "제품의 파손, 변색, 소재 약화, 분해 가능 여부를 확인합니다. 오래된 얼룩은 오염도에 따라 결과가 달라질 수 있습니다." },
        { title: "고객 전달 전 검수", description: "건조 상태, 주요 오염 부위, 조립 상태를 확인한 뒤 고객에게 전달합니다. 사용 전 최종 상태 확인을 권장합니다." },
      ];

  return (
    <>
      <section className="bg-background-main py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <SectionHeader
              eyebrow={hero?.eyebrow || "Process"}
              title={hero?.title || "제품 상태를 확인하고 단계별로 케어합니다."}
              description={hero?.description || "분해 가능한 범위와 소재 상태를 먼저 확인한 뒤 세척, 살균 케어, 건조, 검수 순서로 진행합니다."}
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
          <SectionHeader eyebrow="Care Process" title="한눈에 보는 포베베 세탁 과정" description="고객이 가장 궁금해하는 흐름은 4단계로 먼저 보여주고, 아래에서 세부 진행 순서를 이어서 확인할 수 있게 구성했습니다." align="center" />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {careItems.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="overflow-hidden rounded-[22px] border border-border-soft bg-background-main shadow-[0_14px_38px_rgba(18,58,50,0.055)]">
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

          <div className="mt-12 border-t border-border-soft pt-10">
            <SectionHeader eyebrow="Detail" title="세부 진행 순서" description="실제 제품 상태와 소재에 따라 세부 과정은 달라질 수 있습니다." align="center" />
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

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {noticeCards.map((card) => (
              <article key={card.title} className="rounded-[18px] border border-border-soft bg-background-main p-5 shadow-[0_12px_32px_rgba(18,58,50,0.045)]">
                <SprayCan className="mb-4 h-7 w-7 text-brand-primary" aria-hidden />
                <h2 className="cms-lines text-xl font-medium text-brand-primary">{card.title}</h2>
                <p className="cms-lines mt-3 text-sm leading-7 text-text-sub">{card.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      {page?.finalCta?.isVisible === false ? null : <FinalCtaSection finalCta={page?.finalCta} />}
    </>
  );
}
