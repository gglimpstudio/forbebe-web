import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { PricingItem } from "@/types";

export function PriceCard({ item }: { item: PricingItem }) {
  const price = item.price ? `${item.price.toLocaleString("ko-KR")}원` : item.priceText || "상담 후 안내";

  return (
    <Card className={item.isFeatured ? "border-beige-medium bg-background-main" : undefined}>
      <div className="flex items-start justify-between gap-4">
        <div>
          {item.category ? <Badge>{item.category}</Badge> : null}
          <h3 className="mt-3 text-xl font-bold text-brand-primary">{item.title}</h3>
        </div>
        {item.isFeatured ? <Badge className="bg-brand-primary text-text-inverse">대표</Badge> : null}
      </div>
      <p className="mt-5 text-2xl font-black text-brand-primary">{price}</p>
      <p className="mt-3 min-h-12 text-sm leading-6 text-text-sub">{item.description}</p>
      {item.cautions?.length ? (
        <ul className="mt-4 space-y-2 text-xs leading-5 text-text-sub">
          {item.cautions.map((caution) => (
            <li key={caution}>* {caution}</li>
          ))}
        </ul>
      ) : null}
      <Button href="/contact" className="mt-5 w-full" variant={item.isFeatured ? "primary" : "outline"}>
        예약 문의하기
      </Button>
    </Card>
  );
}
