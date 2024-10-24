// eslint.config.js
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
            window: "readonly",
            document: "readonly",
            console: "readonly",
            fetch: "readonly",
            URLSearchParams: "readonly",
            localStorage: "readonly",
            FormData: "readonly",
            location: "readonly",
            alert: "readonly",
            module: "readonly",
            require: "readonly",
            process: "readonly",
        },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "res|next|^err" }],
      "arrow-body-style": ["error", "as-needed"],
      "no-param-reassign": ["error", { props: false }],
      "no-console": "warn",
      "quotes": ["error", "double", { allowTemplateLiterals: true }],
    },
  },
];