import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  description:
    "Each service appears as a card on the homepage and on the Services page. Delete a service to remove it from the website.",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Card Photo",
      type: "image",
      description: "Shown at the top of the service card on the homepage.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Short description of the photo, for accessibility and SEO.",
        }),
      ],
    }),
    defineField({
      name: "points",
      title: "What's Included",
      type: "array",
      description: "The bullet points listed on the service card.",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Shown on the Services page.",
    }),
    defineField({
      name: "icon",
      title: "Icon (Services page)",
      type: "string",
      options: {
        list: [
          { title: "Compass (Architecture)", value: "compass" },
          { title: "Scale (Valuation)", value: "scale" },
          { title: "Shield (Advisory)", value: "shield" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers show first.",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "shortDescription", media: "image" },
  },
});
