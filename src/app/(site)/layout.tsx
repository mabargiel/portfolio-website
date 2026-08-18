import type { Metadata } from "next";
import { fonts } from "@/fonts/site";
import { CF_ANALYTICS_TOKEN, SITE_URL } from "@/site";
import "../globals.css";

const title = "Mateusz Bargiel, full-stack engineer";
const description =
  "Full-stack B2B contractor. React, .NET, Azure, DevOps. 12+ years shipping production systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: title,
    title,
    description,
    locale: "en_GB",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Mateusz Bargiel, full-stack engineer who ships, not just codes",
      },
    ],
  },
  twitter: { card: "summary_large_image", title, description },
};

// Hides before paint, so nothing flashes in and then out. Without this script
// the reveal class does nothing and every section is simply visible.
const revealScript = `
if (window.IntersectionObserver && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('reveals');
  addEventListener('DOMContentLoaded', function () {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('reveal-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -15% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  });
}
`;

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fonts}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
        {children}
        <script
          async
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${CF_ANALYTICS_TOKEN}"}`}
        />
      </body>
    </html>
  );
}
