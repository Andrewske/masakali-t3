import { dirname } from 'node:path';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import eslint from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin'; // This is the parser for TypeScript
// import reactCompiler from "eslint-plugin-react-compiler";
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], ignores: ["node_modules/", ".next/", "public/", "env"] },
//   { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ];

export default tseslint.config(
  // eslint.configs.recommended,
  // ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // ...tseslint.configs.recommended.map((config) => ({
  //   ...config,
  //   files: ['**/*.ts', '**/*.tsx'],
  //   ignores: ['node_modules/**', '.next/**', 'public/**', 'env'],
  // })),
  // ...tseslint.configs.stylistic.map((config) => ({
  //   ...config,
  //   files: ['**/*.ts', '**/*.tsx'],
  //   ignores: ['node_modules/**', '.next/**', 'public/**', 'env'],
  // })),
  // ...pluginQuery.configs["flat/recommended"],
  // {
  //   ignores: ['node_modules/', '.next/', 'public/', 'env', '*.mjs', '*.js'],
  // },
  // { files: ['src/**/*.ts', 'src/**/*.tsx'] },
  // {

  // },
  {
    ignores: [
      '*.mjs',
      '*.cjs',
      'tmp/*',
      'dist/*',
      'node_modules/',
      '.next/',
      'public/',
      '*.js',
    ],
  },
  {
    ignores: ['node_modules/', '.next/', 'public/', 'env', '*.mjs', '*.js'],
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    plugins: {
      // 'unused-imports': unusedImports,
      '@typescript-eslint': tsPlugin,
      // "react-compiler": reactCompiler,
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
    ],

    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname, // or import.meta.dirname for ESM
      },
    },

    rules: {
      // 'react-compiler/react-compiler': 'error',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
    },
  }
);
