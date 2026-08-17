import type { Metadata } from "next";
import { fonts } from "@/fonts/site";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Social card",
  robots: { index: false, follow: false },
};

export default function OgLayout({ children }: LayoutProps<"/og">) {
  return (
    <html lang="en" className={fonts}>
      <body>{children}</body>
    </html>
  );
}
