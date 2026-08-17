import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Appends a block to the repository's CLAUDE.md on every `next dev`.
  agentRules: false,
  // The default image loader throws under `output: 'export'`. Sizing and format
  // negotiation happen on Sanity's CDN instead.
  images: { unoptimized: true },
  // `/` is public/index.html. The export serves it directly; the dev server
  // only reaches it by filename, and would otherwise 404 on the bare domain.
  ...(process.env.NODE_ENV === "development" && {
    rewrites: async () => [{ source: "/", destination: "/index.html" }],
  }),
};

export default createNextIntlPlugin("./src/i18n/request.ts")(nextConfig);
