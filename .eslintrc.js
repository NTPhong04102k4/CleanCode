module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-native/no-inline-styles': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        'no-inline-styles': false,
        singleQuote: true,
        parser: 'flow',
      },
    ],
  },
};
