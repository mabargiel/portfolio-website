import localFont from "next/font/local";

// Whole files, not next/font/google. Google splits a family into one file per
// unicode range, so a Polish word mixes glyphs from two files, Chrome writes a
// text run for each, and extractors read the gap as a space: "Niezale z ny".
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
