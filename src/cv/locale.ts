export const cvLocales = ["en", "pl"] as const;

export type CvLocale = (typeof cvLocales)[number];

export function isCvLocale(value: string): value is CvLocale {
  return (cvLocales as readonly string[]).includes(value);
}

export type Localized = { en: string; pl: string | null };

export function pick(value: Localized, locale: CvLocale): string {
  return locale === "pl" ? (value.pl ?? value.en) : value.en;
}

type Labels = {
  language: string;
  documentTitle: string;
  summary: string;
  experience: string;
  projects: string;
  skills: string;
  education: string;
  languages: string;
  present: string;
};

export const cvLabels: Record<CvLocale, Labels> = {
  en: {
    language: "English",
    documentTitle: "Mateusz Bargiel, full-stack engineer, CV",
    summary: "Summary",
    experience: "Experience",
    projects: "Selected projects",
    skills: "Skills",
    education: "Education",
    languages: "Languages",
    present: "present",
  },
  pl: {
    language: "Polski",
    documentTitle: "Mateusz Bargiel, full-stack engineer, CV",
    summary: "Podsumowanie",
    experience: "Doświadczenie",
    projects: "Wybrane projekty",
    skills: "Umiejętności",
    education: "Wykształcenie",
    languages: "Języki",
    present: "obecnie",
  },
};
