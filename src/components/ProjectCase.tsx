import { imageSrc, imageSrcSet } from "@/sanity/image";
import type { ProjectsQueryResult } from "@/sanity/types";
import { ProjectDiagram } from "./ProjectDiagram";

type Project = ProjectsQueryResult[number];

export function ProjectCase({
  project,
  flip,
}: {
  project: Project;
  flip: boolean;
}) {
  const eyebrow = [project.kind.en, project.client, project.period.en]
    .filter(Boolean)
    .join(" · ");

  const shots = (project.images ?? []).flatMap((shot) =>
    shot.asset ? [{ id: shot.asset._id, alt: shot.alt.en }] : [],
  );
  const ratio = shots.length > 1 ? "aspect-[2.6/1]" : "aspect-[16/10]";

  const media = project.diagram ? (
    <ProjectDiagram name={project.diagram} />
  ) : shots.length > 0 ? (
    <div className="grid gap-3">
      {shots.map((shot) => (
        <figure
          key={shot.id}
          className={`border-line bg-base group overflow-hidden rounded-lg border ${ratio}`}
        >
          <img
            src={imageSrc(shot.id, 900)}
            srcSet={imageSrcSet(shot.id)}
            sizes="(min-width: 53.75rem) 45vw, 92vw"
            alt={shot.alt}
            loading="lazy"
            decoding="async"
            className="size-full object-cover brightness-[0.95] contrast-[1.04] saturate-[0.85] transition-[filter] duration-500 group-hover:brightness-100 group-hover:saturate-100"
          />
        </figure>
      ))}
    </div>
  ) : null;

  return (
    <article
      className={`border-line-soft reveal grid items-center gap-6 border-t py-11 first:border-t-0 first:pt-0 md:gap-13 ${
        media ? "md:grid-cols-[1.1fr_1fr]" : ""
      }`}
    >
      {media && <div className={flip ? "md:order-2" : undefined}>{media}</div>}

      <div>
        <span
          className={`mb-3 inline-block font-mono text-[11px] tracking-wide uppercase ${
            project.current ? "text-gold" : "text-rust"
          }`}
        >
          {eyebrow}
        </span>
        <h3 className="font-display text-h3 mb-3 leading-snug font-medium">
          {project.title.en}
        </h3>
        <p className="text-text-2 mb-4">{project.description.en}</p>
        <p className="border-gold text-text mb-4 border-l-2 pl-3.5">
          {project.outcome.en}
        </p>
        <p className="text-text-3 font-mono text-xs">
          {project.stack.join(" · ")}
        </p>
        {project.links && project.links.length > 0 && (
          <p className="text-meta mt-2.5 flex flex-wrap gap-x-4 font-mono">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:border-gold inline-block border-b border-transparent py-1"
              >
                {link.label}
              </a>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}
