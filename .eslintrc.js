// .eslintrc
// js 파일의 경우 module.exports 를 사용해서 내보내줘야 함

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['react-app', 'eslint:recommended', 'prettier'],
  env: {
    es6: true,
  },
  rules: {
    'no-var': 'error', //var 금지
    'no-multiple-empty-lines': 'error', // 여러 줄 공백 금지
    'no-unused-vars': 'error', // 사용하지 않는 변수 금지
    'no-console': 'error', // console.log 금지
    eqeqeq: 'error', // 일치연산자 사용 필수
    'dot-notation': 'error', // 가능하다면 dot notation  사용 권장
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
