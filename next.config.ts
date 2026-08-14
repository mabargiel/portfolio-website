import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // The default image loader throws under `output: 'export'`. A Sanity CDN
  // loader replaces this once there are real images to serve.
  images: { unoptimized: true },
};

export default nextConfig;
