import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Write-capable client for server-only code (the contact API route, the
 * one-off seed script). Requires SANITY_API_WRITE_TOKEN — never expose this
 * token to the client, hence the `server-only` import guard above.
 */
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
