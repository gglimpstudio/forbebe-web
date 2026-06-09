import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";
import type { Service } from "@/types";

export function ServicePreviewSection({ services }: { services: Service[] }) {
  return (
    <section className="bg-background-light py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader title="세탁 가능 품목" description="카시트와 유모차를 중심으로 지점 상담 후 다양한 유아용품 케어 가능 여부를 안내합니다." />
          <Button href="/services" variant="outline">전체 서비스 보기</Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
