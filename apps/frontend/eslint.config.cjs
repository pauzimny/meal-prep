const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const react = require("eslint-plugin-react");
const path = require("path");

console.log("🧩 ESLint config loaded from:", __dirname);
console.log("🧩 Using tsconfig at:", __dirname + "/tsconfig.json");

module.exports = [
  {
    ignores: [
      "**/eslint.config.*",
      "**/*.config.js",
      "**/*.config.cjs",
      "**/tailwind.config.js",
      "**/vite.config.ts",
      "**/postcss.config.js",
      "dist/",
      "build/",
      "node_modules/",
      "database.types.ts",
      "e2e/testHelpers.ts",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: [path.resolve(__dirname, "tsconfig.eslint.json")],
        tsconfigRootDir: __dirname,
      },
      globals: {
        console: "readonly",
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
      },
    },
    plugins: {
      react,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-misused-promises": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-redundant-type-constituents": "warn",
    },
  },
];
