const path = require('path');

module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'prettier',
    'plugin:compat/recommended',
    'plugin:react/recommended',
  ],
  globals: {
    KangaroouiVue: false,
  },
  plugins: ['react', 'html', 'jsx-a11y', 'import'],
  settings: {
    polyfills: ['promises'],
    'import/resolver': {
      webpack: {
        config: require(path.resolve(
          __dirname,
          './config/build/webpack.local.conf.js'
        )),
      },
    },
    react: {
      pragma: 'React',
      version: '16.13.1',
    },
  },
  rules: {
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: [
          path.join(__dirname, './config/**/*.js'),
          '**/*.test.js',
          '**/*.spec.js',
          './index.js',
        ],
      },
    ],
  },
};
