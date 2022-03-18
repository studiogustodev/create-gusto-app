const { merge } = require('webpack-merge')
const { BannerPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { description, version, config: { URL_BASE } } = require('./package.json')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',

  devtool: false,

  stats: {
    warnings: false,
    entrypoints: false,
    modules: false,
    children: false,
    assetsSort: '!size',
  },

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: false,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single',
    chunkIds: 'named',
    moduleIds: 'named',
    removeAvailableModules: true,
    flagIncludedChunks: true,
    concatenateModules: false,
    providedExports: false,
    usedExports: false,
    sideEffects: false,
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  plugins: [
    new CleanWebpackPlugin(),
    // new InjectManifest({
    //   swSrc: `${__dirname}/src/pwa/src-sw.js`,
    //   swDest: resolve(__dirname, '..', 'sw.js'),
    // }),
    // new WebpackPwaManifest({
    //   filename: 'manifest.json',
    //   includeDirectory: 'true',
    //   name,
    //   short_name: name,
    //   description,
    //   theme_color: THEME_COLOR,
    //   background_color: BACKGROUND_COLOR,
    //   crossorigin: 'anonymous',
    //   start_url: '/',
    //   scope: '/',
    //   icons: [
    //     {
    //       src: `${__dirname}/src/assets/images/favicon.png`,
    //       destination: join('pwa-icons'),
    //       sizes: [192, 512],
    //     },
    //     {
    //       src: `${__dirname}/src/assets/images/favicon_maskable.png`,
    //       destination: join('pwa-icons'),
    //       size: '1024x1024',
    //       purpose: 'maskable',
    //     },
    //   ],
    // }),
    new CopyPlugin({
      patterns: [
        {
          from: `${__dirname}/src/assets/images/og_image.png`,
          to: 'assets/images/og_image.png',
        },
      ],
    }),
    new BannerPlugin({
      banner: `
      ${description} ${version}
      ${URL_BASE}
      
      @license Copyright ${new Date().getFullYear()}, Studio Gusto. All rights reserved.
      @author: Studio Gusto Dev, https://www.studiogusto.com
      `,
    }),
  ],
})
