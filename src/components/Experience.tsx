import { useTranslations } from "next-intl";
import { pick } from "@/i18n/sanity";
import type { Locale } from "@/i18n/routing";
import type { ExperienceQueryResult } from "@/sanity/types";
import { Section } from "./Section";

export function Experience({
  roles,
  locale,
}: {
  roles: ExperienceQueryResult;
  locale: Locale;
}) {
  const t = useTranslations("experience");
  if (roles.length === 0) return null;

  return (
    <Section
      id="experience"
      tag={t("tag")}
      title={t("title")}
      sub={t("sub")}
      note={t("note")}
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
              {pick(role.dateLabel, locale)}
              {role.current && <span className="text-ok"> → {t("now")}</span>}
            </p>
            <h3 className="font-display mt-1.5 text-[1.3125rem] leading-snug font-medium">
              {pick(role.role, locale)}
            </h3>
            <p className="text-gold text-label font-mono">{role.org}</p>
            <p className="text-text-2 mt-2.5 max-w-[620px]">
              {pick(role.description, locale)}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
