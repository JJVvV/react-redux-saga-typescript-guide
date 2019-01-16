/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const tsImportPluginFactory = require('ts-import-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const outputPath = 'dist'

const common = require('./webpack.common')

const env = process.env
const environment = env.production
console.log('environment:', environment)
console.log('analyse:', env.analyse)
const plugins = [
  new CompressionPlugin(),
  new CleanWebpackPlugin([outputPath]),
  new MiniCssExtractPlugin({
    filename: 'css/[name].[chunkhash].css',
    // chunkFilename: "css/[name].[chunkhash].css"
  }),

  new HtmlWebpackPlugin({
    title: '首页',
    filename: 'index.html',
    chunksSortMode: 'manual',
    chunks: ['app'],
    template: '!html-loader!./src/templates/container.html',

    hash: false,

    minify: {
      removeComments: false, // 移除HTML中的注释

      collapseWhitespace: true, // 删除空白符与换行符
    },
  }),

  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer',
  }),

  new webpack.optimize.ModuleConcatenationPlugin(),
]

const proConfig = {
  entry: {
    app: ['./src/pages/index.tsx'],
  },
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: [/\.m\.scss$/, /\.mts\.scss$/],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.mts\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              minimize: true,
              modules: true,
              namedExport: true,
              localIdentName: '[hash:base64:5]',
              camelCase: true,
              sass: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },

      {
        test: /\.m\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              modules: true,
              localIdentName: '[hash:base64:5]',
              camelCase: true,
              sass: true,
            },
          },
          'sass-loader',
        ],
      },

      {
        test: /\.less$/,

        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              // modifyVars: theme,
            },
          },
        ],
      },
      {
        test: /iconfont.(ttf|eot|woff|woff2|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
            publicPath: '/',
          },
        },
      },

      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              // onlyCompileBundledFiles: true,
              // experimentalWatchApi: true,
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory({
                    libraryName: 'antd',
                    libraryDirectory: 'lib',
                    style: true,
                  }),
                ],
              }),
              compilerOptions: {
                module: 'es2015',
              },
            },
          },
        ],
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {},
        },
      },
      {
        test: /\/img\/.+\.(png|svg|jpe?g|gif)$/,
        exclude: /iconfont.(ttf|eot|woff|woff2|svg)$/,
        use: [
          'file-loader?limit=8192&name=/images/[hash:base64:5].[ext]',
          {
            loader: 'image-webpack-loader',
          },
        ],
      },

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
      {
        test: /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins,

  output: {
    filename: 'js/[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, outputPath),
    chunkFilename: 'js/[name].[chunkhash].min.js',
    // pathinfo: false
  },
}

module.exports = merge.smart(common, proConfig)
