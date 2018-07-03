const webpack = require('@storybook/core/node_modules/webpack')
const responsiveLoaderSharpe = require('responsive-loader/sharp')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(gif|jpe?g|png|svg)(\?.*)?$/,
        loader: 'responsive-loader',
        options: {
          adapter: responsiveLoaderSharpe
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.WEBPACK': JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
