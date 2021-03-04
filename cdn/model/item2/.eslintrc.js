module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: ['plugin:react/recommended', 'airbnb'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'no-var': 2,
        'no-alert': 2,
        'no-console': 1,
        'comma-dangle': 0,
        'space-before-function-paren': 0,
        'react/react-in-jsx-scope': 0,
        'react/prop-types': 0,
        'linebreak-style': 0,
        'import/no-unresolved': 0,
        'react/jsx-filename-extension': 0,
        'jsx-indent': 0,
        'eslint-disable-next-line': 0,
        'arrow-body-style': 0,
        'import/prefer-default-export': 0,
        index: [4],
        semi: 0,
    },
};
