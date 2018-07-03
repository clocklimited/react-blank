import React, { Fragment } from 'react'
import { node } from 'prop-types'

const Main = ({ children }) =>
  <Fragment>
    {children}
  </Fragment>

Main.propTypes = {
  children: node
}

export default Main
