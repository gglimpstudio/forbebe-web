import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { FaqItem } from "@/types";

export function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section className="bg-background-light py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader title="자주 묻는 질문" description="예약 전 궁금한 점을 먼저 확인하고, 자세한 내용은 가까운 지점에 문의해주세요." />
            <Button href="/faq" variant="outline" className="mt-6">FAQ 전체 보기</Button>
          </div>
          <Accordion items={faqs.slice(0, 6)} />
        </div>
      </Container>
    </section>
  );
}
