module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'no-await-in-loop': 0,
    'no-nested-ternary': 0,
    'react/prop-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
  },
};
