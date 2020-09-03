module.exports = {
  extends: ['eslint:recommended'],
  env: {
    es6: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['svelte3'],
  globals: {
    process: true
  },
  overrides: [
    { files: ['*.js'], extends: ['plugin:prettier/recommended'] },
    {
      files: ['*.config.js', '.*rc.js', '**/__tests__/**/*'],
      env: {
        node: true
      }
    },
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        // Waiting for this PR to be merged, this avoids
        // $... variables used in templates to be marked
        // as not used if nothing uses them in the script
        // https://github.com/sveltejs/eslint-plugin-svelte3/pull/65/files
        'no-unused-vars': [
          'error',
          {
            varsIgnorePattern: '$'
          }
        ]
      }
    }
  ]
};
