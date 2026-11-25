import type { ExperienceQueryResult } from "@/sanity/types";
import { Section } from "./Section";

const groups = [
  { engagement: "contract", heading: "Contracts and employment" },
  { engagement: "independent", heading: "Independent engagements" },
] as const;

export function Experience({ roles }: { roles: ExperienceQueryResult }) {
  if (roles.length === 0) return null;

  const grouped = groups.map(({ engagement, heading }) => ({
    heading,
    entries: roles.filter((role) => role.engagement === engagement),
  }));

  const placed = grouped.reduce(
    (count, group) => count + group.entries.length,
    0,
  );
  if (placed !== roles.length) {
    throw new Error(
      "An experience document has no engagement type, so it would vanish from the page.",
    );
  }

  return (
    <Section
      id="experience"
      tag="experience"
      title="Track record"
      sub="Contracts first, then what ran alongside them."
      note="// git log --oneline"
    >
      <div className="max-w-[780px]">
        {grouped.map(({ heading, entries }) =>
          entries.length === 0 ? null : (
            <section key={heading} className="mt-14 first:mt-0">
              <h3 className="text-meta text-text-3 reveal mb-7 font-mono tracking-[0.04em] uppercase">
                {heading}
              </h3>
              <ol>
                {entries.map((role) => (
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
                    <h4 className="font-display mt-1.5 text-[1.3125rem] leading-snug font-medium">
                      {role.role.en}
                    </h4>
                    <p className="text-gold text-label font-mono">{role.org}</p>
                    <p className="text-text-2 mt-2.5 max-w-[620px]">
                      {role.description.en}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          ),
        )}
      </div>
    </Section>
  );
}
