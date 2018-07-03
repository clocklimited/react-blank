import express from 'express'
import { join } from 'path'
import createRouter from './router'
import chalk from 'chalk'
import manifest from '../build/manifest.json'
import applyCommonMiddleware from './common-middleware'

const config = {
  protocol: process.env.HTTPS === 'true' ? 'https' : 'http',
  port: parseInt(process.env.PORT, 10) || 3000,
  host: process.env.HOST || '0.0.0.0'
}

const app = applyCommonMiddleware(express())
  .use('/static', express.static(join(__dirname, '/../build/static')))

createRouter(app, [ manifest['main.js'] ])
app.listen(config.port, config.host, err => {
  if (err) return console.error(err)
  console.log(chalk.cyan('Starting the production server...\n'))
  console.log(chalk.yellow(`${config.protocol}://${config.host}:${config.port}\n`))
})
