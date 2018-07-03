const merge = require('webpack-merge')
const base = require('./webpack.base')
const paths = require('./paths')

// Common config that is share when running the app in both development and production
module.exports = merge(base, {
  entry: {
    main: [ paths.appIndexJs ]
  },
  output: {
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: '[name].[hash].js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: paths.appUrlPath,
    path: paths.appBuild
  }
})
