const tseslint = require('typescript-eslint');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  {
    ignores: ["dist/", "node_modules/"],
  },
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ["eslint.config.js"],
    rules: {
        "@typescript-eslint/no-require-imports": "off"
    }
  }
];