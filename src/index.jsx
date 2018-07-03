import './lib/polyfills'
import React from 'react'
import { render } from 'react-dom'
import AppRoot from './App'

const renderApp = App => render(
  <App />
, document.getElementById('root'))

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    console.log('Hot App Routes')
    renderApp(require('./App.jsx').default)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp(AppRoot)
})
