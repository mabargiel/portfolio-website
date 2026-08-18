import localFont from "next/font/local";

// Whole files. next/font/google splits per unicode range, which breaks Polish
// words across text runs and makes the PDF unsearchable.
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
