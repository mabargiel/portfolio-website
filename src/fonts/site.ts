import { Fraunces, Instrument_Sans } from "next/font/google";

// Polish needs latin-ext, for the CV. Fraunces italic is not loaded: it was one
// line of the design and the largest single font file on the page.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const fonts = `${fraunces.variable} ${instrument.variable}`;
