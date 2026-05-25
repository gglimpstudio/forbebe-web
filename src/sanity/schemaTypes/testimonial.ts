import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "후기",
  type: "document",
  fields: [
    defineField({ name: "content", title: "Content", type: "text", validation: (Rule) => Rule.required() }),
    defineField({ name: "customerName", title: "Customer Name", type: "string" }),
    defineField({ name: "itemType", title: "Item Type", type: "string" }),
    defineField({ name: "branchName", title: "Branch Name", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
    defineField({ name: "isFeatured", title: "Featured", type: "boolean", initialValue: true }),
  ],
});
