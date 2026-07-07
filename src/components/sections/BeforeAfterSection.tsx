import { existsSync } from "node:fs";
import path from "node:path";

import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { imageAlt, urlForImage } from "@/lib/sanity/image";
import type { BeforeAfterSection as BeforeAfterSectionData, SanityImage } from "@/types";

type BeforeAfterItem = {
  title: string;
  description: string;
  beforeImage: string | SanityImage;
  afterImage: string | SanityImage;
  beforeAlt: string;
  afterAlt: string;
  objectPosition?: string;
};

const beforeAfterItems: BeforeAfterItem[] = [
  {
    title: "유모차 시트 케어",
    description: "사용 흔적이 남은 시트도 소재에 맞춰 관리합니다.",
    beforeImage: "/images/before-after/stroller-before.jpg",
    afterImage: "/images/before-after/stroller-after.jpg",
    beforeAlt: "유모차 시트 케어 전 사진",
    afterAlt: "유모차 시트 케어 후 사진",
    objectPosition: "center center",
  },
  {
    title: "카시트 패브릭 케어",
    description: "패브릭 깊숙한 생활 오염까지 꼼꼼히 확인합니다.",
    beforeImage: "/images/before-after/car-seat-before.jpg",
    afterImage: "/images/before-after/car-seat-after.jpg",
    beforeAlt: "카시트 패브릭 케어 전 사진",
    afterAlt: "카시트 패브릭 케어 후 사진",
    objectPosition: "center center",
  },
  {
    title: "생활 오염 케어",
    description: "아이가 자주 닿는 공간을 산뜻하게 관리합니다.",
    beforeImage: "/images/before-after/fabric-before.jpg",
    afterImage: "/images/before-after/fabric-after.jpg",
    beforeAlt: "생활 오염 케어 전 사진",
    afterAlt: "생활 오염 케어 후 사진",
    objectPosition: "center center",
  },
];

function publicImageExists(src: string) {
  return existsSync(path.join(process.cwd(), "public", src));
}

function resolveImageSrc(src: string | SanityImage | undefined) {
  if (!src) return null;
  if (typeof src === "string") return publicImageExists(src) ? src : null;
  return urlForImage(src)?.width(1200).fit("max").url() || null;
}

function ComparisonImage({
  src,
  alt,
  label,
  objectPosition = "center center",
}: {
  src?: string | SanityImage;
  alt: string;
  label: "Before" | "After";
  objectPosition?: string;
}) {
  const imageSrc = resolveImageSrc(src);
  const labelClassName = label === "Before" ? "bg-background-light/90 text-text-sub" : "bg-background-light/90 text-brand-primary";

  return (
    <div className="group relative aspect-square min-h-0 min-w-0 overflow-hidden rounded-[18px] bg-background-soft">
      <span className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] shadow-sm ${labelClassName}`}>
        {label}
      </span>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt(typeof src === "object" ? src : undefined, alt)}
          fill
          sizes="(min-width: 1440px) 15vw, (min-width: 1024px) 16vw, (min-width: 640px) 38vw, 42vw"
          className="object-contain transition duration-500 group-hover:scale-[1.01]"
          style={{ objectPosition }}
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-background-main px-4 text-center">
          <div>
            <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-background-light/80 shadow-inner" />
            <p className="text-sm font-medium text-text-sub">{label} 이미지 준비 중</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function BeforeAfterSection({ beforeAfter }: { beforeAfter?: BeforeAfterSectionData }) {
  const description = beforeAfter?.description || "오염 상태와 소재에 맞춰 카시트와 유모차를 세심하게 관리합니다.";
  const items: BeforeAfterItem[] = beforeAfter?.items?.length
    ? beforeAfter.items.map((item) => ({
        title: item.title || "전후사진",
        description: item.description || "",
        beforeImage: item.beforeImage || "",
        afterImage: item.afterImage || "",
        beforeAlt: item.beforeImage?.alt || `${item.title || "제품"} 케어 전 사진`,
        afterAlt: item.afterImage?.alt || `${item.title || "제품"} 케어 후 사진`,
        objectPosition: "center center",
      }))
    : beforeAfterItems;

  return (
    <section id="before-after" className="bg-background-main py-14 sm:py-20 lg:py-24" aria-labelledby="before-after-title">
      <Container className="max-w-none !px-3 sm:!px-4 lg:!px-5">
        <div className="before-after-reveal mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-primary">{beforeAfter?.sectionLabel || "BEFORE & AFTER"}</p>
          <h2 id="before-after-title" className="cms-lines fluid-section-title mt-4 font-semibold leading-tight text-green-dark">
            {beforeAfter?.title || "눈으로 확인하는 포베베 케어 전후"}
          </h2>
          <p className="cms-lines cms-lines-mobile-wrap fluid-body mt-4 leading-7 text-text-sub sm:mt-6 sm:leading-8">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-[96rem] gap-3 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={item.title}
              className="before-after-reveal rounded-[22px] border border-border-soft bg-background-light p-2.5 shadow-[0_14px_38px_rgba(18,58,50,0.055)] sm:rounded-[26px] sm:p-3 lg:rounded-[30px] lg:p-4"
              style={{ animationDelay: `${100 + index * 90}ms` }}
            >
              <h3 className="cms-lines px-1 pt-1 text-xl font-medium leading-tight text-green-dark lg:text-2xl">{item.title}</h3>
              <div className="mt-3 grid grid-cols-2 gap-1 rounded-[22px] sm:gap-2">
                <ComparisonImage src={item.beforeImage} alt={item.beforeAlt} label="Before" objectPosition={item.objectPosition} />
                <ComparisonImage src={item.afterImage} alt={item.afterAlt} label="After" objectPosition={item.objectPosition} />
              </div>
              <p className="cms-lines mt-3 overflow-hidden px-1 pb-1 text-sm leading-6 text-text-sub [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                {item.description}
              </p>
            </article>
          ))}
        </div>

      </Container>
    </section>
  );
}
