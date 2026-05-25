import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "서비스",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text", rows: 2 }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "icon", title: "Icon", type: "string", description: "Lucide icon name placeholder" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
    defineField({ name: "isFeatured", title: "Featured", type: "boolean", initialValue: true }),
    defineField({ name: "carePoints", title: "Care Points", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "cautions", title: "Cautions", type: "array", of: [{ type: "string" }] }),
  ],
});
