const { resolve, join } = require('path')
const portFinderSync = require('portfinder-sync')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const openBrowser = require('react-dev-utils/openBrowser')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { HOST_DEV, PORT_DEV, DEFAULT_LANGUAGE } = require('./package.json').config
const common = require('./webpack.common')

const port = portFinderSync.getPort(PORT_DEV)

module.exports = merge(common, {
  mode: 'development',

  devtool: 'eval-source-map',

  entry: [
    `webpack-dev-server/client?${HOST_DEV}/`,
    'webpack/hot/only-dev-server',
  ],

  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: '',
  },

  optimization: {
    usedExports: true,
  },

  devServer: {
    static: {
      directory: join(__dirname, 'public'),
      publicPath: '/',
    },
    historyApiFallback: true,
    compress: true,
    hot: true,
    port,
    host: HOST_DEV,
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.js$/,
      options: {
        eslint: {
          configFile: resolve(__dirname, '.eslintrc'),
          cache: false,
        },
      },
    }),
    new ReactRefreshWebpackPlugin(),
    {
      apply: (compiler) => {
        compiler.hooks.afterPlugins.tap('OpenBrowserPlugin', () => {
          openBrowser(`http://${HOST_DEV}:${port}/${DEFAULT_LANGUAGE}`)
        })
      },
    },
  ],
})
