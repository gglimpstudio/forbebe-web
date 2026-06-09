import { Container } from "@/components/ui/Container";
import { PriceCard } from "@/components/ui/PriceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { PricingItem } from "@/types";

export function PricingSection({ items }: { items: PricingItem[] }) {
  return (
    <section className="bg-background-main py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeader
          title="가격 안내"
          description="전 지점 동일 기준으로 안내되며, 제품 종류와 오염도에 따라 최종 금액이 달라질 수 있습니다."
          align="center"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.slice(0, 4).map((item) => (
            <PriceCard key={`${item.title}-${item.category}`} item={item} />
          ))}
        </div>
        <p className="mt-6 text-center text-sm font-semibold text-text-sub">정확한 금액은 제품 상태 확인 후 안내드립니다.</p>
      </Container>
    </section>
  );
}
