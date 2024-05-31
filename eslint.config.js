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

const ignores = ['node_modules/**', '.eslintrc.js', 'dist/**', 'coverage/**', 'report/**'];
const languageOptions = {
  parser: tsParser,
  ecmaVersion: 'latest',
  sourceType: 'module',
  globals: {
    node: true,
    jest: true,
  },
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};

module.exports = [
  nodePlugin.configs.recommended,
  eslintCommentsPlugin.configs.recommended,
  optimizeRegexPlugin.configs.recommended,
  switchCasePlugin.configs.recommended,
  simpleImportSortPlugin,
  deprecationPlugin.configs.recommended,
  importPlugin.configs.recommended,
  unusedImportsPlugin,
  tsEslintPlugin.configs.recommended,
  securityPlugin.configs.recommended,
  {
    files: ['**/*.ts'],
    ignores,
    languageOptions,
    settings: {
      node: {
        allowModules: ['express'],
        tryExtensions: ['.js', '.json', '.ts'],
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      ...prettierPlugin.rules,
      ...tsEslintPlugin.configs.recommended.rules,
      ...nodePlugin.configs.recommended.rules,
      ...eslintCommentsPlugin.configs.recommended.rules,
      ...optimizeRegexPlugin.configs.recommended.rules,
      ...switchCasePlugin.configs.recommended.rules,
      ...securityPlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      ...simpleImportSortPlugin.rules,
      ...unusedImportsPlugin.rules,
      ...deprecationPlugin.rules,
      'node/no-unsupported-features/es-syntax': [
        'error',
        {
          ignores: ['modules'],
        },
      ],
      'node/no-missing-import': 'off',
      'node/no-unpublished-import': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'deprecation/deprecation': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/no-unresolved': 'error',
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
      'import/no-named-as-default': 'off',
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
      'import/no-named-as-default-member': 'off',
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
      'jest': jestPlugin,
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
      // TODO: Remove below
      'security/detect-non-literal-regexp': 'off',
    },
  },
];
