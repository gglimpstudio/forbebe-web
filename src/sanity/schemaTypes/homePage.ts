import { ALL_FIELDS_GROUP, defineArrayMember, defineField, defineType } from "sanity";

const imageWithAlt = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "대체 텍스트",
        description: "이미지를 볼 수 없는 사용자와 검색 엔진을 위한 설명입니다.",
        type: "string",
      }),
    ],
  });

const cardMember = defineArrayMember({
  name: "homeCard",
  title: "카드",
  type: "object",
  fields: [
    defineField({ name: "title", title: "제목", type: "string" }),
    defineField({ name: "description", title: "설명", type: "text", rows: 3 }),
    defineField({ name: "icon", title: "아이콘 이름", description: "예: ShieldCheck, Sparkles. 없으면 기본 아이콘을 사용합니다.", type: "string" }),
    imageWithAlt("image", "이미지"),
  ],
  preview: {
    select: { title: "title", subtitle: "description", media: "image" },
  },
});

const visibilityField = defineField({
  name: "isVisible",
  title: "섹션 노출",
  description: "끄면 웹사이트에서 해당 섹션을 숨깁니다.",
  type: "boolean",
  initialValue: true,
});

const homePageGroups = [
  { ...ALL_FIELDS_GROUP, default: true },
  { name: "hero", title: "히어로" },
  { name: "intro", title: "소개" },
  { name: "necessity", title: "세탁 필요성" },
  { name: "slogan", title: "슬로건" },
  { name: "beforeAfter", title: "전후사진" },
  { name: "processSummary", title: "세탁과정" },
  { name: "finalCta", title: "마지막 CTA" },
  { name: "floatingCta", title: "플로팅 CTA" },
  { name: "footer", title: "푸터" },
];

export const homePage = defineType({
  name: "homePage",
  title: "홈페이지",
  type: "document",
  groups: homePageGroups,
  fields: [
    defineField({
      name: "hero",
      title: "히어로 섹션",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "eyebrow", title: "상단 라벨", type: "string" }),
        defineField({ name: "title", title: "제목", type: "text", rows: 2 }),
        defineField({ name: "highlightText", title: "강조 문구", description: "필요 시 제목 아래 강조 문구로 활용합니다.", type: "string" }),
        defineField({ name: "description", title: "설명", type: "text", rows: 3 }),
        imageWithAlt("backgroundImage", "배경 이미지"),
        defineField({ name: "primaryCtaLabel", title: "주요 CTA 문구", type: "string" }),
        defineField({ name: "primaryCtaHref", title: "주요 CTA 링크", type: "string" }),
        defineField({ name: "secondaryCtaLabel", title: "보조 CTA 문구", type: "string" }),
        defineField({ name: "secondaryCtaHref", title: "보조 CTA 링크", type: "string" }),
        visibilityField,
      ],
    }),
    defineField({
      name: "intro",
      title: "소개 섹션",
      type: "object",
      group: "intro",
      fields: [
        defineField({ name: "sectionLabel", title: "섹션 라벨", type: "string" }),
        defineField({ name: "title", title: "제목", type: "text", rows: 2 }),
        defineField({ name: "description", title: "설명", type: "text", rows: 4 }),
        imageWithAlt("image", "대표 이미지"),
        defineField({ name: "items", title: "소개 항목", type: "array", of: [cardMember] }),
        visibilityField,
      ],
    }),
    defineField({
      name: "necessity",
      title: "세탁 필요성 섹션",
      type: "object",
      group: "necessity",
      fields: [
        defineField({ name: "sectionLabel", title: "섹션 라벨", type: "string" }),
        defineField({ name: "title", title: "제목", type: "text", rows: 2 }),
        defineField({ name: "description", title: "설명", type: "text", rows: 4 }),
        defineField({ name: "cards", title: "오염 원인 카드", type: "array", of: [cardMember] }),
        defineField({ name: "signalsLabel", title: "추천 상황 라벨", type: "string" }),
        defineField({ name: "signalsTitle", title: "추천 상황 제목", type: "text", rows: 2 }),
        defineField({ name: "signals", title: "추천 상황 목록", type: "array", of: [defineArrayMember({ type: "string" })] }),
        visibilityField,
      ],
    }),
    defineField({
      name: "slogan",
      title: "슬로건 섹션",
      type: "object",
      group: "slogan",
      fields: [
        defineField({ name: "sectionLabel", title: "섹션 라벨", type: "string" }),
        defineField({
          name: "slogans",
          title: "슬로건 목록",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "text", title: "슬로건", type: "text", rows: 2 }),
                defineField({ name: "subText", title: "보조 문구", type: "text", rows: 2 }),
              ],
              preview: { select: { title: "text", subtitle: "subText" } },
            }),
          ],
        }),
        visibilityField,
      ],
    }),
    defineField({
      name: "beforeAfter",
      title: "전후사진 섹션",
      type: "object",
      group: "beforeAfter",
      fields: [
        defineField({ name: "sectionLabel", title: "섹션 라벨", type: "string" }),
        defineField({ name: "title", title: "제목", type: "text", rows: 2 }),
        defineField({ name: "description", title: "설명", type: "text", rows: 3 }),
        defineField({
          name: "items",
          title: "전후사진 항목",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                imageWithAlt("beforeImage", "Before 이미지"),
                imageWithAlt("afterImage", "After 이미지"),
                defineField({ name: "title", title: "제목", type: "string" }),
                defineField({ name: "description", title: "설명", type: "text", rows: 3 }),
              ],
              preview: { select: { title: "title", subtitle: "description", media: "afterImage" } },
            }),
          ],
        }),
        visibilityField,
      ],
    }),
    defineField({
      name: "processSummary",
      title: "세탁과정 요약 섹션",
      type: "object",
      group: "processSummary",
      fields: [
        defineField({ name: "sectionLabel", title: "섹션 라벨", type: "string" }),
        defineField({ name: "title", title: "제목", type: "text", rows: 2 }),
        defineField({ name: "description", title: "설명", type: "text", rows: 3 }),
        defineField({
          name: "steps",
          title: "세탁 단계",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "stepNumber", title: "단계 번호", description: "예: 01", type: "string" }),
                defineField({ name: "title", title: "제목", type: "string" }),
                defineField({ name: "description", title: "설명", type: "text", rows: 3 }),
                imageWithAlt("image", "이미지"),
              ],
              preview: { select: { title: "title", subtitle: "stepNumber", media: "image" } },
            }),
          ],
        }),
        defineField({ name: "note", title: "하단 안내 문구", type: "string" }),
        defineField({ name: "ctaLabel", title: "CTA 문구", type: "string" }),
        defineField({ name: "ctaHref", title: "CTA 링크", type: "string" }),
        visibilityField,
      ],
    }),
    defineField({
      name: "finalCta",
      title: "마지막 문의 / CTA 섹션",
      type: "object",
      group: "finalCta",
      fields: [
        defineField({ name: "label", title: "라벨", type: "string" }),
        defineField({ name: "title", title: "제목", type: "text", rows: 2 }),
        defineField({ name: "description", title: "설명", type: "text", rows: 3 }),
        defineField({ name: "primaryCtaLabel", title: "주요 CTA 문구", type: "string" }),
        defineField({ name: "primaryCtaHref", title: "주요 CTA 링크", type: "string" }),
        defineField({ name: "secondaryCtaLabel", title: "보조 CTA 문구", type: "string" }),
        defineField({ name: "secondaryCtaHref", title: "보조 CTA 링크", type: "string" }),
        defineField({ name: "note", title: "보조 안내문", type: "string" }),
        visibilityField,
      ],
    }),
    defineField({
      name: "footer",
      title: "푸터 섹션",
      type: "object",
      group: "footer",
      fields: [
        defineField({ name: "brandName", title: "브랜드명", type: "string" }),
        defineField({ name: "description", title: "설명", type: "text", rows: 3 }),
        defineField({
          name: "businessInfo",
          title: "사업자 정보",
          type: "object",
          fields: [
            defineField({ name: "companyName", title: "상호명", type: "string" }),
            defineField({ name: "representative", title: "대표자", type: "string" }),
            defineField({ name: "businessNumber", title: "사업자등록번호", type: "string" }),
            defineField({ name: "address", title: "주소", type: "string" }),
            defineField({ name: "phone", title: "전화번호", type: "string" }),
            defineField({ name: "email", title: "이메일", type: "string" }),
          ],
        }),
        defineField({ name: "copyright", title: "저작권 문구", type: "string" }),
      ],
    }),
    defineField({
      name: "floatingCta",
      title: "모바일 플로팅 CTA",
      type: "object",
      group: "floatingCta",
      fields: [
        defineField({
          name: "isVisible",
          title: "노출 여부",
          description: "끄면 모바일 하단 플로팅 CTA 전체를 숨깁니다.",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "emptyMessage",
          title: "지점 정보 없음 문구",
          type: "text",
          rows: 2,
          initialValue: "표시할 지점 정보가 없습니다. Sanity 지점 문서에 연락처와 링크를 입력해주세요.",
        }),
        defineField({
          name: "actions",
          title: "버튼 목록",
          description: "전화, 네이버예약, 카카오톡 버튼의 아이콘 이미지를 관리합니다. 실제 링크는 지점 문서에서 관리합니다.",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "actionType",
                  title: "버튼 동작",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                  options: {
                    list: [
                      { title: "전화", value: "phone" },
                      { title: "네이버예약", value: "booking" },
                      { title: "카카오톡", value: "kakao" },
                    ],
                    layout: "radio",
                  },
                }),
                imageWithAlt("iconImage", "아이콘 이미지", "비워두면 기본 아이콘을 사용합니다."),
                defineField({ name: "order", title: "정렬 순서", type: "number", initialValue: 0 }),
                defineField({ name: "isVisible", title: "노출 여부", type: "boolean", initialValue: true }),
              ],
              preview: {
                select: { subtitle: "actionType", media: "iconImage" },
                prepare: ({ subtitle, media }) => ({ title: "플로팅 CTA 버튼", subtitle, media }),
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "홈페이지" }),
  },
});
