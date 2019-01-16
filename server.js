// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack')
// eslint-disable-next-line import/no-extraneous-dependencies
const WebpackDevServer = require('webpack-dev-server')
let config = require('./webpack.config')
const mock = require('./tools/utils/mock')
const pck = require('./package.json')

if (typeof config === 'function') {
  config = config(process.env)
}

const URL = pck.proxy
const ifMock = pck.mock

console.log('是否开启mock: ', ifMock)
console.log('代理地址：', URL)
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: config.devServer.hot,
  historyApiFallback: config.devServer.historyApiFallback,
  stats: {
    children: false,

    assets: true,
    assetsSort: 'field',
    // chunks: false,
    // hash: false,
    modules: false,

    // publicPath: false,
    timings: true,
    // version: false
    cached: true,
    cachedAssets: false,
    errors: true,
    // warnings: true,
    colors: {
      green: '\u001b[32m',
    },
  },

  watchOptions: {
    aggregateTimeout: 500,
    ignored: /node_modules/,
    poll: true,
  },
  before(app) {
    if (ifMock) {
      mock(app, './mock')
    }
  },
  proxy: [
    {
      context: ['/'],
      target: URL,
      secure: false,
      changeOrigin: false,
    },
  ],
}).listen(config.devServer.port, 'localhost', (err) => {
  if (err) {
    return console.log(err)
  }
  console.log(`Listening at http://localhost:${config.devServer.port}/`)
  console.log('Wait...')
})
