import { gzipSync } from "node:zlib";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const budgets = JSON.parse(readFileSync("budgets.json", "utf8"));

const html = readFileSync(join(OUT, "index.html"), "utf8");
const sources = [
  ...new Set(
    [...html.matchAll(/<script[^>]+src="([^"]+\.js)"/g)].map((m) => m[1]),
  ),
];

if (sources.length === 0) {
  console.error("No script tags found in out/index.html.");
  console.error("Either the build produced nothing or the markup changed.");
  process.exit(1);
}

const scripts = sources
  .map((src) => ({
    src,
    bytes: gzipSync(readFileSync(join(OUT, src)), { level: 9 }).length,
  }))
  .sort((a, b) => b.bytes - a.bytes);

const kb = (bytes) => bytes / 1024;
const total = kb(scripts.reduce((sum, s) => sum + s.bytes, 0));
const baseline = budgets.frameworkBaseline.kb;
const application = total - baseline;
const budget = budgets.applicationJsKb;

for (const s of scripts) {
  console.log(`  ${kb(s.bytes).toFixed(1).padStart(7)} kB  ${s.src}`);
}

console.log("");
console.log(`  total first-load JS   ${total.toFixed(1)} kB gzipped`);
console.log(
  `  framework baseline    ${baseline.toFixed(1)} kB  (${budgets.frameworkBaseline.measuredWith})`,
);
console.log(`  application JS        ${application.toFixed(1)} kB`);
console.log(`  budget                ${budget.toFixed(1)} kB`);

if (application > budget) {
  console.error("");
  console.error(
    `Application JS is ${(application - budget).toFixed(1)} kB over budget.`,
  );
  console.error(
    "If a framework upgrade caused this, re-measure the baseline in budgets.json",
  );
  console.error("as its own commit rather than widening the budget.");
  process.exit(1);
}
