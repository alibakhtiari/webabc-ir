import js from '@eslint/js';
import globals from 'globals';

import tseslint from 'typescript-eslint';

import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config([
  { ignores: ['dist', 'api', '.astro', 'src/generated'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);
