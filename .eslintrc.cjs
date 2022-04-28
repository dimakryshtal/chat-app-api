module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'import/prefer-default-export': 0,
        indent: ['error', 4],
        camelcase: 'off',
        'no-param-reassign': [2, { props: false }],
        'import/extensions': [
            'error',
            {
                js: 'ignorePackages',
            },
        ],
    },
};
