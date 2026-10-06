import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import stylistic from "@stylistic/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";
import pluginReact from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@stylistic": stylistic,
      perfectionist,
      "unused-imports": unusedImports,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "@stylistic/object-curly-spacing": [
        "error",
        "always",
        {
          arraysInObjects: true,
          objectsInObjects: true,
        },
      ],
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
      "no-unused-vars": "off",
      "no-warning-comments": [
        "warn",
        {
          terms: ["todo", "fixme"],
          location: "anywhere",
        },
      ],
      "perfectionist/sort-imports": [
        "warn",
        {
          type: "alphabetical",
          groups: [
            "builtin",
            "framework",
            "external",
            "internal",
            "parent",
            "sibling",
            "side-effect",
            "style",
            "unknown",
          ],
          customGroups: [
            {
              groupName: "framework",
              elementNamePattern: ["^react", "^next"],
            },
            {
              groupName: "internal",
              elementNamePattern: ["^@/"],
            },
          ],
          newlinesBetween: 0,
        },
      ],
      "perfectionist/sort-named-imports": [
        "warn",
        {
          type: "alphabetical",
          order: "asc",
        },
      ],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
]);

export default eslintConfig;
