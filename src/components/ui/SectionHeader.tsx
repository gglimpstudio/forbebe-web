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
      {eyebrow ? <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-brand-primary sm:mb-3 sm:text-sm">{eyebrow}</p> : null}
      <h2 className="cms-lines fluid-panel-title font-semibold leading-tight text-brand-primary">{title}</h2>
      {description ? <p className="cms-lines fluid-body mt-3 leading-7 text-text-sub sm:mt-4">{description}</p> : null}
    </div>
  );
}
