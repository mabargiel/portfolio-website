// Inlined at build time. A build with no tag has no version, and says so by
// rendering the commit alone rather than a placeholder.
const version = process.env.NEXT_PUBLIC_APP_VERSION;
const commit = process.env.NEXT_PUBLIC_APP_COMMIT;

export function SiteFooter() {
  const build = [version, commit].filter(Boolean).join(" · ");

  return (
    <footer className="max-w-page text-meta text-text-3 mx-auto flex flex-wrap justify-between gap-4 px-6 pt-6 pb-9 font-mono">
      <span>© {new Date().getFullYear()} Mateusz Bargiel, Krakow</span>
      <span>{build || "no template used"}</span>
    </footer>
  );
}
