import type { Metadata } from "next";
import { fonts } from "@/fonts/site";
import { SITE_URL } from "@/site";
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

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fonts}>
      <body>{children}</body>
    </html>
  );
}
