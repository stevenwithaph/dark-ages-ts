/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@medenia/eslint-config/library.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  env: {
    browser: true,
  },
};
