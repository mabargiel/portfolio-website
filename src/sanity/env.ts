function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing ${name}. Content is fetched at build time, so the build cannot continue without it. See .env.local.example.`,
    );
  }
  return value;
}

export const projectId = required(
  "SANITY_PROJECT_ID",
  process.env.SANITY_PROJECT_ID,
);
export const dataset = required("SANITY_DATASET", process.env.SANITY_DATASET);
export const apiVersion = process.env.SANITY_API_VERSION ?? "2026-08-16";
