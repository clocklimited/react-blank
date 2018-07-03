import React from 'react'
import webpack from 'webpack'
import webpackConfig from '../config/webpack.production'
import Helmet from 'react-helmet'
import { renderToString } from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter'
import { renderRoutes } from 'react-router-config'
import { writeFileSync } from 'fs'
import mkdirp from 'mkdirp'
import paths from '../config/paths'
import routes from '../src/routes'
import Html from '../src/Html'
import copydir from 'copy-dir'

const renderRoute = ({ path, styles, scripts }) => {
  const context = {}
  const helmet = Helmet.renderStatic()
  const appHtml = renderToString(
    <StaticRouter location='/' context={context}>
      {renderRoutes(routes)}
    </StaticRouter>)

  const html = renderToString(<Html helmet={helmet} appHtml={appHtml} styles={styles} scripts={scripts} />)
  const filepath = paths.appBuild + path
  mkdirp.sync(filepath)
  writeFileSync(filepath + '/index.html', html)
}

const generatorStaticHtml = () => {
  // Shouldn't require inside function scope.
  const manifest = require('../build/manifest.json')
  const scripts = [ manifest['main.js'] ]
  const styles = [ manifest['main.css'] ]
  renderRoute({ path: '/', styles, scripts })
}
webpack(webpackConfig, (err, stats) => {
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
