import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  parser: '@typescript-eslint/parser',  // Use TypeScript parser
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',                      // Basic ESLint rules
    'plugin:react/recommended',                // React-specific rules
    'plugin:@typescript-eslint/recommended',   // TypeScript-specific rules
    'plugin:prettier/recommended',             // Prettier integration
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Optional rule
    '@typescript-eslint/no-unused-vars': 'warn', // Warn on unused vars
    'react/prop-types': 'off', // Disable prop-types rule if using TypeScript
    'prettier/prettier': 'error', // Enforce Prettier formatting
  },
  settings: {
    react: {
      version: 'detect',  // Automatically detect React version
    },
  },
});
