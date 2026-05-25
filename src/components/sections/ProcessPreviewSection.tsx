import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { ProcessSummarySection } from "@/types";

type ProcessPreviewStep = {
  step: string;
  title: string;
  description: string;
};

const processPreviewSteps: ProcessPreviewStep[] = [
  {
    step: "01",
    title: "제품 상태 확인",
    description: "오염 부위와 소재, 사용 상태를 먼저 확인합니다.",
  },
  {
    step: "02",
    title: "분리 및 오염 체크",
    description: "세탁 가능한 부품과 틈새 오염을 꼼꼼히 살핍니다.",
  },
  {
    step: "03",
    title: "소재별 맞춤 세탁",
    description: "소재와 오염 정도에 맞춰 단계별로 세탁합니다.",
  },
  {
    step: "04",
    title: "건조 및 마무리 점검",
    description: "충분히 건조한 뒤 상태를 확인하고 마무리합니다.",
  },
];

export function ProcessPreviewSection({ processSummary }: { processSummary?: ProcessSummarySection }) {
  const steps = processSummary?.steps?.length
    ? processSummary.steps.map((step, index) => ({
        step: step.stepNumber || String(index + 1).padStart(2, "0"),
        title: step.title || `단계 ${index + 1}`,
        description: step.description || "",
      }))
    : processPreviewSteps;
  const ctaHref = processSummary?.ctaHref || "/process";

  return (
    <section id="process-preview" className="bg-background-light py-[72px] sm:py-[88px] lg:py-24" aria-labelledby="process-preview-title">
      <Container>
        <div className="process-preview-reveal mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-primary">{processSummary?.sectionLabel || "CARE PROCESS"}</p>
          <h2 id="process-preview-title" className="mt-3 whitespace-pre-line text-balance text-3xl font-black leading-tight text-green-dark sm:text-4xl lg:text-5xl">
            {processSummary?.title || "맡기는 순간부터\n다시 받는 순간까지"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-pretty text-base leading-7 text-text-sub sm:text-lg sm:leading-8">
            {processSummary?.description || "제품 상태와 소재를 먼저 확인하고,\n오염 정도에 맞춰 단계별로 관리합니다."}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.map((item, index) => (
            <article
              key={item.step}
              className="process-preview-reveal relative flex min-h-[168px] rounded-[24px] border border-border-soft bg-background-main p-5 shadow-[0_16px_42px_rgba(18,58,50,0.045)] sm:p-6 lg:min-h-[214px]"
              style={{ animationDelay: `${100 + index * 80}ms` }}
            >
              {index < steps.length - 1 ? (
                <div className="absolute left-[calc(100%-0.15rem)] top-12 z-10 hidden h-px w-5 bg-beige-medium/35 lg:block" aria-hidden />
              ) : null}
              <div className="flex h-full items-start gap-4 lg:block">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-black text-text-inverse lg:h-12 lg:w-12">
                  {item.step}
                </span>
                <div className="min-w-0 [word-break:keep-all] lg:mt-5">
                  <h3 className="text-lg font-black leading-snug text-text-main sm:text-xl">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-text-sub lg:leading-[1.7]">{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="process-preview-reveal mt-6 text-center text-sm font-medium leading-6 text-text-sub">
          {processSummary?.note || "제품 상태와 소재에 따라 세부 과정은 달라질 수 있습니다."}
        </p>

        <div className="process-preview-reveal mt-9 flex flex-col items-center justify-between gap-4 rounded-[24px] border border-border-soft bg-background-main/80 px-5 py-5 text-center shadow-[0_14px_36px_rgba(18,58,50,0.045)] sm:px-6 lg:flex-row lg:px-7 lg:text-left">
          <p className="text-base font-bold leading-7 text-text-main sm:text-lg">포베베의 세탁 과정을 자세히 확인해보세요.</p>
          {ctaHref ? (
            <Button href={ctaHref} size="lg" className="w-full shrink-0 gap-2 px-6 sm:w-auto">
              {processSummary?.ctaLabel || "전체 세탁 과정 보기"} <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
