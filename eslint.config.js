const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const nxEslintPlugin = require('@nx/eslint-plugin');
const importPlugin = require('eslint-plugin-import');
const jsx = require('eslint-plugin-jsx-a11y');
const playwright = require('eslint-plugin-playwright');
const react = require('eslint-plugin-react');
const prettierPlugin = require('eslint-plugin-prettier/recommended');

module.exports = [
    ...tseslint.config(
        js.configs.recommended,
        tseslint.configs.recommended,
        tseslint.configs.stylistic,
        {
            files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
            languageOptions: {
                parser: tseslint.parser,
                parserOptions: {
                    projectService: true,
                    tsconfigRootDir: __dirname,
                    project: ['./tsconfig.json'],
                },
            },
        },
    ),

    ...nxEslintPlugin.configs['flat/typescript'],
    ...nxEslintPlugin.configs['flat/react'],

    {
        ...importPlugin.flatConfigs.recommended,
        plugins: {
            import: importPlugin,
        },
        rules: {
            ...importPlugin.flatConfigs.recommended.rules,
            // Можно добавить дополнительные правила для усиления контроля
            'import/order': [
                'error',
                {
                    groups: [
                        ['builtin', 'external'],
                        ['internal', 'parent', 'sibling', 'index'],
                    ],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
        },
    },

    {
        ...jsx.flatConfigs.recommended,
        plugins: {
            jsx,
        },
    },

    {
        ...playwright.configs['flat/recommended'],
        files: ['**/*-e2e/**/*.spec*'],
        rules: {
            ...playwright.configs['flat/recommended'].rules,
            // Customize Playwright rules
            // ...
        },
    },

    react.configs.flat.recommended, // This is not a plugin object, but a shareable config object
    react.configs.flat['jsx-runtime'], // Add this if you are using React 17+

    {
        ignores: [
            '**/*.config*',
            '.nx/**',
            'dist/**',
            '.github/**',
            '.vscode/**',
            'node_modules/**'
        ],
    },

    prettierPlugin,
];
