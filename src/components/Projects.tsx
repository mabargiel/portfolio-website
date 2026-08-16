import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { ProjectsQueryResult } from "@/sanity/types";
import { ProjectCase } from "./ProjectCase";
import { Section } from "./Section";

export function Projects({
  projects,
  locale,
}: {
  projects: ProjectsQueryResult;
  locale: Locale;
}) {
  const t = useTranslations("projects");
  if (projects.length === 0) return null;

  return (
    <Section
      id="projects"
      tag={t("tag")}
      title={t("title")}
      sub={t("sub", { count: projects.length })}
      note={t("note")}
    >
      {projects.map((project, index) => (
        <ProjectCase
          key={project._id}
          project={project}
          locale={locale}
          flip={index % 2 === 1}
        />
      ))}
    </Section>
  );
}
