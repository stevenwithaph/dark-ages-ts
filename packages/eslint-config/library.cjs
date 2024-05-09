const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  plugins: ['@stylistic'],
  extends: [
    'eslint:recommended',
    ' plugin:@stylistic/recommended-extends',
    'eslint-config-turbo',
  ],
  globals: {
    JSX: true,
  },
  env: {
    browser: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'dist/',
  ],
  overrides: [
    {
      files: ['*.ts?(x)'],
    },
  ],
};
