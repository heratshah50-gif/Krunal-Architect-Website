import { defineField, defineType } from "sanity";

export const inquiry = defineType({
  name: "inquiry",
  title: "Inquiry",
  type: "document",
  description:
    "Created automatically when someone submits the website's contact form. Update Status as you follow up.",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({ name: "phone", title: "Phone", type: "string", readOnly: true }),
    defineField({
      name: "projectType",
      title: "Project Type",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 5,
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["New", "Contacted", "Archived"],
        layout: "radio",
      },
      initialValue: "New",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "email", status: "status" },
    prepare({ title, subtitle, status }) {
      return { title, subtitle: `${subtitle} · ${status ?? "New"}` };
    },
  },
});
