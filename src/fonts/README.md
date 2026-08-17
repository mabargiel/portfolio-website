# Vendored fonts

Fraunces and Instrument Sans, from Google Fonts, subset to latin and latin-ext
and stored as whole files.

`next/font/google` splits a family into one file per unicode range. A Polish
word then mixes glyphs from two files, Chrome writes a text run per file, and
every PDF extractor reads the gap between them as a space. The Polish CV came
out as "Niezale z ny freelancer", which defeats the point of the document.

Both are licensed under the SIL Open Font License, version 1.1. See `OFL.txt`.
