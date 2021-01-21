module.exports = {
  env: {
    es6: true,
    node: true,
    'jest/globals': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'standard',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: [
    '@typescript-eslint',
    'jest',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
  },
}
