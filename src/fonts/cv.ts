import localFont from "next/font/local";

// The CV loads whole font files rather than next/font/google, which splits a
// family into one file per unicode range. A Polish word then mixes glyphs from
// the latin and latin-ext files, Chrome emits a text run per file, and every
// extractor reads the gap as a space: "Niezale z ny". That makes the Polish CV
// unsearchable to the systems it exists to be read by.
const display = localFont({
  src: "./Fraunces-500.ttf",
  weight: "500",
  variable: "--font-cv-display",
  display: "block",
});

const body = localFont({
  src: [
    { path: "./InstrumentSans-400.ttf", weight: "400" },
    { path: "./InstrumentSans-500.ttf", weight: "500" },
  ],
  variable: "--font-cv-body",
  display: "block",
});

export const cvFonts = `${display.variable} ${body.variable}`;
