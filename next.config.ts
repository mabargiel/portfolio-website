import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Appends a block to the repository's CLAUDE.md on every `next dev`.
  agentRules: false,
  // The default image loader throws under `output: 'export'`. Sizing and format
  // negotiation happen on Sanity's CDN instead.
  images: { unoptimized: true },
};

export default nextConfig;
