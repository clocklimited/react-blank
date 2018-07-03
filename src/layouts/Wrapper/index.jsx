import React from 'react'
import { node } from 'prop-types'

const Wrapper = ({ children }) =>
  <div>
    <nav>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>More</li>
      </ul>
    </nav>
    {children}
  </div>

Wrapper.propTypes = {
  children: node
}

export default Wrapper
