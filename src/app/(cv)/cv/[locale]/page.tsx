import { notFound } from "next/navigation";
import { CvSection } from "@/components/cv/CvSection";
import {
  cvLabels,
  type CvLocale,
  isCvLocale,
  type Localized,
  pick,
} from "@/cv/locale";
import { client } from "@/sanity/client";
import { cvQuery } from "@/sanity/queries";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/site";

// Date parsers expect a dash between the ends of a range. The site renders an
// arrow, which they read as part of the month.
function dateRange(
  role: { dateLabel: Localized; current: boolean | null },
  locale: CvLocale,
  present: string,
) {
  const label = pick(role.dateLabel, locale).replace("→", "–");
  return role.current ? `${label} – ${present}` : label;
}

export default async function Cv({ params }: PageProps<"/cv/[locale]">) {
  const { locale } = await params;
  if (!isCvLocale(locale)) notFound();

  const t = cvLabels[locale];
  const { profile, roles, projects } = await client.fetch(cvQuery);

  const contact = [
    EMAIL,
    profile && pick(profile.location, locale),
    GITHUB_URL.replace("https://", ""),
    LINKEDIN_URL.replace("https://www.", "").replace(/\/$/, ""),
  ].filter(Boolean);

  return (
    <main className="mx-auto max-w-[210mm] px-[15mm] py-[14mm] text-[9.5pt] leading-[1.45]">
      <header className="border-cv-rule border-b pb-4">
        <h1 className="font-cv-display text-[26pt] leading-none font-medium tracking-tight">
          Mateusz Bargiel
        </h1>
        {profile && (
          <p className="text-cv-accent mt-1.5 text-[11pt]">
            {pick(profile.headline, locale)}
          </p>
        )}
        <p className="text-cv-muted mt-2.5 text-[8.5pt]">
          {contact.join("  ·  ")}
        </p>
      </header>

      {profile && (
        <CvSection title={t.summary}>
          <p>{pick(profile.summary, locale)}</p>
        </CvSection>
      )}

      {roles.length > 0 && (
        <CvSection title={t.experience}>
          {roles.map((role) => (
            <article key={role._id} className="mb-3.5 break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[11pt] font-medium">
                  {pick(role.role, locale)}
                  <span className="text-cv-accent">, {role.org}</span>
                </h3>
                <p className="text-cv-muted text-[8.5pt] whitespace-nowrap">
                  {dateRange(role, locale, t.present)}
                  {role.location && ` · ${role.location}`}
                </p>
              </div>

              {role.bullets && role.bullets.length > 0 ? (
                <ul className="marker:text-cv-rule mt-1.5 list-disc space-y-1 pl-4">
                  {role.bullets.map((bullet) => (
                    <li key={bullet.en}>{pick(bullet, locale)}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1">{pick(role.description, locale)}</p>
              )}
            </article>
          ))}
        </CvSection>
      )}

      {projects.length > 0 && (
        <CvSection title={t.projects}>
          {projects.map((project) => (
            <article key={project._id} className="mb-3 break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[10.5pt] font-medium">
                  {pick(project.title, locale)}
                </h3>
                <p className="text-cv-muted text-[8.5pt] whitespace-nowrap">
                  {[pick(project.kind, locale), project.client]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              <p className="mt-1">{pick(project.outcome, locale)}</p>
              <p className="text-cv-muted mt-1 text-[8.5pt]">
                {project.stack.join(", ")}
              </p>
            </article>
          ))}
        </CvSection>
      )}

      {profile?.skills && profile.skills.length > 0 && (
        <CvSection title={t.skills}>
          {profile.skills.map((group) => (
            <p key={group.category?.en} className="mb-1">
              <span className="font-medium">
                {group.category && pick(group.category, locale)}:
              </span>{" "}
              {(group.items ?? []).join(", ")}
            </p>
          ))}
        </CvSection>
      )}

      {profile?.education && profile.education.length > 0 && (
        <CvSection title={t.education}>
          {profile.education.map((entry) => (
            <div
              key={`${entry.school}${entry.period}`}
              className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4"
            >
              <p>
                <span className="font-medium">
                  {entry.qualification && pick(entry.qualification, locale)}
                </span>
                {entry.school && `, ${entry.school}`}
              </p>
              <p className="text-cv-muted text-[8.5pt] whitespace-nowrap">
                {entry.period}
              </p>
            </div>
          ))}
        </CvSection>
      )}

      {profile?.languages && profile.languages.length > 0 && (
        <CvSection title={t.languages}>
          <p>
            {profile.languages
              .map((entry) =>
                [
                  entry.name && pick(entry.name, locale),
                  entry.level && pick(entry.level, locale),
                ]
                  .filter(Boolean)
                  .join(" - "),
              )
              .join(" · ")}
          </p>
        </CvSection>
      )}
    </main>
  );
}
