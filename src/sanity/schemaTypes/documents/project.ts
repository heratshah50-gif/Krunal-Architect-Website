import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Photos" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "content",
      description: 'e.g. "Ahmedabad, Gujarat"',
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "area",
      title: "Area",
      type: "string",
      group: "content",
      description: 'e.g. "3,200 sq ft"',
    }),
    defineField({
      name: "excerpt",
      title: "Short Summary",
      type: "text",
      rows: 3,
      group: "content",
      description: "Shown on project cards and used as a fallback meta description.",
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: "body",
      title: "Full Description",
      type: "array",
      group: "content",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "mainImage",
      title: "Main Photo",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Additional Photos",
      type: "array",
      group: "media",
      description: 'Shown under "More from this project" and on the project page.',
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Show on Homepage",
      type: "boolean",
      group: "content",
      description:
        'Tick to feature this project in the homepage "Selected Built Projects" grid. If none are ticked, the 4 newest projects are shown.',
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "mainImage" },
  },
});
