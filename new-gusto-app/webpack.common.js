const { resolve } = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { title, description, keywords, config } = require('./package.json')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  context: resolve(__dirname, 'src'),

  entry: [
    './index.js',
    './assets/css/font.css',
    './assets/css/scrollbar.css',
    './assets/css/index.css',
  ],

  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'assets/[name].[chunkhash:4].js',
    clean: true,
    publicPath: '/',
    chunkFilename: (pathData) => {
      return pathData.chunk.name === 'main' ? 'assets/[name].js' : 'assets/[name]/[name].js'
    },
  },

  module: {
    rules: [
      {
        test: resolve(__dirname, 'src', 'vendors', 'modernizr.js'),
        use: [
          {
            loader: 'val-loader',
            options: {
              minify: false,
              options: ['setClasses', 'addTest'],
              'feature-detects': [
                'touchevents',
                'test/serviceworker',
              ],
            },
          },
        ],
      },
      {
        test: /\.m?js(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                isDev && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
      {
        test: /\.(mp4)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/videos/[name][ext]',
        },
      },
      {
        test: /\.(frag|vert)$/,
        use: ['raw-loader', 'glslify-loader'],
      },
    ],
  },

  plugins: [
    new ESLintPlugin({
      emitWarning: true,
      failOnError: false,
    }),
    new HtmlWebpackPlugin({
      title,
      description,
      keywords: keywords.join(', '),
      url: config.URL_BASE,
      themeColor: config.THEME_COLOR,
      tagManagerKey: config.GOOGLE_TAG_MANAGER_KEY,
      cookiebotId: config.COOKIEBOT_ID,
      inject: 'body',
      template: `${__dirname}/public/index.html`,
      favicon: `${__dirname}/src/assets/images/favicon.png`,
      enableTracking: process.env.NODE_ENV === 'production',
      minify: process.env.NODE_ENV === 'production',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.STATS || 'disabled',
    }),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/style.[chunkhash:4].css',
    }),
    new webpack.DefinePlugin({
      'process.env.CONFIG': JSON.stringify(config),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.FAVICON': JSON.stringify(process.env.FAVICON),
      'process.env.STATS': JSON.stringify(process.env.STATS),
    }),
  ],
}
