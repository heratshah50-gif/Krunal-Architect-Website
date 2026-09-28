import type { StructureResolver } from "sanity/structure";

/**
 * Custom Studio navigation for a non-technical editor (Krunal): singletons
 * are pinned as direct-edit items instead of a list-of-one, and Inquiries
 * gets its own view sorted newest-first instead of the default alphabetical
 * document list.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("About Page")
        .child(
          S.document().schemaType("aboutPage").documentId("aboutPage")
        ),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("category").title("Project Categories"),
      S.documentTypeListItem("blogPost").title("Journal Posts"),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.divider(),
      S.listItem()
        .title("Inquiries")
        .child(
          S.documentTypeList("inquiry")
            .title("Inquiries")
            .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
        ),
    ]);
