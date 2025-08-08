const js = require("@eslint/js");

module.exports = [
  {
    ignores: ["**/dist", "**/node_modules", "**/eslint.config.*"],
  },
  js.configs.recommended,
];
