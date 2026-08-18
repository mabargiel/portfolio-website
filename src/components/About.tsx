import { Section } from "./Section";

type Row = { term: string; value: string; tone?: keyof typeof tones };

const tones = {
  gold: "text-gold",
  ok: "text-ok",
};

const datasheet: Row[] = [
  { term: "experience", value: "12+ years" },
  { term: "role", value: "full-stack, contract" },
  { term: "backend", value: "C# / .NET 8" },
  { term: "frontend", value: "React / TypeScript" },
  { term: "cloud", value: "Azure" },
  { term: "ops", value: "Terraform, K8s, ADO" },
  { term: "delivery", value: "ai-accelerated, ~10x", tone: "gold" },
  { term: "code review", value: "always human, no exceptions", tone: "ok" },
  { term: "timezone", value: "CET, UTC+1" },
  { term: "status", value: "open to contracts", tone: "ok" },
];

export function About() {
  return (
    <Section
      id="about"
      tag="about"
      title="The short version"
      sub="Twelve years, three stacks, one habit: asking why before how."
      note="// tldr below"
    >
      <div className="grid items-start gap-11 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <div className="text-text-2 [&>p]:mb-4.5">
          <p className="text-lead text-text">
            I take products from whiteboard to production and stay accountable
            for how they run afterwards.
          </p>
          <p>
            Most of my work sits in the{" "}
            <strong className="text-text font-medium">
              .NET, React and Azure
            </strong>{" "}
            triangle. APIs and domain logic on the backend. Interfaces people
            actually use on the front. And the pipeline work, CI/CD,
            infrastructure as code, observability, that makes releases boring in
            the best possible way.
          </p>
          <p>
            Informatics at AGH in Krakow, though most of what I use daily I
            learned shipping it.
          </p>
          <p>
            I use AI tooling aggressively and on purpose. It compresses the
            mechanical work by an order of magnitude, so{" "}
            <strong className="text-text font-medium">
              your budget buys architecture, review and edge cases
            </strong>{" "}
            instead of boilerplate.
          </p>

          <div className="border-gold bg-gold/6 my-5.5 flex items-baseline gap-3 border-l-2 px-4 py-3.5">
            <span className="text-meta text-gold shrink-0 font-mono">
              [review]
            </span>
            <p className="text-text">
              AI drafts the boilerplate. I read every line before it ships, no
              exceptions, no autopilot merges.
            </p>
          </div>

          <p>
            If you need a contractor who waits for a ticket before thinking,
            that is someone else. If you want an engineer who asks what a
            feature is for before building it, write to me.
          </p>
        </div>

        <aside
          aria-labelledby="datasheet-heading"
          className="border-gold text-meta border-t-2 pt-1.5 font-mono"
        >
          <h3
            id="datasheet-heading"
            className="text-gold py-3 text-xs font-medium tracking-wide uppercase"
          >
            Datasheet
          </h3>
          <dl>
            {datasheet.map(({ term, value, tone }, index) => (
              <div
                key={term}
                style={{ transitionDelay: `${index * 45}ms` }}
                className="border-line reveal flex items-baseline gap-2.5 border-b border-dotted py-1.75"
              >
                <dt className="text-text-3 whitespace-nowrap">{term}</dt>
                <span
                  aria-hidden="true"
                  className="border-line flex-1 -translate-y-1 border-b border-dotted"
                />
                <dd
                  data-countup={/^\d/.test(value) ? "" : undefined}
                  className={tone ? tones[tone] : "text-text"}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  );
}
