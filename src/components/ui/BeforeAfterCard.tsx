import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SanityImage } from "@/components/ui/SanityImage";
import type { CleaningCase } from "@/types";

export function BeforeAfterCard({ item }: { item: CleaningCase }) {
  return (
    <Card className="h-full p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Badge className="mb-2 bg-background-soft text-text-sub">Before</Badge>
          <SanityImage image={item.beforeImage} alt={`${item.title} 세탁 전`} className="aspect-[4/3] rounded-[18px]" />
        </div>
        <div>
          <Badge className="mb-2 bg-background-soft text-brand-primary">After</Badge>
          <SanityImage image={item.afterImage} alt={`${item.title} 세탁 후`} className="aspect-[4/3] rounded-[18px]" />
        </div>
      </div>
      <div className="mt-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {item.itemType ? <Badge>{item.itemType}</Badge> : null}
          {item.problemType ? <Badge className="bg-background-main text-text-sub">{item.problemType}</Badge> : null}
        </div>
        <h3 className="text-lg font-medium text-brand-primary">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-text-sub">{item.description}</p>
      </div>
    </Card>
  );
}
