import React from 'react'
import Helmet from 'react-helmet'
import { renderToString } from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter'
import { renderRoutes } from 'react-router-config'
import Html from '../src/Html'
import { ServerStyleSheet } from 'styled-components'

const createRouter = (app, scripts) => {
  app.use((req, res, next) => {
    const context = {}
    let html
    const helmet = Helmet.renderStatic()

    if (process.env.NODE_ENV === 'production') {
      const sheet = new ServerStyleSheet()
      const appHtml = renderToString(sheet.collectStyles(
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(require('../src/routes'))}
        </StaticRouter>))
      const styles = sheet.getStyleElement()
      html = renderToString(<Html helmet={helmet} appHtml={appHtml} scripts={scripts} styles={styles} />)
    } else {
      html = renderToString(<Html helmet={helmet} scripts={scripts} />)
    }

    if (context.url) {
      res.redirect(context.url)
    } else {
      res.send('<!DOCTYPE html>' + html)
    }
  })
}

export default createRouter
