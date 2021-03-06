module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': 'airbnb-base',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    'window': true,
    'Vue': true,
    'io': true,
    'PIXI': true,
    'R': true
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'import/no-extraneous-dependencies': 'off',
    'import/no-absolute-path': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'max-len': ['error', 80],
    'no-use-before-define': 'off',
    'no-console': 'off',
    'prefer-arrow-callback': 'off',
    'prefer-const': 'off',
    'prefer-rest-params': 'off',
    'function-paren-newline': ['error', 'consistent'],
    'no-param-reassign': 'off',
    'comma-dangle': 'off',
    'no-debugger': 'off'
  },
  'plugins': [
    'import'
  ]
};
