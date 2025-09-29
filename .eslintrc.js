module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        '@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['@typescript-eslint', 'react-hooks'],
    rules: {
        // Console and debugging
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

        // TypeScript specific
        '@typescript-eslint/no-unused-vars': ['warn', { 
            varsIgnorePattern: '^[A-Z]',
            argsIgnorePattern: '^_'
        }],
        '@typescript-eslint/no-explicit-any': 'warn',

        // React Hooks
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',

        // Code quality
        'prefer-const': 'warn',
        'no-var': 'error',
        'object-shorthand': 'warn',
        'prefer-template': 'warn',
    },
};
