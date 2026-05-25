import Image from "next/image";

import { imageAlt, urlForImage } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import type { SanityImage as SanityImageType } from "@/types";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function SanityImage({
  image,
  alt,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  image?: SanityImageType;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const builder = urlForImage(image);
  const src = builder?.width(1400).height(1000).fit("crop").url();

  if (!src) {
    return <ImagePlaceholder label={`${alt} 이미지 준비 중`} className={cn("aspect-[4/3]", className)} />;
  }

  return (
    <div className={cn("relative overflow-hidden rounded-[22px] bg-background-soft shadow-[0_18px_45px_rgba(18,58,50,0.12)]", className)}>
      <Image src={src} alt={imageAlt(image, alt)} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
