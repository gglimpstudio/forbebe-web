import { PriceCard } from "@/components/ui/PriceCard";
import type { PricingItem } from "@/types";

const categories = ["카시트", "유모차", "옵션"];

export function PricingTable({ items }: { items: PricingItem[] }) {
  return (
    <div className="grid gap-6 sm:gap-8">
      {categories.map((category) => {
        const categoryItems = items.filter((item) => item.category === category);
        if (categoryItems.length === 0) return null;

        return (
          <section key={category} aria-labelledby={`pricing-${category}`}>
            <h2 id={`pricing-${category}`} className="mb-3 text-xl font-medium text-brand-primary sm:mb-4 sm:text-2xl">
              {category} 가격
            </h2>
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
              {categoryItems.map((item) => (
                <PriceCard key={`${item.title}-${item.category}`} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
