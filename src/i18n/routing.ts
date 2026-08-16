import { defineRouting } from "next-intl/routing";

// A static export has no server to negotiate on, so the prefix is always
// present and `/` is a client-side redirect. See public/index.html.
export const routing = defineRouting({
  locales: ["en", "pl"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
