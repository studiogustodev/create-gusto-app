const presets = [
  ['@babel/preset-env', {
    debug: false,
    modules: false,
  }],
  ['@babel/preset-react', {
    runtime: 'automatic',
    development: process.env.NODE_ENV === 'development',
    importSource: '@welldone-software/why-did-you-render',
  }],
]

const plugins = [
  'jsx-control-statements',
  '@babel/plugin-transform-runtime',
  '@babel/plugin-transform-arrow-functions',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-optional-chaining',
]

module.exports = { presets, plugins }
