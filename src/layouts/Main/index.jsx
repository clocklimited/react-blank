import React from 'react'
import { node } from 'prop-types'
import { injectGlobal } from 'styled-components'
import { Provider } from 'rebass'
import theme from '../../style/theme'

injectGlobal`
  * { box-sizing: border-box; }
  body {
    margin: 0;
  }
`

const Main = ({ children }) =>
  <Provider theme={theme}>
    {children}
  </Provider>

Main.propTypes = {
  children: node
}

export default Main
