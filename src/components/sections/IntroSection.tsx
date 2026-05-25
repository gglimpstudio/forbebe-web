import { ClipboardCheck, MapPinned, ScanSearch, ShieldCheck, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import type { HomeCard, IntroSection as IntroSectionData } from "@/types";

const defaultItems: Required<Pick<HomeCard, "title" | "description" | "icon">>[] = [
  { title: "카시트·유모차 전문 케어", description: "유아 이동용품 구조와 사용 환경을 고려해 상담합니다.", icon: "ShieldCheck" },
  { title: "분해 가능한 부위 확인", description: "제품별 가능 범위를 먼저 확인하고 무리한 분해를 피합니다.", icon: "ScanSearch" },
  { title: "오염 부위 집중 관리", description: "얼룩, 냄새, 먼지가 쌓인 부위를 중심으로 케어합니다.", icon: "Sparkles" },
];

const iconMap = {
  ClipboardCheck,
  MapPinned,
  ScanSearch,
  ShieldCheck,
  Sparkles,
};

function IntroCard({ item }: { item: HomeCard }) {
  const Icon = iconMap[item.icon as keyof typeof iconMap] || ShieldCheck;

  return (
    <article className="rounded-[24px] border border-border-soft bg-background-light p-6 shadow-[0_18px_50px_rgba(18,58,50,0.05)]">
      {item.image?.asset ? (
        <SanityImage image={item.image} alt={item.title || "소개 항목"} className="mb-5 aspect-[4/3] rounded-[18px]" sizes="(min-width: 1024px) 24vw, 86vw" />
      ) : (
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-green-soft text-brand-primary">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
      )}
      <h3 className="text-xl font-black text-green-dark">{item.title}</h3>
      {item.description ? <p className="mt-3 text-sm leading-7 text-text-sub">{item.description}</p> : null}
    </article>
  );
}

export function IntroSection({ intro }: { intro?: IntroSectionData }) {
  const items = intro?.items?.length ? intro.items : defaultItems;

  return (
    <section id="intro" className="bg-background-main py-20 sm:py-24" aria-labelledby="intro-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-primary">{intro?.sectionLabel || "ABOUT FORBEBE"}</p>
            <h2 id="intro-title" className="mt-4 whitespace-pre-line text-3xl font-black leading-tight text-green-dark sm:text-4xl lg:text-5xl">
              {intro?.title || "아이에게 닿는 이동용품,\n전문 케어가 필요합니다."}
            </h2>
            <p className="mt-6 whitespace-pre-line text-base leading-8 text-text-sub sm:text-lg">
              {intro?.description ||
                "포베베는 유모차와 카시트처럼 아이가 자주 닿는 제품을 제품 상태와 소재에 맞춰 세심하게 관리하는 전문 세탁 케어 브랜드입니다."}
            </p>
          </div>
          <SanityImage image={intro?.image} alt={intro?.title || "포베베 소개"} className="aspect-[4/3] rounded-[28px]" priority={false} />
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <IntroCard key={item.title} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
