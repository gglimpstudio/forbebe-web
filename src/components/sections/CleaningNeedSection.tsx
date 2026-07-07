import { CheckCircle2, Droplets, PackageOpen, Sparkles, Wind } from "lucide-react";

import { Container } from "@/components/ui/Container";
import type { NecessitySection } from "@/types";

const contaminationCauses = [
  {
    title: "외부 먼지",
    description: "바퀴와 프레임에 먼지가 쉽게 묻습니다.",
    icon: Wind,
  },
  {
    title: "음식물 오염",
    description: "우유, 과자, 음료가 패브릭에 스며듭니다.",
    icon: Sparkles,
  },
  {
    title: "땀과 체취",
    description: "피부가 닿는 시트에 냄새가 남기 쉽습니다.",
    icon: Droplets,
  },
  {
    title: "보관 오염",
    description: "보관 중 먼지, 습기, 냄새가 쌓일 수 있습니다.",
    icon: PackageOpen,
  },
];

const cleaningSignals = [
  "오래 보관한 유모차를 다시 사용할 때",
  "중고 또는 물려받은 제품을 사용할 때",
  "음식물이나 음료를 흘린 적이 있을 때",
  "냄새나 얼룩이 신경 쓰일 때",
  "출산 전 미리 준비할 때",
  "계절이 바뀌며 정리 세탁이 필요할 때",
];

const defaultSignalsTitle = "해당된다면, 전문 케어가 필요한 시점입니다.";

const iconMap = {
  Droplets,
  PackageOpen,
  Sparkles,
  Wind,
};

function twoLineSummary(text: string | undefined, fallback: string) {
  return (text || fallback)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 2)
    .join("\n");
}

function compactCardDescription(description: string | undefined) {
  if (!description) return "";
  const firstSentence = description.split(/(?<=[.!?。]|[요다]\.)\s*/)[0]?.trim();
  return firstSentence || description.trim();
}

function signalKeyword(signal: string) {
  if (signal.includes("보관")) return "보관 제품";
  if (signal.includes("중고") || signal.includes("물려받")) return "중고·물려받은 제품";
  if (signal.includes("음식물") || signal.includes("음료")) return "음식물 오염";
  if (signal.includes("냄새") || signal.includes("얼룩")) return "냄새·얼룩";
  return signal.replace(/을 때$|할 때$|있을 때$/g, "").trim();
}

export function CleaningNeedSection({ necessity }: { necessity?: NecessitySection }) {
  const cards = necessity?.cards?.length ? necessity.cards : contaminationCauses;
  const signals = necessity?.signals?.length ? necessity.signals : cleaningSignals;
  const ctaKeywords = Array.from(new Set(signals.slice(0, 4).map(signalKeyword))).slice(0, 3);
  const ctaContext = ctaKeywords.length ? `${ctaKeywords.join(" · ")}이 신경 쓰인다면` : "사용 이력이 신경 쓰인다면";
  const signalsLabel = necessity?.signalsLabel || "추천 상황";
  const signalsTitle = necessity?.signalsTitle || defaultSignalsTitle;

  return (
    <section id="cleaning-need" className="bg-background-light py-12 sm:py-16 lg:py-20" aria-labelledby="cleaning-need-title">
      <Container>
        <div className="cleaning-need-reveal mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-[680px] lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-primary">{necessity?.sectionLabel || "세탁이 필요한 이유"}</p>
          <h2 id="cleaning-need-title" className="cms-lines fluid-section-title mt-4 font-semibold leading-tight text-green-dark">
            {necessity?.title || "아이의 이동 공간,\n생각보다 쉽게 오염됩니다."}
          </h2>
          <p className="cms-lines fluid-body mt-4 max-w-xl leading-7 text-text-sub sm:leading-8">
            {twoLineSummary(
              necessity?.description,
              "유모차와 카시트는 아이의 피부가 직접 닿고,\n외부 환경과 음식물 오염에 반복적으로 노출됩니다.",
            )}
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {cards.map((item, index) => {
            const Icon = typeof item.icon === "string" ? iconMap[item.icon as keyof typeof iconMap] || Sparkles : item.icon || Sparkles;
            return (
              <article
                key={item.title}
                className="cleaning-need-reveal rounded-[18px] border border-border-soft bg-background-light p-4 shadow-[0_12px_28px_rgba(18,58,50,0.04)] sm:min-h-[164px] sm:rounded-[20px] sm:p-5 lg:min-h-[176px]"
                style={{ animationDelay: `${120 + index * 80}ms` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-soft text-brand-primary">
                  <Icon className="h-4.5 w-4.5" aria-hidden />
                </div>
                <h3 className="cms-lines mt-3.5 text-lg font-medium leading-snug text-green-dark">{item.title}</h3>
                <p className="cms-lines mt-2 line-clamp-2 text-sm leading-6 text-text-sub">{compactCardDescription(item.description)}</p>
              </article>
            );
          })}
        </div>

        <div className="cleaning-need-reveal mt-6 rounded-[18px] bg-green-dark/95 px-4 py-5 text-center shadow-[0_18px_44px_rgba(18,58,50,0.1)] sm:rounded-[22px] sm:px-6 lg:py-5 lg:text-left">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-secondary/85">{signalsLabel}</p>
              <p className="cms-lines fluid-body mt-2 font-medium leading-7 text-text-inverse">{signalsTitle}</p>
              <p className="mt-1 text-sm leading-6 text-text-inverse/75">{ctaContext} 전문 케어가 필요한 시점일 수 있습니다.</p>
            </div>
          </div>

          <ul className="mt-4 grid gap-2 text-left sm:grid-cols-2 lg:grid-cols-4">
            {signals.map((signal) => (
              <li key={signal} className="flex min-h-10 items-start gap-2 rounded-[14px] bg-text-inverse/8 px-3 py-2 text-sm font-medium leading-6 text-text-inverse/90">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" aria-hidden />
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
