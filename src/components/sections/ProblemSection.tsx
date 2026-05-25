import { Cloud, Droplets, Soup, Wind } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const problems = [
  { title: "음식물 얼룩", description: "간식과 음료가 시트 틈에 남기 쉽습니다.", icon: Soup },
  { title: "땀과 침", description: "피부에 닿는 부위에 생활 오염이 쌓입니다.", icon: Droplets },
  { title: "먼지와 진드기", description: "외부 이동 중 먼지가 깊은 틈으로 들어갑니다.", icon: Wind },
  { title: "냄새와 곰팡이", description: "습기와 오염이 만나 불쾌한 냄새 원인이 됩니다.", icon: Cloud },
];

export function ProblemSection() {
  return (
    <section className="bg-background-light py-16 sm:py-20">
      <Container>
        <SectionHeader
          title="겉으로 깨끗해 보여도, 내부 오염은 다릅니다."
          description="아이의 침, 땀, 음식물, 먼지, 외부 오염은 시트 틈과 안전벨트, 쿠션 안쪽에 쉽게 쌓입니다."
          align="center"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map(({ title, description, icon: Icon }) => (
            <Card key={title}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-soft text-brand-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-primary">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-text-sub">{description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
