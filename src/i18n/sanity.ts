import type { Locale } from "./routing";

export type Localized = { en: string; pl: string | null };

export function pick(value: Localized, locale: Locale): string {
  return locale === "pl" ? (value.pl ?? value.en) : value.en;
}
