export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder-project-id";

/**
 * True once a real Sanity project has been configured. While this is false
 * (i.e. during local development before the client sets up their Sanity
 * account, per the project plan), query helpers in `sanity/lib/queries.ts`
 * fall back to the static placeholder content in `src/lib/data/`.
 */
export const isSanityConfigured =
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "placeholder-project-id";
