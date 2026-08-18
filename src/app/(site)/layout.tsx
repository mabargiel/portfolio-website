import type { Metadata } from "next";
import { PageMotion } from "@/components/PageMotion";
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

// The class has to exist before the first paint, or every reveal flashes in
// and then hides. useEffect runs after hydration, which is too late for that.
const markReveals = "document.documentElement.classList.add('reveals')";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fonts}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: markReveals }} />
        {children}
        <PageMotion />
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
