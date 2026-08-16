import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  tag: string;
  title: string;
  sub: string;
  note: string;
  children: ReactNode;
};

export function Section({ id, tag, title, sub, note, children }: SectionProps) {
  return (
    <section
      id={id}
      className="border-line-soft scroll-mt-26 border-b py-20 last-of-type:border-b-0 sm:scroll-mt-16 md:py-25"
    >
      <div className="max-w-page mx-auto px-6">
        <div className="reveal mb-14 max-w-[660px]">
          <span className="text-meta text-text-3 block font-mono select-none">
            &lt;{tag}&gt;
          </span>
          <h2 className="font-display text-h2 my-1.5 leading-snug font-medium tracking-tight">
            {title}
          </h2>
          <p className="font-display text-lead text-text-2 mt-2.5">
            <span
              aria-hidden="true"
              className="bg-gold mr-3 inline-block h-px w-6.5 align-middle"
            />
            {sub}{" "}
            <span className="text-meta text-text-3 font-mono whitespace-nowrap">
              {note}
            </span>
          </p>
        </div>

        {children}

        <p className="text-meta text-text-3 mt-16 font-mono select-none">
          &lt;/{tag}&gt;
        </p>
      </div>
    </section>
  );
}
