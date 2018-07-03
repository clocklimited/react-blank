import React from 'react'
import PropTypes from 'prop-types'
const Html = ({ helmet, appHtml, scripts = [], stylesheets = [], styles }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent()
  const bodyAttrs = helmet.bodyAttributes.toComponent()
  return (
    <html {...htmlAttrs}>
      <head>
        <meta name='theme-color' content='#ffffff' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='shortcut icon' href='/meta/favicon.ico' />
        <link rel='apple-touch-icon-precomposed' sizes='76x76' href='/meta/apple-touch-icon-precomposed-76x76.png' />
        <link rel='apple-touch-icon-precomposed' sizes='120x120' href='/meta/apple-touch-icon-precomposed-120x120.png' />
        <link rel='apple-touch-icon-precomposed' sizes='152x152' href='/meta/apple-touch-icon-precomposed-152x152.png' />
        <link rel='apple-touch-icon-precomposed' sizes='180x180' href='/meta/apple-touch-icon-precomposed-180x180.png' />

        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {styles}
      </head>
      <body {...bodyAttrs}>
        <div id='root' dangerouslySetInnerHTML={{ __html: appHtml }} />
        {scripts.map(src => <script key={`script:${src}`} src={src} />)}
      </body>
    </html>
  )
}

Html.propTypes = {
  helmet: PropTypes.object.isRequired,
  appHtml: PropTypes.string,
  scripts: PropTypes.arrayOf(PropTypes.string),
  stylesheets: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.string
}

export default Html
