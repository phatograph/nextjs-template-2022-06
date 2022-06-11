// https://nextjs.org/docs/basic-features/eslint#eslint-plugin

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['cypress', '@typescript-eslint'],
  env: {
    'cypress/globals': true,
  },
  extends: [
    'next',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@next/next/google-font-display': 'off',
    '@next/next/no-img-element': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'no-empty-pattern': 'off',
    'no-duplicate-imports': 'error',
    'no-param-reassign': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'jsx-a11y/alt-text': 'off',
  },
}
