import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ProcessStep } from "@/types";

export function ProcessSection({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="bg-background-main py-16 sm:py-20">
      <Container>
        <SectionHeader title="포베베 세탁 과정" description="예약 접수부터 고객 전달 전 검수까지 제품 상태에 맞춰 단계별로 확인합니다." align="center" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={`${step.title}-${index}`} className="relative rounded-[22px] border border-border-soft bg-background-light p-5 shadow-sm">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-sm font-black text-text-inverse">{index + 1}</span>
              <h3 className="text-lg font-bold text-brand-primary">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-text-sub">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
