import React from 'react'
import { string, node } from 'prop-types'

const Hoozit = ({ title, children, onClick }) =>
  <div onClick={onClick}>
    {title && <h1 onClick={onClick}>{title}</h1>}
    {children}
  </div>

Hoozit.propTypes = {
  title: string,
  children: node
}

export default Hoozit
