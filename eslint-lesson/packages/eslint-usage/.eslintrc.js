const ac = require('eslint-plugin-ac-lint')

module.exports = {
  env: {
    // 我当前可以使用哪个环境的全局变量
    browser: true,
    es2021: true,
    node: true
  },
  // extends: [
  //   'eslint:recommended'
  //   //  'plugin:@typescript-eslint/recommended'
  // ],
  extends: ['plugin:ac-lint/recommend'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest', // 描述语法的
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  // plugins: ['ac-lint'],
  rules: {
    // 0 off 1 warn 2 error
    // quotes: ['error', 'single'],
    // 'ac-lint/no-var': ['error']
  },
  // plugins: ['@typescript-eslint'],
  // parser: '@typescript-eslint/parser',
  globals: {
    aicherish: 'readonly'
  }
}

// extends = plugin + rule
