// .eslintrc

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
  },
  rules: {
    'no-var': 'error', //var 금지
    'no-multiple-empty-lines': 'error', // 여러 줄 공백 금지
    'no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
