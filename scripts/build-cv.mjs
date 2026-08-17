import { spawn } from "node:child_process";
import { copyFile, mkdir, readdir } from "node:fs/promises";
import { chromium } from "playwright";

const PORT = 4199;
const ORIGIN = `http://localhost:${PORT}`;
const OUT_DIR = "out/cv";
const PUBLIC_DIR = "public/cv";

const filename = (locale) => `mateusz-bargiel-cv-${locale}.pdf`;

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
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(PUBLIC_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const locale of locales) {
    await page.goto(`${ORIGIN}/cv/${locale}/`, { waitUntil: "networkidle" });
    // Chrome will otherwise print whatever the fallback face rendered.
    await page.evaluate(() => document.fonts.ready);

    const path = `${OUT_DIR}/${filename(locale)}`;
    await page.pdf({
      path,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });
    await copyFile(path, `${PUBLIC_DIR}/${filename(locale)}`);
    console.log(`  ${path}`);
  }

  await browser.close();
} finally {
  server.kill();
}
