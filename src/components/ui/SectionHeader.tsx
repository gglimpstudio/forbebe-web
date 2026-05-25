import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <p className="mb-3 text-sm font-bold text-brand-primary">{eyebrow}</p> : null}
      <h2 className="text-2xl font-bold leading-tight text-brand-primary sm:text-3xl lg:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-text-sub sm:text-lg">{description}</p> : null}
    </div>
  );
}
