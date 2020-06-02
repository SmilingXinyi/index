module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'no-multi-spaces': 'error',
        'space-before-blocks': 'error',
        'space-before-function-paren': 'error',
        'space-in-parens': ['error', 'never'],
        'space-infix-ops': 'error',
        'max-len': ['error', {code: 80, ignoreUrls: true}]
    }
};
