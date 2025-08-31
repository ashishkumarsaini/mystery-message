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
    "rules": {
      /* TypeScript */
      "@typescript-eslint/explicit-function-return-type": "warn", // forces return types (good for APIs/libraries)
      "@typescript-eslint/no-explicit-any": "warn", // avoid `any`, but allow if needed
      "@typescript-eslint/no-non-null-assertion": "warn", // prevents `!` misuse
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          "prefer": "type-imports",
          "fixStyle": "inline-type-imports"
        }
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "vars": "all",
          "args": "after-used",
          "ignoreRestSiblings": true
        }
      ],
      /* Imports */
      "import/order": [
        "warn",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            [
              "parent",
              "sibling"
            ],
            "index"
          ],
          "newlines-between": "always",
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ],
      /* General */
      "no-console": [
        "warn",
        {
          "allow": [
            "warn",
            "error"
          ]
        }
      ],
      "react-hooks/exhaustive-deps": "warn"
    },
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  }
];

export default eslintConfig;
