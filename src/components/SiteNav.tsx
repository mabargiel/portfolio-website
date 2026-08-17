import { CvDownload } from "./CvDownload";

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

        <div className="ml-auto">
          <CvDownload />
        </div>
      </div>
    </nav>
  );
}
