import { chromium } from "playwright";

const WIDTHS = [320, 375, 414, 768, 1024, 1440, 1920];
const url = process.env.PREVIEW_URL ?? "http://localhost:4173/en/";

const browser = await chromium.launch();
const page = await browser.newPage();

const failures = [];

for (const width of WIDTHS) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(url, { waitUntil: "networkidle" });

  const { scrollWidth, clientWidth, offender } = await page.evaluate(() => {
    const doc = document.documentElement;
    let offender = null;
    if (doc.scrollWidth > doc.clientWidth) {
      for (const el of document.body.querySelectorAll("*")) {
        const right = el.getBoundingClientRect().right;
        if (right > doc.clientWidth + 1) {
          offender = `${el.tagName.toLowerCase()}${el.className ? "." + String(el.className).split(" ")[0] : ""} extends to ${Math.round(right)}px`;
          break;
        }
      }
    }
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      offender,
    };
  });

  if (scrollWidth > clientWidth) {
    failures.push({ width, scrollWidth, clientWidth, offender });
    console.log(
      `  ${String(width).padStart(4)}px  overflow: scrollWidth ${scrollWidth} > clientWidth ${clientWidth}`,
    );
    if (offender) console.log(`          first offender: ${offender}`);
  } else {
    console.log(`  ${String(width).padStart(4)}px  ok`);
  }
}

await browser.close();

if (failures.length > 0) {
  console.error("");
  console.error(
    `Horizontal overflow at ${failures.map((f) => f.width + "px").join(", ")}.`,
  );
  process.exit(1);
}
