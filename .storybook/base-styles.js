import { injectGlobal } from 'styled-components'
import baseStyles from '../src/util/base-styles'

const storybookStyles = ({ theme }) => injectGlobal`
  * {
    box-sizing: border-box;
  }
  body {
    background-color: transparent;
    background: linear-gradient(to bottom, #ddd 0%, rgba(255, 255, 255, 0.5) 10%),
    linear-gradient(to left, #ddd 0%, rgba(255, 255, 255, 0.5) 10%);
    background-size: ${theme.spacing.default}px ${theme.spacing.default}px;
  }
  body > #root {
    height: 100%;
  }
  ${baseStyles({ theme })}
`

export default storybookStyles
