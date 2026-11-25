import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      // next/image is a pass-through under `output: 'export'`, so the rule asks
      // for a component that cannot optimize anything here.
      "@next/next/no-img-element": "off",
    },
  },
  {
    files: ["src/sanity/types.ts"],
    rules: {
      // Sanity TypeGen emits an empty interface to merge into @sanity/client
      // releases that predate the global registry, and rewrites the file on
      // every generate, so the shape cannot be fixed in place.
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/cms/**",
  ]),
]);

export default eslintConfig;
