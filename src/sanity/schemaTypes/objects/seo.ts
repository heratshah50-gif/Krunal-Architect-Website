import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO Override",
  type: "object",
  description:
    "Optional overrides. Leave blank to use the automatic title/description generated from this page's own content.",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
});
