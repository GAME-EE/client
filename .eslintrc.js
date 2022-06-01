module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 100,
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    ],
    // 타입스크립트 interface안의 함수 매개변수 no-unused-vars 속성에 대해서 https://stackoverflow.com/a/61555310
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
