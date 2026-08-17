import type { Metadata } from "next";
import { fonts } from "@/fonts/site";
import "../globals.css";

export const metadata: Metadata = {
  title: "Mateusz Bargiel, full-stack engineer",
  description:
    "Full-stack B2B contractor. React, .NET, Azure, DevOps. 12+ years shipping production systems.",
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fonts}>
      <body>{children}</body>
    </html>
  );
}
