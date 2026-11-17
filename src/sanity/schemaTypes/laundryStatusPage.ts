import { defineField, defineType } from "sanity";

import { DEFAULT_REFRESH_MINUTES, parseGoogleSlidesLink, refreshMinuteOptions, slideDelayOptions } from "@/lib/googleSlides";

export const laundryStatusPage = defineType({
  name: "laundryStatusPage",
  title: "세탁현황",
  type: "document",
  fields: [
    defineField({ name: "title", title: "제목", type: "string", initialValue: "세탁현황" }),
    defineField({ name: "description", title: "설명", type: "text", rows: 2 }),
    defineField({
      name: "showNotice",
      title: "안내 배너 표시",
      type: "boolean",
      description: "슬라이드 위에 눈에 띄는 안내 배너를 보여줍니다. 끄면 배너가 사라집니다.",
      initialValue: true,
    }),
    defineField({
      name: "notice",
      title: "안내 배너 문구",
      type: "text",
      rows: 2,
      description: "비워두면 ‘현재 시범 운영 중으로, 천안아산점 세탁 현황만 제공됩니다.’가 표시됩니다.",
      hidden: ({ document }) => document?.showNotice === false,
    }),
    defineField({
      name: "slidesUrl",
      title: "구글 슬라이드 링크",
      type: "string",
      description:
        "구글 슬라이드 오른쪽 위 ‘공유’에서 일반 액세스를 ‘링크가 있는 모든 사용자(뷰어)’로 바꾼 뒤 ‘링크 복사’한 주소를 붙여넣으세요.",
      validation: (Rule) => Rule.required().custom((value) => parseGoogleSlidesLink(value).error || true),
    }),
    defineField({
      name: "autoAdvanceSeconds",
      title: "자동 넘김",
      type: "number",
      description: "여러 장일 때 지정한 간격으로 다음 슬라이드로 넘어갑니다.",
      options: {
        list: [
          { title: "사용 안 함", value: 0 },
          ...slideDelayOptions.map((seconds) => ({ title: `${seconds}초`, value: seconds })),
        ],
      },
      initialValue: 0,
    }),
    defineField({
      name: "refreshMinutes",
      title: "자동 새로고침 간격",
      type: "number",
      description: "슬라이드를 수정하면 이 간격 안에 사이트에 반영됩니다. 새로고침되면 첫 장부터 다시 보여줍니다.",
      options: { list: refreshMinuteOptions.map((minutes) => ({ title: `${minutes}분`, value: minutes })) },
      initialValue: DEFAULT_REFRESH_MINUTES,
    }),
  ],
  preview: { prepare: () => ({ title: "세탁현황" }) },
});
