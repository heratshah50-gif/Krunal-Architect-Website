import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site";

// Search engines and AI assistants (GPTBot, ClaudeBot, PerplexityBot, …) are
// all welcome: being crawlable is what lets them recommend the studio.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
