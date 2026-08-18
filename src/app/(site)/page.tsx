import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { client } from "@/sanity/client";
import { experienceQuery, projectsQuery } from "@/sanity/queries";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_URL } from "@/site";

export default async function Home() {
  const [projects, roles] = await Promise.all([
    client.fetch(projectsQuery),
    client.fetch(experienceQuery),
  ]);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mateusz Bargiel",
    jobTitle: "Full-stack engineer",
    url: SITE_URL,
    email: `mailto:${EMAIL}`,
    sameAs: [GITHUB_URL, LINKEDIN_URL],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Krakow",
      addressCountry: "PL",
    },
    knowsAbout: roles.flatMap((role) => role.org),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <a
        href="#main"
        className="bg-gold text-ink sr-only rounded-md font-medium focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-20 focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main">
        <Hero />
        <About />
        <Projects projects={projects} />
        <Experience roles={roles} />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
