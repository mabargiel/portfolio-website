import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { client } from "@/sanity/client";
import { experienceQuery, projectsQuery } from "@/sanity/queries";

export default async function Home() {
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
