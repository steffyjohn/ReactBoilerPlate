/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  extends: [
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    "@typescript-eslint/explicit-function-return-type": OFF,
  },
};

// module.exports = {
//   env: {
//     browser: true,
//     commonjs: true,
//     jest: true,
//     node: true,
//   },
//   parser: 'babel-eslint',
//   parserOptions: {
//     allowImportExportEverywhere: true,
//   },
//   extends: ['airbnb', 'prettier', 'prettier/react'],
//   plugins: ['react-hooks', 'header'],
//   rules: {
//     // Ignore certain webpack alias because it can't be resolved
//     'import/no-unresolved': [
//       ERROR,
//       {ignore: ['^@theme', '^@docusaurus', '^@generated']},
//     ],
//     'import/extensions': OFF,
//     'react/jsx-closing-bracket-location': OFF, // Conflicts with Prettier.
//     'react/jsx-filename-extension': OFF,
//     'react-hooks/rules-of-hooks': ERROR,
//     'react/prop-types': OFF, // PropTypes aren't used much these days.
//   },
// };
