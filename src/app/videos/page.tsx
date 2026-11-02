import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VideoBoard } from "@/components/ui/VideoBoard";
import { getYouTubeVideos } from "@/lib/sanity/queries";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "포베베 영상",
  description: "포베베 관련 영상을 만나보세요. 썸네일을 누르면 바로 영상을 시청할 수 있습니다.",
  path: "/videos",
  keywords: ["포베베 영상", "유모차 세탁 영상", "카시트 세탁 영상"],
});

export const revalidate = 300;

export default async function VideosPage() {
  const videos = await getYouTubeVideos();
  return (
    <>
      <section className="bg-background-main py-8 sm:py-10 lg:py-12">
        <Container>
          <SectionHeader eyebrow="VIDEOS" title="포베베 영상" headingLevel="h1" />
        </Container>
      </section>
      <section className="bg-background-light pb-10 pt-8 sm:pb-14 sm:pt-10 lg:pb-16 lg:pt-12">
        <Container><VideoBoard videos={videos} /></Container>
      </section>
    </>
  );
}
