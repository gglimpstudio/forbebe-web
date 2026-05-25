import { defineField, defineType } from "sanity";

export const processStep = defineType({
  name: "processStep",
  title: "세탁 과정",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
  ],
});
