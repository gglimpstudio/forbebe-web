import { defineField, defineType } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "내비게이션",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "href", title: "Href", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
    defineField({ name: "isExternal", title: "External Link", type: "boolean", initialValue: false }),
  ],
});
