import { useTranslations } from "next-intl";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/site";
import { Section } from "./Section";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <Section
      id="contact"
      tag={t("tag")}
      title={t("title")}
      sub={t("sub")}
      note={t("note")}
    >
      <a
        href={`mailto:${EMAIL}`}
        className="font-display text-mail text-gold hover:border-gold reveal inline-block border-b-2 border-transparent font-medium transition-colors"
      >
        {EMAIL}
      </a>

      <ul className="text-meta text-text-3 reveal mt-10 flex flex-wrap gap-x-7 gap-y-2 font-mono">
        <li>
          <a
            href={GITHUB_URL}
            className="text-text-2 hover:text-gold transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/mabargiel
          </a>
        </li>
        <li>
          <a
            href={LINKEDIN_URL}
            className="text-text-2 hover:text-gold transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/mbargiel
          </a>
        </li>
        <li>{t("terms")}</li>
      </ul>
    </Section>
  );
}
