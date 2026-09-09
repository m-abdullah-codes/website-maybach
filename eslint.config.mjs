import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      // Cloudflare build output (gitignored, but eslint does not read .gitignore): 844 errors of
      // bundled vendor code that drowned the six real warnings and made `npm run lint` useless as a gate.
      ".open-next/**",
      ".wrangler/**",
      ".next-qa/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
