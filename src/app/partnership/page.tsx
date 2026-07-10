import type { Metadata } from "next";

import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/ui/ContactForm";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getContentIcon } from "@/lib/contentIcons";
import { getPartnershipPage } from "@/lib/sanity/queries";
import { createSeoMetadata } from "@/lib/seo";
import type { ContentCard } from "@/types";

export const metadata: Metadata = createSeoMetadata({
  title: "제휴문의",
  description: "포베베와 마케팅, 서비스, 입점·판매, 기업·기관 제휴를 문의하세요. 담당자가 검토 후 연락드립니다.",
  path: "/partnership",
  keywords: ["제휴문의", "마케팅 제휴", "서비스 제휴", "입점 제휴", "기업 제휴"],
});

const partnershipTypes: ContentCard[] = [
  { title: "기업 복지", description: "임직원 육아 복지와 유아용품 케어 혜택을 함께 설계합니다.", icon: "Gift" },
  { title: "산후조리원", description: "신생아 가정의 카시트, 유모차 케어 안내와 연계할 수 있습니다.", icon: "Building2" },
  { title: "유아용품 매장", description: "고객 구매 후 관리 서비스와 상담 채널을 연결합니다.", icon: "Store" },
  { title: "브랜드 제휴", description: "캠페인, 프로모션, 콘텐츠 협업 등 다양한 형태를 검토합니다.", icon: "Handshake" },
];

export default async function PartnershipPage() {
  const page = await getPartnershipPage();
  const hero = page?.hero;
  const cards = page?.partnershipTypes?.length ? page.partnershipTypes : partnershipTypes;

  return (
    <>
      <section className="bg-background-main py-12 sm:py-16 lg:py-20">
        <Container>
          <SectionHeader
            eyebrow={hero?.eyebrow || "Partnership"}
            title={hero?.title || "포베베 제휴문의"}
            description={hero?.description || "유아용품 위생 케어가 필요한 고객 접점이 있다면 포베베와 함께할 수 있는 제휴 방식을 문의해주세요."}
            headingLevel="h1"
          />
        </Container>
      </section>
      <section className="bg-background-light py-10 sm:py-14 lg:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {cards.map(({ title, description, icon }) => {
                const Icon = getContentIcon(icon);

                return (
                  <Card key={title}>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-background-soft text-brand-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h2 className="cms-lines text-lg font-medium text-brand-primary">{title}</h2>
                    <p className="cms-lines mt-2 text-sm leading-7 text-text-sub">{description}</p>
                  </Card>
                );
              })}
            </div>
            <Card>
              <h2 className="cms-lines mb-5 text-2xl font-medium text-brand-primary">{page?.formTitle || "제휴문의 폼"}</h2>
              <ContactForm type="partnership" />
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
