import { SITE_URL } from "@/site";

const portraitMask =
  "linear-gradient(to bottom, #000 88%, transparent 100%)" as const;

// scripts/render-assets.mjs sets the viewport to match. Open Graph consumers
// crop anything far from 1.91:1.
const WIDTH = 1200;
const HEIGHT = 630;

export default function OgCard() {
  return (
    <div
      style={{ width: WIDTH, height: HEIGHT }}
      className="bg-ink flex items-center gap-14 overflow-hidden px-20"
    >
      <div className="flex-1">
        <p className="text-text-2 mb-7 font-mono text-[22px]">
          <span className="text-gold">~/mateusz-bargiel</span> $ whoami
        </p>

        <h1 className="font-display text-[68px] leading-[1.05] font-medium tracking-tight">
          Full-stack engineer who <em className="text-gold">ships</em>, not just
          codes.
        </h1>

        <div className="bg-gold mt-9 mb-6 h-px w-16" />

        <p className="text-text-2 font-mono text-[21px]">
          React · .NET · Azure · DevOps
        </p>
        <p className="text-text-3 mt-3 font-mono text-[19px]">
          {SITE_URL.replace("https://", "")} · Krakow / remote EU
        </p>
      </div>

      <img
        src="/portrait.webp"
        alt=""
        width={900}
        height={1089}
        className="h-[630px] w-auto brightness-[0.95] contrast-[1.04] grayscale"
        style={{ maskImage: portraitMask, WebkitMaskImage: portraitMask }}
      />
    </div>
  );
}
