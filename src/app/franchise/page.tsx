import type { Metadata } from "next";
import { Handshake } from "lucide-react";

import { ContactForm } from "@/components/ui/ContactForm";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getContentIcon } from "@/lib/contentIcons";
import { getFranchisePage } from "@/lib/sanity/queries";
import type { ContentCard } from "@/types";

export const metadata: Metadata = {
  title: "창업문의",
  description: "포베베 카시트와 유모차 세탁 지점 창업 상담을 신청하세요. 희망 지역과 문의 내용을 남기면 확인 후 연락드립니다.",
};

const benefits: ContentCard[] = [
  { title: "전문 품목 중심", description: "카시트와 유모차 세탁 수요에 집중한 운영 구조를 지향합니다.", icon: "ShieldCheck" },
  { title: "지역 기반 상담", description: "희망 지역과 상권 특성에 맞춰 개설 가능성을 검토합니다.", icon: "MapPinned" },
  { title: "운영 프로세스", description: "접수, 세탁, 건조, 검수 흐름을 기준으로 지점 운영을 설계합니다.", icon: "BarChart3" },
];

export default async function FranchisePage() {
  const page = await getFranchisePage();
  const hero = page?.hero;
  const cards = page?.benefits?.length ? page.benefits : benefits;
  const notice = page?.notice;

  return (
    <>
      <section className="bg-background-main py-12 sm:py-16 lg:py-20">
        <Container>
          <SectionHeader
            eyebrow={hero?.eyebrow || "Franchise"}
            title={hero?.title || "포베베 창업문의"}
            description={hero?.description || "유아용품 위생 관리 수요가 있는 지역에서 포베베 지점 운영을 검토하고 있다면 희망 지역과 상담 내용을 남겨주세요."}
          />
        </Container>
      </section>
      <section className="bg-background-light py-10 sm:py-14 lg:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="grid gap-4">
                {cards.map(({ title, description, icon }) => {
                  const Icon = getContentIcon(icon);

                  return (
                    <Card key={title}>
                      <div className="flex gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-background-soft text-brand-primary">
                          <Icon className="h-5 w-5" aria-hidden />
                        </div>
                        <div>
                          <h2 className="cms-lines text-lg font-medium text-brand-primary">{title}</h2>
                          <p className="cms-lines mt-2 text-sm leading-7 text-text-sub">{description}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
              <Card className="mt-4 bg-background-main">
                <Handshake className="mb-3 h-6 w-6 text-brand-primary" aria-hidden />
                <p className="cms-lines text-sm leading-7 text-text-sub">
                  {notice?.description || "상담 신청 후 담당자가 지역, 운영 형태, 준비 상황을 확인해 순차적으로 연락드립니다."}
                </p>
              </Card>
            </div>
            <Card>
              <h2 className="cms-lines mb-5 text-2xl font-medium text-brand-primary">{page?.formTitle || "창업문의 폼"}</h2>
              <ContactForm type="franchise" />
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
