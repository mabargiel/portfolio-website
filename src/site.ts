export const EMAIL = "me@mbargiel.dev";
export const GITHUB_URL = "https://github.com/mabargiel";
export const LINKEDIN_URL = "https://www.linkedin.com/in/mbargiel/";

export const CV_PDF = {
  en: "/cv/mateusz-bargiel-cv-en.pdf",
  pl: "/cv/mateusz-bargiel-cv-pl.pdf",
} as const;

// Absolute URLs are required by Open Graph consumers: WhatsApp, LinkedIn and
// Slack will not resolve a relative image.
export const SITE_URL = process.env.SITE_URL ?? "https://mbargiel.dev";

// Public identifier, visible in the page source. Cloudflare Web Analytics is
// cookieless and stores no personal data, so the site needs no consent banner.
export const CF_ANALYTICS_TOKEN = "7ea10b22605f412aabdcb51ac05b6882";
