import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/sections/FinalCTASection";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { SanityImage } from "@/components/ui/SanityImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getProcessSteps } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "세탁 과정",
  description: "포베베의 예약 접수, 제품 상태 확인, 세척, 살균 케어, 건조, 최종 검수 과정을 안내합니다.",
};

export const revalidate = 300;

export default async function ProcessPage() {
  const steps = await getProcessSteps();

  return (
    <>
      <section className="bg-background-main py-14 sm:py-20">
        <Container>
          <SectionHeader eyebrow="Process" title="제품 상태를 확인하고 단계별로 케어합니다." description="분해 가능한 범위와 소재 상태를 먼저 확인한 뒤 세척, 살균 케어, 건조, 검수 순서로 진행합니다." />
        </Container>
      </section>
      <section className="bg-background-light py-12 sm:py-16">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={`${step.title}-${index}`}>
                {step.image ? <SanityImage image={step.image} alt={step.title} className="mb-4 aspect-[4/3]" /> : null}
                <ProcessStep step={step} index={index} />
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Card>
              <h2 className="text-xl font-bold text-brand-primary">세탁 전 확인사항</h2>
              <p className="mt-3 text-sm leading-7 text-text-sub">제품의 파손, 변색, 소재 약화, 분해 가능 여부를 확인합니다. 오래된 얼룩은 오염도에 따라 결과가 달라질 수 있습니다.</p>
            </Card>
            <Card>
              <h2 className="text-xl font-bold text-brand-primary">고객 전달 전 검수</h2>
              <p className="mt-3 text-sm leading-7 text-text-sub">건조 상태, 주요 오염 부위, 조립 상태를 확인한 뒤 고객에게 전달합니다. 사용 전 최종 상태 확인을 권장합니다.</p>
            </Card>
          </div>
        </Container>
      </section>
      <FinalCtaSection />
    </>
  );
}
