const colors = [
  "ink",
  "base",
  "surface",
  "line",
  "line-soft",
  "text",
  "text-2",
  "text-3",
  "gold",
  "rust",
  "ok",
];

export default function Home() {
  return (
    <main className="max-w-page mx-auto px-6 py-24">
      <p className="text-meta text-text-3 font-mono">&lt;foundation&gt;</p>
      <h1 className="font-display text-h1 leading-tight tracking-tight">
        Type and colour
      </h1>
      <p className="text-lead text-text-2 mt-4 max-w-[60ch]">
        The token layer everything else is built from. Tailwind&rsquo;s default
        theme is deleted, so only these values can be reached from a class name.
      </p>

      <h2 className="font-display text-h2 mt-16 leading-snug">Display, h2</h2>
      <h3 className="font-display text-h3 mt-6">Display, h3</h3>
      <p className="mt-6 max-w-[65ch]">
        Body copy in Instrument Sans at the base size, set at a comfortable
        measure so a line lands between sixty and seventy characters.
      </p>
      <p className="text-meta text-text-3 mt-4 font-mono">
        monospace metadata · 13px · text-3
      </p>

      <ul className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
        {colors.map((name) => (
          <li key={name} className="border-line rounded-md border p-3">
            <span
              className="border-line-soft block h-10 rounded-sm border"
              style={{ backgroundColor: `var(--color-${name})` }}
            />
            <span className="text-meta text-text-2 mt-2 block font-mono">
              {name}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-meta text-text-3 mt-16 font-mono">
        &lt;/foundation&gt;
      </p>
    </main>
  );
}
