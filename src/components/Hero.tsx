import { EMAIL } from "@/site";

const portraitMask =
  "linear-gradient(to bottom, #000 90%, transparent 100%)" as const;

export function Hero() {
  return (
    <header id="top" className="border-line-soft border-b">
      <div className="max-w-page mx-auto grid gap-11 px-6 py-18 md:grid-cols-[1.35fr_1fr] md:items-center md:gap-15 md:py-22">
        <div>
          <p className="text-label text-text-2 animate-settle mb-5 font-mono">
            <span className="text-gold">~/mateusz-bargiel</span> $ whoami
          </p>
          <h1 className="font-display text-h1 animate-settle leading-tight font-medium tracking-tight [animation-delay:80ms]">
            Full-stack engineer who <em className="text-gold">ships</em>, not
            just codes.
          </h1>
          <p className="text-text-2 text-lead animate-settle mt-6 mb-9 max-w-[520px] [animation-delay:160ms]">
            <strong className="text-text font-medium">
              React, .NET, Azure, DevOps.
            </strong>{" "}
            Twelve years of production systems. AI does my boilerplate. I do the
            thinking.
          </p>

          <div className="animate-settle flex flex-wrap gap-3.5 [animation-delay:240ms]">
            <a
              href="#projects"
              className="bg-gold hover:bg-gold-lift text-ink rounded-md px-6.5 py-3.5 font-medium transition-colors"
            >
              See the work
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="border-line hover:border-gold rounded-md border px-6.5 py-3.5 font-medium transition-colors"
            >
              Email me
            </a>
          </div>

          <ul className="text-meta text-text-3 animate-settle mt-14 flex flex-wrap gap-x-7.5 gap-y-2 font-mono [animation-delay:320ms]">
            <li>
              <span
                aria-hidden="true"
                className="bg-ok animate-breathe mr-2 inline-block size-1.75 rounded-full align-middle"
              />
              <span className="text-text-2">open for contracts</span>
            </li>
            <li>
              base: <span className="text-text-2">Krakow / remote EU</span>
            </li>
            <li>
              since: <span className="text-text-2">2014</span>
            </li>
          </ul>
        </div>

        <figure className="animate-settle mx-auto w-full max-w-[420px] [animation-delay:120ms] md:max-w-none">
          <img
            src="/portrait.webp"
            srcSet="/portrait-500.webp 500w, /portrait-700.webp 700w, /portrait.webp 900w"
            sizes="(min-width: 53.75rem) 34vw, min(420px, 100vw - 3rem)"
            alt="Mateusz Bargiel"
            width={900}
            height={1089}
            fetchPriority="high"
            className="h-auto w-full brightness-[0.95] contrast-[1.04] grayscale"
            style={{ maskImage: portraitMask, WebkitMaskImage: portraitMask }}
          />
        </figure>
      </div>
    </header>
  );
}
