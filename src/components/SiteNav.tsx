import { CV_PDF } from "@/site";

const sections = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
];

export function SiteNav() {
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
          {sections.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-text-2 hover:text-text block py-3 transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="text-gold hover:text-gold-lift block py-3 transition-colors"
            >
              Contact
            </a>
          </li>
        </ul>

        <div className="border-line text-meta ml-auto flex items-center gap-2.5 rounded-md border px-3 py-1.5 font-mono">
          <span className="text-text-3">
            <span className="sm:hidden">CV</span>
            <span className="hidden sm:inline">Download CV</span>
          </span>
          <a
            href={CV_PDF.en}
            download
            hrefLang="en"
            aria-label="Download CV in English, PDF"
            className="text-gold hover:text-gold-lift py-1.5 transition-colors"
          >
            EN
          </a>
          <span aria-hidden="true" className="text-line">
            |
          </span>
          <a
            href={CV_PDF.pl}
            download
            hrefLang="pl"
            aria-label="Pobierz CV po polsku, PDF"
            className="text-text-3 hover:text-text py-1.5 transition-colors"
          >
            PL
          </a>
        </div>
      </div>
    </nav>
  );
}
