import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../config/webpack.development'
import createRouter from './router'
import chalk from 'chalk'
import { prepareUrls } from 'react-dev-utils/WebpackDevServerUtils'
import applyCommonMiddleware from './common-middleware'
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'
import http from 'http'

const config = {
  protocol: process.env.HTTPS === 'true' ? 'https' : 'http',
  port: parseInt(process.env.PORT, 10) || 3000,
  host: process.env.HOST || '0.0.0.0'
}

const compiler = webpack(webpackConfig)
const app = applyCommonMiddleware(express())

app
  .use(errorOverlayMiddleware())
  .use(webpackMiddleware(compiler, {
    contentBase: '.',
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    noInfo: true,
    compress: true,
    hot: true,
    clientLogLevel: 'none'
  }))
  .use(hotMiddleware(compiler))

createRouter(app, [ '/main.js' ])
const urls = prepareUrls(config.protocol, config.host, config.port)
const server = http.createServer(app)
server.listen(config.port, config.host, err => {
  if (err) return console.error(err)
  console.log(chalk.cyan('\nStarting the development server...\n'))
  console.log(chalk.yellow(`\t${urls.localUrlForTerminal}\n`))
  console.log(chalk.yellow(`\t${urls.lanUrlForTerminal}\n`))
  ;[ 'SIGINT', 'SIGTERM' ].forEach(sig => {
    process.on(sig, () => {
      console.log(chalk.red('Shutting down...'))
      server.close()
      process.exit()
    })
  })
})
