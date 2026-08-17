import { cvLabels, cvLocales } from "@/cv/locale";
import { CV_PDF } from "@/site";

export function CvDownload() {
  return (
    <details className="group relative">
      <summary className="border-line hover:border-gold text-label flex cursor-pointer list-none items-center gap-2 rounded-md border px-3.5 py-2 transition-colors [&::-webkit-details-marker]:hidden">
        <span className="sm:hidden">CV</span>
        <span className="hidden sm:inline">Download CV</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 10 6"
          className="text-text-3 w-2.5 transition-transform group-open:rotate-180"
        >
          <path
            d="M1 1L5 5L9 1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </summary>

      <ul className="border-line bg-base text-label absolute right-0 z-20 mt-2 min-w-[10rem] overflow-hidden rounded-md border py-1">
        {cvLocales.map((locale) => (
          <li key={locale}>
            <a
              href={CV_PDF[locale]}
              download
              hrefLang={locale}
              className="text-text-2 hover:bg-surface hover:text-text flex items-baseline justify-between gap-4 px-3.5 py-2 transition-colors"
            >
              {cvLabels[locale].language}
              <span className="text-text-3 text-meta font-mono uppercase">
                {locale}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
