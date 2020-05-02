import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    src: url(https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200&display=swap);
  }
  body {
    font-family: 'Noto Serif JP', serif;
  }

  @media screen and (max-width: 1024px) {
      #desktoppc {
          display:none;
      }

      #mobilepc {
          display:block;
      }
  }
`
