import { defineField, defineType } from "sanity";

import { parseYouTubeLink } from "@/lib/youtube";
import { YouTubeUrlInput, YouTubeVideoInput } from "@/sanity/components/YouTubeVideoInput";

export const youtubeVideo = defineType({
  name: "youtubeVideo",
  title: "포베베 관련 영상",
  type: "document",
  components: { input: YouTubeVideoInput },
  orderings: [{ title: "최신 등록순", name: "newest", by: [{ field: "_createdAt", direction: "desc" }] }],
  fields: [
    defineField({
      name: "url",
      title: "유튜브 링크",
      type: "string",
      description: "일반 영상, 공유 링크, 쇼츠 링크를 붙여넣으세요. 게시하려면 Publish를 눌러주세요.",
      components: { input: YouTubeUrlInput },
      validation: (Rule) => Rule.required().custom((value) => parseYouTubeLink(value).error || true),
    }),
    defineField({
      name: "title",
      title: "영상 제목",
      type: "string",
      description: "유튜브 영상 제목을 자동으로 입력합니다. 원하는 제목으로 수정할 수 있습니다.",
    }),
    defineField({ name: "youtubeTitle", type: "string", hidden: true }),
    defineField({ name: "youtubeVideoId", type: "string", hidden: true }),
  ],
  preview: {
    select: { title: "title", youtubeTitle: "youtubeTitle", subtitle: "url" },
    prepare({ title, youtubeTitle, subtitle }) {
      return { title: title?.trim() || youtubeTitle || "YouTube 영상", subtitle };
    },
  },
});
