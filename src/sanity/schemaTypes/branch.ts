import { defineField, defineType } from "sanity";

export const branch = defineType({
  name: "branch",
  title: "지점",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "region", title: "Region", type: "string", options: { list: ["서울", "경기", "인천", "충청", "경상", "전라", "기타"] } }),
    defineField({ name: "serviceArea", title: "Service Area", type: "string" }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "operatingHours", title: "Operating Hours", type: "string" }),
    defineField({ name: "naverMapUrl", title: "Naver Map URL", type: "url" }),
    defineField({ name: "kakaoMapUrl", title: "Kakao Map URL", type: "url" }),
    defineField({ name: "kakaoUrl", title: "Kakao URL", type: "url" }),
    defineField({ name: "blogUrl", title: "Blog URL", type: "url" }),
    defineField({ name: "bookingUrl", title: "Booking URL", type: "url" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
    defineField({ name: "isActive", title: "Active", type: "boolean", initialValue: true }),
  ],
});
