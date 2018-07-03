const { resolve } = require('path')
module.exports = {
  appSrc: resolve(__dirname, '../src'),
  appIndexJs: resolve(__dirname, '../src/index.jsx'),
  appBuild: resolve(__dirname, '../build'),
  projectRoot: resolve(__dirname, '..'),
  appUrlPath: '/',
  staticFiles: resolve(__dirname, '../static')
}
