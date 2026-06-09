import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Testimonial } from "@/types";

export function ReviewSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="bg-background-main py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeader title="맡겨본 부모님들의 후기" description="실제 후기는 고객 동의를 받은 내용만 CMS에 입력해 노출하는 구조입니다." align="center" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((item, index) => (
            <Card key={`${item.customerName}-${index}`}>
              <p className="text-base leading-8 text-brand-primary">“{item.content}”</p>
              <div className="mt-5 text-sm font-semibold text-text-sub">
                {item.customerName || "익명"} · {item.itemType || "유아용품"} · {item.branchName || "포베베"}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
