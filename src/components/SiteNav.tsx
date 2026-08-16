import { useTranslations } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";

const sections = ["about", "projects", "experience"] as const;

export function SiteNav({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");

  return (
    <nav className="border-line-soft bg-ink/90 sticky top-0 z-10 border-b backdrop-blur-[8px]">
      <div className="max-w-page mx-auto flex min-h-16 flex-wrap items-center justify-between gap-x-4 px-6">
        <a
          href="#top"
          className="text-label hidden font-mono font-medium md:inline"
        >
          mateusz<span className="text-gold">.</span>bargiel
        </a>

        <ul className="text-meta sm:text-label flex items-center gap-3.5 md:gap-6.5">
          {sections.map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className="text-text-2 hover:text-text block py-3 transition-colors"
              >
                {t(section)}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="text-gold hover:text-gold-lift block py-3 transition-colors"
            >
              {t("contact")}
            </a>
          </li>
        </ul>

        <ul
          aria-label={t("language")}
          className="text-meta ml-auto flex items-center gap-2 font-mono"
        >
          {routing.locales.map((option) => (
            <li key={option} className="flex items-center gap-2">
              <a
                href={`/${option}/`}
                hrefLang={option}
                aria-current={option === locale ? "true" : undefined}
                className={
                  option === locale
                    ? "text-gold block py-3 uppercase"
                    : "text-text-3 hover:text-text block py-3 uppercase transition-colors"
                }
              >
                {option}
              </a>
              {option !== routing.locales.at(-1) && (
                <span aria-hidden="true" className="text-line">
                  |
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
