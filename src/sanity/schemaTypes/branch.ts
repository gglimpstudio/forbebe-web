import { defineField, defineType } from "sanity";

export const branch = defineType({
  name: "branch",
  title: "지점",
  type: "document",
  fields: [
    defineField({ name: "name", title: "지점명", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "region",
      title: "지역",
      type: "string",
      options: {
        list: [
          { title: "충남", value: "충남" },
          { title: "인천", value: "인천" },
          { title: "경기도 북부", value: "경기도 북부" },
          { title: "경기도 남부", value: "경기도 남부" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "serviceArea", title: "서비스 권역", type: "string" }),
    defineField({ name: "address", title: "주소", type: "string" }),
    defineField({ name: "phone", title: "전화번호", type: "string" }),
    defineField({ name: "operatingHours", title: "운영 시간", type: "string" }),
    defineField({ name: "naverMapUrl", title: "네이버 지도 URL", type: "url" }),
    defineField({ name: "naverBookingUrl", title: "네이버예약 URL", type: "url" }),
    defineField({ name: "kakaoMapUrl", title: "카카오맵 URL", type: "url" }),
    defineField({ name: "kakaoUrl", title: "카카오톡 상담 URL", type: "url" }),
    defineField({ name: "blogUrl", title: "블로그 URL", type: "url" }),
    defineField({ name: "bookingUrl", title: "예약 URL", type: "url" }),
    defineField({ name: "description", title: "설명", type: "text" }),
    defineField({ name: "order", title: "정렬 순서", type: "number", initialValue: 0 }),
    defineField({ name: "isActive", title: "노출 여부", type: "boolean", initialValue: true }),
  ],
});
