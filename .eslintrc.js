module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: ['next', 'standard'],
  ignorePatterns: ['out'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'space-before-function-paren': 'off'
  },
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect'
    },
    propWrapperFunctions: [
      'forbidExtraProps',
      { property: 'freeze', object: 'Object' },
      { property: 'myFavoriteWrapper' }
    ],
    linkComponents: [{ name: 'Link', linkAttribute: 'to' }]
  }
}
