module.exports = {
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
<<<<<<< HEAD
<<<<<<< HEAD
    'plugin:react/recommended',
=======
    'plugin:react/recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'prettier',
    'react',
    'jsx-a11y',
>>>>>>> 3452ce2... Lint stuff
  ],
  plugins: ['jsx-a11y', 'prettier', '@typescript-eslint', 'eslint-plugin-react'],
  rules: {
    'react/require-default-props': 'off',
    'no-use-before-define': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/indent': [2, 2],
    'no-trailing-spaces': ['error'],
    'space-in-parens': ['error'],
<<<<<<< HEAD
    quotes: [2, 'single', { avoidEscape: true }],
    'object-curly-spacing': ['error'],
=======
    'quotes': [2, 'single', { 'avoidEscape': true }],
>>>>>>> 3452ce2... Lint stuff
    'no-multiple-empty-lines': ['error'],
    'no-multi-spaces': ['error'],
    'jsx-a11y/anchor-is-valid': 'off', // Doesn't play well with Blitz/Next <Link> usage
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/react-in-jsx-scope': 'off', // React is always in scope with Blitz
    'react/display-name': 'off', // React is always in scope with Blitz
    'import/no-extraneous-dependencies': [2, { devDependencies: ['**/test.tsx', '**/test.ts'] }],
    'import/no-anonymous-default-export': 'error',
    'import/no-webpack-loader-syntax': 'off',
    'import/prefer-default-export': 'off',
=======
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-anonymous-default-export': 'error',
    'import/no-webpack-loader-syntax': 'off',
    'react/react-in-jsx-scope': 'off', // React is always in scope with Blitz
    'jsx-a11y/anchor-is-valid': 'off', // Doesn't play well with Blitz/Next <Link> usage
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/prop-types': 0,
>>>>>>> 7936303... Stuff
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
};
