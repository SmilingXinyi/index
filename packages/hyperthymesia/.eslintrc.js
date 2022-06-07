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
    ignorePatterns: ['*.test.ts', 'node_modules/*', 'scripts/*'],
    plugins: ['@typescript-eslint'],
    rules: {
        'indent': ['error', 4],
        'no-multi-spaces': 'error',
        'space-before-blocks': 'error',
        'space-before-function-paren': 'error',
        'space-in-parens': ['error', 'never'],
        'space-infix-ops': 'error',
        'object-curly-spacing': 'off',
        'implicit-arrow-linebreak': 'off',
        'prefer-rest-params': 'warn',
        'max-len': ['error', {code: 120, ignoreUrls: true}],
        'prefer-destructuring': ['warn', {
            'array': false,
            'object': true
        }],
        'import/extensions': [
            'warn',
            'never',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ],
        'no-bitwise': 'off',
        'no-plusplus': 'off',
        'no-throw-literal': 'off',
        'arrow-parens': 'off',
        'no-useless-catch': 'off',
        'no-trailing-spaces': 'off',
        'comma-dangle': ['error', 'never'],
        'no-useless-escape': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-param-reassign': ['error', {props: true, ignorePropertyModificationsForRegex: ['^tx']}],
        'no-unused-expressions': 'off',
        'quote-props': 'off',
        'no-return-assign': 'off',
        'no-multi-assign': 'off',
        'consistent-return': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'import/no-unresolved': 'off',
        'semi': 'off',
        '@typescript-eslint/no-var-requires': 'off'
    }
};
