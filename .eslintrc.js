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
    '@typescript-eslint/eslint-plugin'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jsdoc/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
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
  },
  settings: {
    jsdoc: {
      mode: 'typescript',
    },
  },
};
