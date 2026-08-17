import { spawn } from "node:child_process";
import { copyFile, mkdir, readdir } from "node:fs/promises";
import { chromium } from "playwright";

const PORT = 4199;
const ORIGIN = `http://localhost:${PORT}`;
const OG = { width: 1200, height: 630 };

const cvName = (locale) => `mateusz-bargiel-cv-${locale}.pdf`;

async function waitForServer(timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${ORIGIN}/`);
      if (response.ok) return;
    } catch {
      // The server is not listening yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`No response from ${ORIGIN} within ${timeoutMs}ms`);
}

const locales = (await readdir("out/cv", { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const server = spawn("npx", ["serve", "out", "-l", String(PORT)], {
  stdio: "ignore",
});

try {
  await waitForServer();
  await mkdir("out/cv", { recursive: true });
  await mkdir("public/cv", { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const locale of locales) {
    await page.goto(`${ORIGIN}/cv/${locale}/`, { waitUntil: "networkidle" });
    // Chrome will otherwise print whatever the fallback face rendered.
    await page.evaluate(() => document.fonts.ready);

    const path = `out/cv/${cvName(locale)}`;
    await page.pdf({
      path,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });
    await copyFile(path, `public/cv/${cvName(locale)}`);
    console.log(`  ${path}`);
  }

  await page.setViewportSize(OG);
  await page.goto(`${ORIGIN}/og/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "out/og.png" });
  await copyFile("out/og.png", "public/og.png");
  console.log("  out/og.png");

  await browser.close();
} finally {
  server.kill();
}
