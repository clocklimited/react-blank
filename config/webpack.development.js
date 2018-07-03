const webpack = require('webpack')
const merge = require('webpack-merge')
const app = require('./webpack.app')
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

module.exports = merge(app, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    main: [ 'webpack-hot-middleware/client' ]
  },
  output: {
    filename: '[name].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false
  }
})
