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

  // Rule 1: Index-only for cross-module imports (applies to all src files)
  {
    files: ["@/**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/**/*", // Disallow direct import of files like ../moduleA/fileB.ts
                "!@/**/index.ts", // Allow ../moduleA/index.ts
                "!@/**/index.tsx", // Allow ../moduleA/index.tsx
              ],
              message: `Cross-module imports must point to the module itself (e.g., \`import .. from '../moduleA'\`) or its index file (e.g., \`import .. from '../moduleA/index.ts'\` or \`../moduleA/index.tsx'\`). Importing specific non-index files (e.g., \`import .. from '../moduleA/specificUtil.ts'\`) from other modules is not allowed.`,
            },
          ],
        },
      ],
    },
  },

  // Rule 2: Restrictions for Shared Layer (src/shared/**)
  {
    files: ["@/shared/**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/features/**",
                "~/features/**",
                "@/features/**",
                "@/**/features/**", // Catches relative paths like ../features, ../../features etc.
              ],
              message: `Shared layer modules (src/shared/**) cannot import from Feature layer modules (src/features/**). Adhere to the dependency flow: app -> features -> shared.`,
            },
            {
              group: [
                "@/app/**",
                "~/app/**",
                "@/app/**",
                "@/**/app/**", // Catches relative paths like ../app, ../../app etc.
              ],
              message: `Shared layer modules (src/shared/**) cannot import from App layer modules (src/app/**). Adhere to the dependency flow: app -> features -> shared.`,
            },
          ],
        },
      ],
    },
  },

  // Rule 3: Restrictions for Features Layer (src/features/**)
  {
    files: ["@/features/**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/app/**",
                "~/app/**",
                "src/app/**",
                "../**/app/**", // Catches relative paths like ../app, ../../app etc.
              ],
              message: `Feature layer modules (src/features/**) cannot import from App layer modules (src/app/**). Adhere to the dependency flow: app -> features -> shared.`,
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
