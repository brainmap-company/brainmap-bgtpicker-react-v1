// GlobalStyle.js
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import 'flatpickr/dist/flatpickr.min.css'

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body {
    min-width: 1360px;
    background-color: #272939;
  }
  a {
    text-decoration: none;
  }
`

export default GlobalStyle
