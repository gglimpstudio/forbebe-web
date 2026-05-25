import { defineField, defineType } from "sanity";

const caseImage = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
  });

export const cleaningCase = defineType({
  name: "cleaningCase",
  title: "세탁 사례",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "itemType", title: "Item Type", type: "string" }),
    defineField({ name: "branch", title: "Branch", type: "reference", to: [{ type: "branch" }] }),
    caseImage("beforeImage", "Before Image"),
    caseImage("afterImage", "After Image"),
    defineField({ name: "problemType", title: "Problem Type", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "isFeatured", title: "Featured", type: "boolean", initialValue: true }),
  ],
});
