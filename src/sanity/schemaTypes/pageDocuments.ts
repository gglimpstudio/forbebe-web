import { defineArrayMember, defineField, defineType } from "sanity";

const imageWithAlt = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "대체 텍스트", type: "string" })],
  });

const pageHeroField = defineField({
  name: "hero",
  title: "상단 소개 영역",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "영문/상단 라벨", type: "string" }),
    defineField({ name: "title", title: "제목", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "설명", type: "text", rows: 3 }),
    imageWithAlt("image", "대표 이미지"),
  ],
});

const finalCtaField = defineField({
  name: "finalCta",
  title: "하단 문의 CTA",
  type: "object",
  fields: [
    defineField({ name: "isVisible", title: "노출 여부", type: "boolean", initialValue: true }),
    defineField({ name: "title", title: "제목", type: "text", rows: 2 }),
    defineField({ name: "description", title: "설명", type: "text", rows: 2 }),
    defineField({ name: "primaryCtaLabel", title: "주요 버튼 문구", type: "string" }),
    defineField({ name: "primaryCtaHref", title: "주요 버튼 링크", type: "string" }),
    defineField({ name: "secondaryCtaLabel", title: "보조 버튼 문구", type: "string" }),
    defineField({ name: "secondaryCtaHref", title: "보조 버튼 링크", type: "string" }),
  ],
});

const sectionHeaderField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "object",
    fields: [
      defineField({ name: "isVisible", title: "노출 여부", type: "boolean", initialValue: true }),
      defineField({ name: "eyebrow", title: "영문/상단 라벨", type: "string" }),
      defineField({ name: "title", title: "제목", type: "text", rows: 2 }),
      defineField({ name: "description", title: "설명", type: "text", rows: 3 }),
    ],
  });

const cardMember = defineArrayMember({
  name: "contentCard",
  title: "카드",
  type: "object",
  fields: [
    defineField({ name: "title", title: "제목", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "설명", type: "text", rows: 3 }),
    defineField({ name: "icon", title: "아이콘 이름", description: "예: ShieldCheck, Sparkles, MapPinned", type: "string" }),
    imageWithAlt("image", "이미지"),
  ],
  preview: { select: { title: "title", subtitle: "description", media: "image" } },
});

const singletonPreview = (title: string) => ({
  prepare: () => ({ title }),
});

export const servicesPage = defineType({
  name: "servicesPage",
  title: "서비스 페이지",
  type: "document",
  fields: [
    pageHeroField,
    defineField({
      name: "reservationNote",
      title: "예약 전 확인사항",
      type: "object",
      fields: [
        defineField({ name: "title", title: "제목", type: "string" }),
        defineField({ name: "description", title: "설명", type: "text", rows: 3 }),
        defineField({ name: "ctaLabel", title: "버튼 문구", type: "string" }),
        defineField({ name: "ctaHref", title: "버튼 링크", type: "string" }),
      ],
    }),
    finalCtaField,
  ],
  preview: singletonPreview("서비스 페이지"),
});

export const processPage = defineType({
  name: "processPage",
  title: "세탁 과정 페이지",
  type: "document",
  fields: [
    pageHeroField,
    defineField({
      name: "coreCareItems",
      title: "한눈에 보는 세탁 과정 카드",
      description: "세탁 과정 페이지 상단의 6개 대표 과정 카드입니다. 이미지를 넣으면 사이트에 사진으로 표시됩니다.",
      type: "array",
      of: [cardMember],
      validation: (Rule) => Rule.max(6).warning("권장 개수는 6개입니다."),
    }),
    sectionHeaderField("detailSection", "세부 진행 순서 섹션", "세부 진행 순서 영역의 라벨, 제목, 설명과 노출 여부를 관리합니다."),
    finalCtaField,
  ],
  preview: singletonPreview("세탁 과정 페이지"),
});

export const pricingPage = defineType({
  name: "pricingPage",
  title: "가격 안내 페이지",
  type: "document",
  fields: [
    pageHeroField,
    imageWithAlt("priceImage", "가격표 이미지", "현재 사이트의 가격표 영역에 표시할 이미지입니다."),
    defineField({ name: "note", title: "가격표 하단 안내문", type: "text", rows: 2 }),
  ],
  preview: singletonPreview("가격 안내 페이지"),
});

export const branchesPage = defineType({
  name: "branchesPage",
  title: "지점 안내 페이지",
  type: "document",
  fields: [
    pageHeroField,
    defineField({
      name: "summary",
      title: "상단 요약 카드",
      type: "object",
      fields: [
        defineField({ name: "label", title: "라벨", type: "string" }),
        defineField({ name: "title", title: "제목", type: "string" }),
        defineField({ name: "description", title: "설명", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "finder",
      title: "지점 찾기 영역",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "상단 라벨", type: "string" }),
        defineField({ name: "title", title: "제목", type: "string" }),
        defineField({ name: "description", title: "설명", type: "text", rows: 2 }),
      ],
    }),
    finalCtaField,
  ],
  preview: singletonPreview("지점 안내 페이지"),
});

export const casesPage = defineType({
  name: "casesPage",
  title: "세탁 사례 페이지",
  type: "document",
  fields: [pageHeroField, finalCtaField],
  preview: singletonPreview("세탁 사례 페이지"),
});

export const faqPage = defineType({
  name: "faqPage",
  title: "FAQ 페이지",
  type: "document",
  fields: [pageHeroField, finalCtaField],
  preview: singletonPreview("FAQ 페이지"),
});

export const whyForbebePage = defineType({
  name: "whyForbebePage",
  title: "왜 포베베인가 페이지",
  type: "document",
  fields: [
    pageHeroField,
    defineField({ name: "strengths", title: "강점 카드", type: "array", of: [cardMember] }),
    defineField({
      name: "branchCta",
      title: "지점 상담 안내 영역",
      type: "object",
      fields: [
        defineField({ name: "title", title: "제목", type: "string" }),
        defineField({ name: "description", title: "설명", type: "text", rows: 3 }),
        defineField({ name: "primaryCtaLabel", title: "주요 버튼 문구", type: "string" }),
        defineField({ name: "primaryCtaHref", title: "주요 버튼 링크", type: "string" }),
        defineField({ name: "secondaryCtaLabel", title: "보조 버튼 문구", type: "string" }),
        defineField({ name: "secondaryCtaHref", title: "보조 버튼 링크", type: "string" }),
      ],
    }),
    finalCtaField,
  ],
  preview: singletonPreview("왜 포베베인가 페이지"),
});

export const franchisePage = defineType({
  name: "franchisePage",
  title: "창업문의 페이지",
  type: "document",
  fields: [
    pageHeroField,
    defineField({ name: "benefits", title: "창업 안내 카드", type: "array", of: [cardMember] }),
    defineField({
      name: "notice",
      title: "문의 폼 옆 안내문",
      type: "object",
      fields: [
        defineField({ name: "title", title: "제목", type: "string" }),
        defineField({ name: "description", title: "설명", type: "text", rows: 3 }),
      ],
    }),
    defineField({ name: "formTitle", title: "폼 제목", type: "string" }),
  ],
  preview: singletonPreview("창업문의 페이지"),
});

export const partnershipPage = defineType({
  name: "partnershipPage",
  title: "제휴문의 페이지",
  type: "document",
  fields: [
    pageHeroField,
    defineField({ name: "partnershipTypes", title: "제휴 유형 카드", type: "array", of: [cardMember] }),
    defineField({ name: "formTitle", title: "폼 제목", type: "string" }),
  ],
  preview: singletonPreview("제휴문의 페이지"),
});
