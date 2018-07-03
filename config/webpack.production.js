const merge = require('webpack-merge')
const app = require('./webpack.app')
const Visualizer = require('webpack-visualizer-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const paths = require('./paths')

process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'
module.exports = merge(app, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(paths.appBuild, {
      root: paths.projectRoot
    }),
    new Visualizer({
      filename: 'webpack-stats.html'
    }),
    new UglifyJSPlugin({
      cache: true,
      parallel: true
    })
  ]
})
