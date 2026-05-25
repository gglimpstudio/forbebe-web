import { Container } from "@/components/ui/Container";
import { urlForImage } from "@/lib/sanity/image";
import type { SloganItem, SloganSection as SloganSectionData } from "@/types";

const SLOGAN_BACKGROUND_IMAGE = "";

const sloganItems: SloganItem[] = [
  {
    text: "카시트 & 유모차 케어의 기준",
    subText: "세탁을 넘어, 아이가 머무는 이동 공간을 세심하게 관리합니다.",
  },
  {
    text: "우리 아이가 처음 만나는 명품 케어",
    subText: "부모의 마음으로 소재와 오염 상태에 맞춰 꼼꼼하게 케어합니다.",
  },
];

export function SloganSection({ slogan }: { slogan?: SloganSectionData }) {
  const items = sloganItems;
  const backgroundImage = urlForImage(slogan?.backgroundImage)?.width(1600).height(1000).fit("crop").url() || SLOGAN_BACKGROUND_IMAGE;

  return (
    <section
      id="slogan"
      className="slogan-section-reveal relative overflow-hidden bg-green-dark py-20 sm:py-24 lg:py-28"
      aria-labelledby="slogan-title"
    >
      {backgroundImage ? (
        <div
          className="absolute inset-y-0 right-0 hidden w-1/2 bg-cover bg-center opacity-18 lg:block"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
          aria-hidden
        />
      ) : null}
      <div className="absolute inset-x-0 top-0 h-px bg-brand-secondary" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-px bg-brand-secondary" aria-hidden />

      <Container className="relative">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-brand-secondary/90">FORBEBE CARE</p>
          <h2 id="slogan-title" className="sr-only">
            슬로건
          </h2>
          <div className="relative mx-auto mt-8 min-h-[14.5rem] max-w-4xl sm:min-h-[13.5rem] lg:min-h-[14rem]" aria-live="off">
            {items.map((item, itemIndex) => {
              return (
                <div
                  key={item.text}
                  className={`slogan-copy-fade absolute inset-0 flex flex-col items-center justify-center ${
                    itemIndex === 0 ? "slogan-copy-fade-first" : "slogan-copy-fade-second"
                  }`}
                  aria-hidden={itemIndex !== 0}
                >
                  <p className="mx-auto max-w-full whitespace-nowrap text-[clamp(1.74rem,7vw,3.55rem)] font-black leading-[1.14] text-text-inverse sm:text-[clamp(3rem,5vw,4.25rem)]">
                    {item.text}
                  </p>
                  <p className="mx-auto mt-7 max-w-2xl text-[0.98rem] leading-8 text-brand-secondary/90 sm:text-lg">
                    {item.subText}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mx-auto mt-2 flex w-28 items-center justify-center gap-2" aria-hidden>
            <span className="slogan-indicator-dot slogan-indicator-dot-first h-1 w-8 bg-brand-secondary/85" />
            <span className="slogan-indicator-dot slogan-indicator-dot-second h-1 w-8 bg-brand-secondary/30" />
          </div>
        </div>
      </Container>
    </section>
  );
}
