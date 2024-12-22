import path from 'path';

import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tailwindcss from 'eslint-plugin-tailwindcss';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tailwindcss.configs['flat/recommended'],
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      tailwindcss: tailwindcss,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'tailwindcss/enforces-shorthand': 'error',
    },
    settings: {
      tailwindcss: {
        callees: ['classnames', 'clsx', 'ctl', 'cva', 'cn', 'tw'],
        config: 'tailwind.config.js',
        cssFiles: ['**/*.css', '!**/node_modules', '!**/.*', '!**/dist', '!**/build'],
        cssFilesRefreshRate: 5000,
        removeDuplicates: true,
        skipClassAttribute: false,
        whitelist: [],
        tags: [],
        classRegex: '^class(Name)?$',
      },
    },
  }
);
