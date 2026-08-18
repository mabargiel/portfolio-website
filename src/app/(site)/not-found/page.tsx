import { SiteNav } from "@/components/SiteNav";

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main id="main" className="max-w-page mx-auto px-6 py-24 md:py-32">
        <p className="text-meta text-text-3 font-mono select-none">
          &lt;404&gt;
        </p>
        <h1 className="font-display text-h1 mt-1.5 leading-tight font-medium tracking-tight">
          This page does not exist.
        </h1>
        <p className="text-text-2 text-lead mt-6 max-w-[52ch]">
          The link that brought you here points at something that is not on this
          site.
        </p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- under
            output: export every navigation is a document load, and Link puts the
            router in the shared chunk for one link on an error page. */}
        <a
          href="/"
          className="bg-gold hover:bg-gold-lift text-ink mt-9 inline-block rounded-md px-6.5 py-3.5 font-medium transition-colors"
        >
          Back to the start
        </a>
      </main>
    </>
  );
}
