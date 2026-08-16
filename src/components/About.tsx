import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Section } from "./Section";

type Row = { term: string; value: string; tone?: keyof typeof tones };

const tones = {
  gold: "text-gold",
  ok: "text-ok",
};

function strong(chunks: ReactNode) {
  return <strong className="text-text font-medium">{chunks}</strong>;
}

export function About() {
  const t = useTranslations("about");
  const datasheet: Row[] = t.raw("datasheet");

  return (
    <Section
      id="about"
      tag={t("tag")}
      title={t("title")}
      sub={t("sub")}
      note={t("note")}
    >
      <div className="grid items-start gap-11 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <div className="text-text-2 [&>p]:mb-4.5">
          <p className="text-lead text-text">{t("lede")}</p>
          <p>{t.rich("stack", { b: strong })}</p>
          <p>{t.rich("ai", { b: strong })}</p>

          <div className="border-gold bg-gold/6 my-5.5 flex items-baseline gap-3 border-l-2 px-4 py-3.5">
            <span className="text-meta text-gold shrink-0 font-mono">
              {t("reviewMark")}
            </span>
            <p className="text-text">{t("review")}</p>
          </div>

          <p>{t("closing")}</p>
        </div>

        <aside
          aria-labelledby="datasheet-heading"
          className="border-gold text-meta border-t-2 pt-1.5 font-mono"
        >
          <h3
            id="datasheet-heading"
            className="text-gold py-3 text-xs font-medium tracking-wide uppercase"
          >
            {t("datasheetTitle")}
          </h3>
          <dl>
            {datasheet.map(({ term, value, tone }) => (
              <div
                key={term}
                className="border-line flex items-baseline gap-2.5 border-b border-dotted py-1.75"
              >
                <dt className="text-text-3 whitespace-nowrap">{term}</dt>
                <span
                  aria-hidden="true"
                  className="border-line flex-1 -translate-y-1 border-b border-dotted"
                />
                <dd className={tone ? tones[tone] : "text-text"}>{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  );
}
