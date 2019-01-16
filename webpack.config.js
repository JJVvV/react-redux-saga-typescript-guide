const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const tsImportPluginFactory = require('ts-import-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const pck = require('./package.json')
const outputPath = 'dist'

const bundleDll = 'bundle_dll'
const extractCSS = new MiniCssExtractPlugin({
  filename: '[name].css',
})

const env = process.env

const PORT = pck.port || 3004

const loaders = [
  {
    test: /\.scss$/,
    exclude: [/\.m\.scss$/, /\.mts\.scss$/, /node_modules/],
    include: [path.resolve(__dirname, 'src')],
    use: [
      // 'cache-loader',
      'css-hot-loader',
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  },
  {
    test: /\.mts\.scss$/,
    exclude: /node_modules/,
    include: [path.resolve(__dirname, 'src')],
    use: [
      // 'cache-loader',
      'css-hot-loader',
      MiniCssExtractPlugin.loader,
      {
        loader: 'typings-for-css-modules-loader',
        options: {
          modules: true,
          namedExport: true,
          camelCase: true,
          localIdentName: '[local]_[hash:base64:5]',
          sass: true,
          sourceMap: true,
        },
      },

      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  },

  {
    test: /\.m\.scss$/,
    exclude: /node_modules/,
    include: [path.resolve(__dirname, 'src')],
    use: [
      // 'cache-loader',
      'css-hot-loader',
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: true,
          localIdentName: '[local]_[hash:base64:5]',
          camelCase: true,
          sass: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  },

  {
    test: /\.less$/,
    use: [
      // 'cache-loader',
      'css-hot-loader',
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: false,
        },
      },
      {
        loader: 'less-loader',
        options: {
          sourceMap: false,
          // modifyVars: theme,
        },
      },
    ],
  },

  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    include: [path.resolve(__dirname, 'src')],
    use: [
      'cache-loader',
      'babel-loader',
      {
        loader: 'ts-loader',
        options: {
          // transpileOnly: true,
          onlyCompileBundledFiles: true,
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
            module: 'esnext',
          },
        },
      },
    ],
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    include: [path.resolve(__dirname, 'src')],

    use: [
      'cache-loader',
      {
        loader: 'babel-loader?cacheDirectory',
        options: {
          sourceMap: true,
        },
      },
    ],
  },

  {
    test: /iconfont.(ttf|eot|woff|woff2|svg)$/,
    use: {
      loader: 'file-loader',
    },
  },
  {
    test: /\/img\/.+\.(png|svg|jpe?g|gif)$/,
    exclude: /iconfont.(ttf|eot|woff|woff2|svg)$/,
    use: [
      'file-loader?limit=8192&name=images/[name]_[hash:base64:5].[ext]&publicPath=/',
      {
        loader: 'image-webpack-loader',
      },
    ],
  },
  {
    test: /\.(html)$/,
    exclude: /node_modules/,
    include: [path.resolve(__dirname, 'src')],
    use: {
      loader: 'html-loader',
      options: {
        attrs: [':data-src'],
      },
    },
  },
]

const currentUrl = (url) => path.join(__dirname, url)

const plugins = [
  extractCSS,
  new HtmlWebpackPlugin({
    title: '首页',
    chunks: ['app'],
    filename: 'index.html',
    template: '!html-loader!./src/templates/container.html',
  }),

  new webpack.HotModuleReplacementPlugin(),
]

const devConfig = {
  mode: 'development',
  entry: {
    app: [
      `webpack-dev-server/client?http://0.0.0.0:${PORT}`,
      'webpack/hot/only-dev-server',
      './src/pages/index.tsx',
    ],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    hot: true,
    port: PORT,
  },
  module: {
    rules: loaders,
  },
  plugins: plugins,

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, outputPath),
    chunkFilename: '[name].min.js',
    // pathinfo: false
  },
}

const { writeFile } = require('./tools/utils/file')
module.exports = merge.smart(common, devConfig)
