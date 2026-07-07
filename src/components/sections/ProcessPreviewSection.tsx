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
    <section id="process-preview" className="bg-background-light py-14 sm:py-20 lg:py-24" aria-labelledby="process-preview-title">
      <Container>
        <div className="process-preview-reveal mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-primary">{processSummary?.sectionLabel || "CARE PROCESS"}</p>
          <h2 id="process-preview-title" className="cms-lines fluid-section-title mt-3 font-semibold leading-tight text-green-dark">
            {processSummary?.title || "맡기는 순간부터\n다시 받는 순간까지"}
          </h2>
          <p className="cms-lines fluid-body mx-auto mt-4 max-w-2xl leading-7 text-text-sub sm:leading-8">
            {processSummary?.description || "제품 상태와 소재를 먼저 확인하고,\n오염 정도에 맞춰 단계별로 관리합니다."}
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {steps.map((item, index) => (
            <article
              key={item.step}
              className="process-preview-reveal relative flex min-h-[116px] rounded-[18px] border border-border-soft bg-background-main p-4 shadow-[0_16px_42px_rgba(18,58,50,0.045)] sm:min-h-[168px] sm:rounded-[22px] sm:p-5 lg:p-6 xl:min-h-[214px]"
              style={{ animationDelay: `${100 + index * 80}ms` }}
            >
              {index < steps.length - 1 ? (
                <div className="absolute left-[calc(100%-0.15rem)] top-12 z-10 hidden h-px w-5 bg-beige-medium/35 xl:block" aria-hidden />
              ) : null}
              <div className="flex h-full min-w-0 items-start gap-3 sm:gap-4 xl:block">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-medium text-text-inverse sm:h-11 sm:w-11 sm:text-sm xl:h-12 xl:w-12">
                  {item.step}
                </span>
                <div className="min-w-0 xl:mt-5">
                  <h3 className="cms-lines text-base font-medium leading-snug text-text-main [overflow-wrap:anywhere] sm:text-xl xl:text-[1.2rem]">{item.title}</h3>
                  <p className="cms-lines mt-1.5 text-sm leading-6 text-text-sub [word-break:keep-all] sm:mt-2.5 xl:leading-[1.7]">{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="process-preview-reveal mt-6 text-center text-sm font-medium leading-6 text-text-sub">
          {processSummary?.note || "제품 상태와 소재에 따라 세부 과정은 달라질 수 있습니다."}
        </p>

        <div className="process-preview-reveal mt-8 flex flex-col items-center justify-between gap-4 rounded-[18px] border border-border-soft bg-background-main/80 px-4 py-5 text-center shadow-[0_14px_36px_rgba(18,58,50,0.045)] sm:mt-9 sm:rounded-[24px] sm:px-6 lg:flex-row lg:px-7 lg:text-left">
          <p className="text-base font-medium leading-7 text-text-main sm:text-lg">포베베의 세탁 과정을 자세히 확인해보세요.</p>
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
