module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "indent": "off",
    "import/no-unresolved": "off",
    "no-tabs": "off",
    "operator-linebreak": "off",
    "no-use-before-define": "off",
    "no-console": "off",
    "global-require": "off",
    "eqeqeq": "warn",
    "max-len": "warn",
    "no-plusplus": "off",
  },
};
