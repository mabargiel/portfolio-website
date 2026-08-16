import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { routing } from "@/i18n/routing";
import { client } from "@/sanity/client";
import { experienceQuery, projectsQuery } from "@/sanity/queries";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const t = await getTranslations("nav");
  const [projects, roles] = await Promise.all([
    client.fetch(projectsQuery),
    client.fetch(experienceQuery),
  ]);

  return (
    <>
      <a
        href="#main"
        className="bg-gold text-ink sr-only rounded-md px-4 py-2 font-medium focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-20"
      >
        {t("skip")}
      </a>
      <SiteNav locale={locale} />
      <main id="main">
        <Hero />
        <About />
        <Projects projects={projects} locale={locale} />
        <Experience roles={roles} locale={locale} />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
