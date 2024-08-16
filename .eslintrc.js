module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./packages/*/tsconfig.json'],
  },
  plugins: [
    'import',
    'jsdoc',
    'tsdoc',
    '@typescript-eslint/eslint-plugin'
  ],
  extends: [
    'eslint:recommended',
    'plugin:jsdoc/recommended-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  settings: {
    jsdoc: {
      mode: 'typescript',
    },
  },
  ignorePatterns: ['.eslintrc.js', 'packages/*/dist'],
  rules: {
    'no-unused-vars': 'off',
    'import/no-extraneous-dependencies': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-empty-interface': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'jsdoc/require-jsdoc': 'off',
    'jsdoc/require-param': 'off',
    'jsdoc/require-returns': 'off',
    'jsdoc/tag-lines': ['error', 'any', { startLines: 1 }],
    'tsdoc/syntax': 'error',
  },
  overrides: [
    {
      files: ['*.spec.tsx'],
      rules: {
        'jsdoc/tag-lines': 'off',
        'tsdoc/syntax': 'off',
      },
    },
  ],
};
