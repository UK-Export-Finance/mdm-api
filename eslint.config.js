const { FlatCompat } = require('@eslint/eslintrc');

const tsParser = require('@typescript-eslint/parser');
const switchCasePlugin = require('eslint-plugin-switch-case');
const simpleImportSortPlugin = require('eslint-plugin-simple-import-sort');
const deprecationPlugin = require('eslint-plugin-deprecation');
const importPlugin = require('eslint-plugin-import');
const prettierPlugin = require('eslint-plugin-prettier/recommended');
const unusedImportsPlugin = require('eslint-plugin-unused-imports');
const tsEslintPlugin = require('@typescript-eslint/eslint-plugin');
const nodePlugin = require('eslint-plugin-node');
const eslintCommentsPlugin = require('eslint-plugin-eslint-comments');
const optimizeRegexPlugin = require('eslint-plugin-optimize-regex');
const securityPlugin = require('eslint-plugin-security');
const jestPlugin = require('eslint-plugin-jest');
const jestFormattingPlugin = require('eslint-plugin-jest-formatting');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});
const ignores = ['node_modules/**', '.eslintrc.js', 'dist/**', 'coverage/**', 'report/**'];
const languageOptions = {
  parser: tsParser,
  ecmaVersion: 'latest',
  sourceType: 'module',
  parserOptions: {
    project: './tsconfig.json',
  },
  globals: {
    node: true,
    jest: true,
  },
};

module.exports = [
  ...compat.plugins(nodePlugin.configs.recommended.plugins[0]),
  // ...compat.plugins(importPlugin.configs.recommended.plugins[0]),
  // ...compat.plugins(deprecationPlugin.configs.recommended.plugins[0]),
  // ...compat.plugins(prettierPlugin.plugins.prettier.configs.recommended.plugins[0]),
  ...compat.plugins(optimizeRegexPlugin.configs.recommended.plugins[0]),
  ...compat.plugins(eslintCommentsPlugin.configs.recommended.plugins[0]),
  securityPlugin.configs.recommended,
  {
    files: ['**/*.ts'],
    ignores,
    languageOptions,
    settings: {
      node: {
        allowModules: ['express'],
        tryExtensions: ['.ts'],
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts'],
      },
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
      'unused-imports': unusedImportsPlugin,
      'switch-case': switchCasePlugin,
      '@typescript-eslint': tsEslintPlugin,
      import: importPlugin,
      deprecation: deprecationPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...nodePlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...deprecationPlugin.configs.recommended.rules,
      ...prettierPlugin.rules,
      ...switchCasePlugin.configs.recommended.rules,
      ...optimizeRegexPlugin.configs.recommended.rules,
      ...eslintCommentsPlugin.configs.recommended.rules,
      ...tsEslintPlugin.configs.recommended.rules,
      ...tsEslintPlugin.configs['recommended-requiring-type-checking'].rules,
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'node/no-unsupported-features/es-syntax': [
        'error',
        {
          ignores: ['modules'],
        },
      ],
      'node/no-missing-import': 'off',
      'node/no-unpublished-import': 'off',
      'import/first': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'prettier/prettier': [
        'error',
        {
          printWidth: 160,
          endOfLine: 'auto',
          parser: 'typescript',
        },
      ],
      'max-len': [
        'error',
        160,
        2,
        {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'no-console': [
        'error',
        {
          allow: ['info', 'error'],
        },
      ],
      'import/extensions': 'off',
      'implicit-arrow-linebreak': 'off',
      'import/newline-after-import': 'off',
      'import/prefer-default-export': 'off',
      'consistent-return': 'off',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['error', { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'no-empty-function': 'off',
      'require-await': 'error',
      'no-useless-constructor': 'off',
      'class-methods-use-this': 'off',
      'object-curly-newline': [
        'error',
        {
          consistent: true,
        },
      ],
      'prefer-destructuring': [
        'error',
        {
          array: true,
          object: true,
        },
      ],
    },
  },
  {
    files: ['**/*.test.ts', '**/*.api-test.ts'],
    ignores,
    languageOptions,
    plugins: {
      jest: jestPlugin,
      'jest-formatting': jestFormattingPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      ...jestPlugin.configs.style.rules,
      ...jestFormattingPlugin.configs.strict.rules,
      ...securityPlugin.configs.recommended.rules,
      'jest/expect-expect': [
        'warn',
        {
          assertFunctionNames: ['expect', 'request.**.expect', '**.expect\\w+'],
        },
      ],
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'jest/unbound-method': 'error',
    },
  },
];
