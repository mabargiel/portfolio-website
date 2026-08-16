import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="max-w-page text-meta text-text-3 mx-auto flex flex-wrap justify-between gap-4 px-6 pt-6 pb-9 font-mono">
      <span>{t("copyright", { year: new Date().getFullYear() })}</span>
      <span>{t("note")}</span>
    </footer>
  );
}
