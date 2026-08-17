import type { ProjectsQueryResult } from "@/sanity/types";
import { ProjectCase } from "./ProjectCase";
import { Section } from "./Section";

export function Projects({ projects }: { projects: ProjectsQueryResult }) {
  if (projects.length === 0) return null;

  return (
    <Section
      id="projects"
      tag="projects"
      title="Selected work"
      sub={`${projects.length} engagements, current priorities first.`}
      note="// some details under NDA"
    >
      {projects.map((project, index) => (
        <ProjectCase
          key={project._id}
          project={project}
          flip={index % 2 === 1}
        />
      ))}
    </Section>
  );
}
