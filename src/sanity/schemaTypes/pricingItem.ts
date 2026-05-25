import { defineField, defineType } from "sanity";

export const pricingItem = defineType({
  name: "pricingItem",
  title: "가격",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "price", title: "Price", type: "number" }),
    defineField({ name: "priceText", title: "Price Text", type: "string", description: "예: 상담 후 안내" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
    defineField({ name: "cautions", title: "Cautions", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "isFeatured", title: "Featured", type: "boolean", initialValue: false }),
  ],
});
