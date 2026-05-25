import { defineField, defineType } from "sanity";

const imageWithAlt = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "대체 텍스트", type: "string" })],
  });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "사이트 설정",
  type: "document",
  fields: [
    defineField({ name: "title", title: "사이트 이름", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "사이트 설명", type: "text" }),
    imageWithAlt("logo", "기본 로고"),
    imageWithAlt("headerLogo", "글로벌 헤더 로고"),
    imageWithAlt("footerLogo", "푸터 로고"),
    imageWithAlt("favicon", "파비콘"),
    imageWithAlt("ogImage", "공유 이미지"),
    defineField({ name: "phone", title: "대표 전화번호", type: "string" }),
    defineField({ name: "kakaoUrl", title: "카카오톡 채널 URL", type: "url" }),
    defineField({ name: "blogUrl", title: "블로그 URL", type: "url" }),
    defineField({ name: "instagramUrl", title: "인스타그램 URL", type: "url" }),
    defineField({ name: "businessInfo", title: "사업자 정보", type: "text" }),
    defineField({ name: "footerText", title: "푸터 문구", type: "text" }),
    defineField({ name: "defaultSeoTitle", title: "기본 SEO 제목", type: "string" }),
    defineField({ name: "defaultSeoDescription", title: "기본 SEO 설명", type: "text" }),
  ],
});
