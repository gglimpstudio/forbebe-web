import { ClipboardCheck, MapPinned, ScanSearch, ShieldCheck, Sparkles } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const reasons = [
  { title: "카시트·유모차 전문 케어", description: "유아 이동용품 구조와 사용 환경을 고려해 상담합니다.", icon: ShieldCheck },
  { title: "분해 가능한 부위 확인 후 세척", description: "무리한 분해를 피하고 제품별 가능 범위를 먼저 확인합니다.", icon: ScanSearch },
  { title: "오염 부위 집중 케어", description: "얼룩, 냄새, 먼지가 쌓인 부위를 중심으로 관리합니다.", icon: Sparkles },
  { title: "살균 및 건조 케어", description: "세척 이후 위생 케어와 충분한 건조 상태를 확인합니다.", icon: ClipboardCheck },
  { title: "지점별 상담 및 예약 연결", description: "가까운 지점에서 제품 상태와 일정을 빠르게 안내합니다.", icon: MapPinned },
];

export function WhyForbebeSection() {
  return (
    <section className="bg-background-main py-16 sm:py-20">
      <Container>
        <SectionHeader title="포베베를 선택해야 하는 이유" align="center" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {reasons.map(({ title, description, icon: Icon }) => (
            <Card key={title} className="bg-background-light/90">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-background-soft text-brand-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-brand-primary">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-text-sub">{description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
