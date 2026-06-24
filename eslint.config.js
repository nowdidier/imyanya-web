const js = require('@eslint/js');
const globals = require('globals');
const react = require('eslint-plugin-react');

const cleanGlobals = (...globalSets) =>
  Object.fromEntries(
    globalSets.flatMap((globalSet) =>
      Object.entries(globalSet).map(([name, value]) => [name.trim(), value])
    )
  );

module.exports = [
  {
    ignores: ['build/**', 'coverage/**', 'node_modules/**'],
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
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
