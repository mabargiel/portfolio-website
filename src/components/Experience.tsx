import type { ExperienceQueryResult } from "@/sanity/types";
import { Section } from "./Section";

export function Experience({ roles }: { roles: ExperienceQueryResult }) {
  if (roles.length === 0) return null;

  return (
    <Section
      id="experience"
      tag="experience"
      title="Track record"
      sub="Roles and engagements, newest first."
      note="// git log --oneline"
    >
      <ol className="max-w-[780px]">
        {roles.map((role) => (
          <li
            key={role._id}
            className="border-line reveal relative border-l pb-11 pl-9 last:pb-1"
          >
            <span
              aria-hidden="true"
              className={`border-gold absolute top-1.5 -left-[5px] size-2.25 rounded-full border-2 ${
                role.current ? "bg-gold animate-breathe" : "bg-ink"
              }`}
            />
            <p className="text-text-3 text-meta font-mono tracking-[0.04em]">
              {role.dateLabel.en}
              {role.current && <span className="text-ok"> → now</span>}
            </p>
            <h3 className="font-display mt-1.5 text-[1.3125rem] leading-snug font-medium">
              {role.role.en}
            </h3>
            <p className="text-gold text-label font-mono">{role.org}</p>
            <p className="text-text-2 mt-2.5 max-w-[620px]">
              {role.description.en}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
