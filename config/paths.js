const { resolve } = require('path')
const fs = require('fs')
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => resolve(appDirectory, relativePath)

module.exports = {
  appSrc: resolveApp('src'),
  appIndexJs: resolveApp('src/index.jsx'),
  appBuild: resolveApp('build'),
  projectRoot: resolveApp(''),
  appUrlPath: '/',
  staticFiles: resolveApp('static')
}
