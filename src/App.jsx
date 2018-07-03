import React from 'react'
import Home from './views/Home'
import { injectGlobal } from 'styled-components'
import { Provider } from 'rebass'

injectGlobal`
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 10px;
  }
`

const App = () =>
  <Provider>
    <Home />
  </Provider>

export default App
