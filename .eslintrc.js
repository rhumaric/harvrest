module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  env: {
    es6: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: [
    'svelte3'
  ],
  globals: {
    'process': true
  },
  "overrides": [
    {
      files: ['*.config.js','.*rc.js'],
      env: {
        node: true
      }
    },
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ]
}
