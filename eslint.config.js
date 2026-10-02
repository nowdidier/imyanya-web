const js = require('@eslint/js');
const globals = require('globals');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');

const cleanGlobals = (...globalSets) =>
  Object.fromEntries(
    globalSets.flatMap((globalSet) =>
      Object.entries(globalSet).map(([name, value]) => [name.trim(), value])
    )
  );

module.exports = [
  {
    ignores: [
      'build/**',
      'coverage/**',
      'node_modules/**',
      '.tmp/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['*.config.js', 'eslint.config.js', 'craco.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: cleanGlobals(globals.node),
    },
  },
  {
    files: ['public/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: cleanGlobals(
        globals.browser,
        globals.serviceworker,
        globals.node
      ),
    },
  },
  {
    files: ['roundtrip-test.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: cleanGlobals(globals.node),
    },
  },
  {
    files: ['src/**/*.{js,jsx}', 'functions/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: cleanGlobals(globals.browser, globals.node, globals.jest),
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
