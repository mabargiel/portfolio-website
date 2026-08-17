import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { cvFonts } from "@/fonts/cv";
import { routing } from "@/i18n/routing";
import "../../../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/cv/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cv" });

  // The <title> becomes the PDF's Title, which is what a reader sees in a
  // viewer tab and what some applicant tracking systems index first.
  return { title: t("documentTitle"), robots: { index: false, follow: false } };
}

export default async function CvLayout({
  children,
  params,
}: LayoutProps<"/cv/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <html lang={locale} className={cvFonts}>
      <body className="bg-cv-paper text-cv-ink font-cv-body">{children}</body>
    </html>
  );
}
