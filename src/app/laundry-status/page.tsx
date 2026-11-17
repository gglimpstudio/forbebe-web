import { Info } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { LaundryStatusBoard } from "@/components/ui/LaundryStatusBoard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { parseGoogleSlidesLink } from "@/lib/googleSlides";
import { getSlideAspect } from "@/lib/googleSlidesServer";
import { getLaundryStatusPage } from "@/lib/sanity/queries";

const defaultDescription = "포베베의 현재 세탁 진행 현황을 확인하세요.";
const defaultNotice = "현재 시범 운영 중으로, 천안아산점 세탁 현황만 제공됩니다.";

// Customer status board: reachable from the menu, but kept out of search results and the sitemap.
export const metadata: Metadata = {
  title: "세탁현황",
  description: defaultDescription,
  alternates: { canonical: "/laundry-status" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export const revalidate = 300;

export default async function LaundryStatusPage() {
  const page = await getLaundryStatusPage();
  const { presentationId } = parseGoogleSlidesLink(page?.slidesUrl);
  const title = page?.title?.trim() || "세탁현황";
  const slideAspect = presentationId ? await getSlideAspect(presentationId) : undefined;
  const notice = page?.showNotice === false ? null : page?.notice?.trim() || defaultNotice;
  return (
    <>
      <section className="bg-background-main py-8 sm:py-10 lg:py-12">
        <Container>
          <SectionHeader
            eyebrow="STATUS"
            title={title}
            description={page?.description?.trim() || defaultDescription}
            headingLevel="h1"
          />
        </Container>
      </section>
      <section className="bg-background-light pb-10 pt-4 sm:pb-14 sm:pt-10 lg:pb-16 lg:pt-12">
        <Container>
          {notice && (
            <div role="note" className="mb-3 flex items-start gap-2 rounded-[10px] bg-green-dark px-3 py-2.5 text-text-inverse shadow-sm sm:mb-5 sm:items-center sm:gap-2.5 sm:rounded-[12px] sm:px-5 sm:py-4">
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary sm:mt-0 sm:h-5 sm:w-5" />
              <p className="cms-lines text-[13px] font-semibold leading-5 sm:text-base sm:leading-6">{notice}</p>
            </div>
          )}
          {presentationId ? (
            <LaundryStatusBoard presentationId={presentationId} autoAdvanceSeconds={page?.autoAdvanceSeconds} refreshMinutes={page?.refreshMinutes} slideAspect={slideAspect} title={title} />
          ) : (
            <p className="py-16 text-center text-text-sub sm:py-24">아직 등록된 세탁현황이 없습니다.</p>
          )}
        </Container>
      </section>
    </>
  );
}
