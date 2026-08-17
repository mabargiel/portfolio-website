import { defineRouting } from "next-intl/routing";

// The site is English only. These locales exist for the downloadable CV, which
// is rendered as a page per language and printed to PDF at build time.
export const routing = defineRouting({
  locales: ["en", "pl"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
