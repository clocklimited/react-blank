import React from 'react'
import webpack from 'webpack'
import webpackConfig from '../config/webpack.production'
import Helmet from 'react-helmet'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import StaticRouter from 'react-router-dom/StaticRouter'
import { renderRoutes } from 'react-router-config'
import { writeFile } from 'fs'
import mkdirp from 'mkdirp'
import paths from '../config/paths'
import Html from '../src/Html'
import copydir from 'copy-dir'
import { promisify } from 'util'
import routes from '../src/routes'

const sheet = new ServerStyleSheet()
const asyncWriteFile = promisify(writeFile)
const asyncMkdirp = promisify(mkdirp)

const renderRoute = async ({ path, scripts }) => {
  const context = {}
  const helmet = Helmet.renderStatic()
  const appHtml = renderToString(
    sheet.collectStyles(
      <StaticRouter location={path} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>))

  const criticalCss = sheet.getStyleElement()
  const html = renderToString(<Html helmet={helmet} appHtml={appHtml} styles={criticalCss} scripts={scripts} />)
  const filepath = paths.appBuild + path
  await asyncMkdirp(filepath)
  await asyncWriteFile(filepath + '/index.html', '<!DOCTYPE html>' + html)
}

const generatorStaticHtml = async () => {
  // Shouldn't require inside function scope.
  const manifest = require('../build/manifest.json')
  const scripts = [ manifest['main.js'] ]

  return Promise.all(routes[0].routes.filter(({ path }) => path !== '**')
    .map(({ path }) => renderRoute({ path, scripts })))
}
webpack(webpackConfig, async (err, stats) => {
  if (err || stats.hasErrors()) {
    return console.error(err, stats)
  }
  console.log(stats.toString({
    chunks: false,  // Makes the build much quieter
    colors: true    // Shows colors in the console
  }))
  generatorStaticHtml()
  copydir.sync(paths.staticFiles, paths.appBuild)
  console.log('Static files copied')
})
