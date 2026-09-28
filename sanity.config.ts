import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schema } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

export default defineConfig({
  basePath: "/studio",
  name: "ks-architects",
  title: "KS Architects",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision lets a developer run raw GROQ queries from within Studio; harmless to leave in for debugging.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
