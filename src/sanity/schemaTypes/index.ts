import type { SchemaTypeDefinition } from "sanity";
import { seo } from "./objects/seo";
import { category } from "./documents/category";
import { project } from "./documents/project";
import { blogPost } from "./documents/blogPost";
import { service } from "./documents/service";
import { testimonial } from "./documents/testimonial";
import { inquiry } from "./documents/inquiry";
import { aboutPage } from "./singletons/aboutPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    seo,
    // Documents
    category,
    project,
    blogPost,
    service,
    testimonial,
    inquiry,
    // Singletons
    aboutPage,
  ],
};
