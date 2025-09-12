module.exports = {
    env: {
        node: true,
        es6: true,
        browser: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            modules: true,
            experimentalObjectRestSpread: true,
        },
    },
    rules: {
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

        // Best Practices
        'no-invalid-this': 'warn',
        'no-return-assign': 'warn',

        // Variable
        'no-use-before-define': 'warn',
        'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z]' }],

        // ES6
        'no-undef': 'warn',
        'no-confusing-arrow': 'off',
        'no-duplicate-imports': 'warn',
        'no-var': 'warn',
        'object-shorthand': 'warn',
        'prefer-const': 'warn',
        'prefer-template': 'warn',
    },
};
