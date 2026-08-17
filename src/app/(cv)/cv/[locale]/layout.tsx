import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cvLabels, cvLocales, isCvLocale } from "@/cv/locale";
import { cvFonts } from "@/fonts/cv";
import "../../../globals.css";

export function generateStaticParams() {
  return cvLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/cv/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isCvLocale(locale)) return {};

  // The <title> becomes the PDF's Title, which is what a reader sees in a
  // viewer tab and what some applicant tracking systems index first.
  return {
    title: cvLabels[locale].documentTitle,
    robots: { index: false, follow: false },
  };
}

export default async function CvLayout({
  children,
  params,
}: LayoutProps<"/cv/[locale]">) {
  const { locale } = await params;
  if (!isCvLocale(locale)) notFound();

  return (
    <html lang={locale} className={cvFonts}>
      <body className="bg-cv-paper text-cv-ink font-cv-body">{children}</body>
    </html>
  );
}
