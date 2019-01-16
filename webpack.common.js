/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const currentUrl = (url) => path.join(__dirname, url)
const rootPath = 'dist'
const env = process.env
console.log('是否开启eslint: ', env.eslint)
console.log('是否开启analyse:', env.analyse)

module.exports = {
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: 'styles',
  //         test: /\.(css|scss|less|sass)$/,
  //         chunks: 'all',
  //         enforce: true
  //       }
  //     }
  //   }
  // },

  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   use: {
      //     loader: 'ts-loader',
      //   },
      //   exclude: /node_modules/
      // },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,

      //   use: {
      //     loader: 'babel-loader',
      //   },
      // },

      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src'],
          },
        },
      },

      // 测试
      // {
      //   test: /test\.js$/,
      //   use: 'mocha-loader',
      //   exclude: /node_modules/,
      // },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(['public']),
    // new HtmlWebpackPlugin({
    // 	title: 'Output Mangement'
    // }),
    new ProgressBarPlugin({
      format: `${chalk.blueBright.bold('  build [:bar] ') +
        chalk.green.bold(':percent')} (:elapsed seconds)`,
      clear: false,
      width: 50,
    }),

    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 15,
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 10000,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin(),

    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'chunk-common'    // 指定模块的名称
    // }),

    // Or: To strip all locales except “en”, “es-us” and “ru”
    // (“en” is built into Moment and can’t be removed)
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
    alias: {
      actions: currentUrl('./src/actions'),
      apis: currentUrl('./src/apis'),
      components: currentUrl('./src/components'),
      config: currentUrl('./src/config'),
      constants: currentUrl('./src/constants'),
      reducers: currentUrl('./src/reducers'),
      cache: currentUrl('./src/cache'),
      css: currentUrl('./src/css'),
      font: currentUrl('./src/font'),
      common: currentUrl('./src/common'),
      statics: currentUrl('./src/statics'),
      modal: currentUrl('./src/modal'),
      store: currentUrl('./src/store'),

      // react: 'anujs/dist/ReactIE.js',
      // 'react-dom': 'anujs/dist/ReactIE.js',
      // 'prop-types': 'anujs/lib/ReactPropTypes.js',
      // 'create-react-class': 'anujs/lib/createClass.js',
    },
  },
}
