import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", validation: (Rule) => Rule.required() }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
    defineField({ name: "isFeatured", title: "Featured", type: "boolean", initialValue: true }),
  ],
});
