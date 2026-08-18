// Inlined at build time, so only a tagged build can carry a version.
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
