import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    font-size: 62.5%;
  }
  
  html {
    font-size: 62.5%;
  }
  
  html {
    font-size: 62.5%;
  }
  
  body {
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
    font-size: 14px;
    line-height: 1.43;
    color: #484848;
    background-color: #fff;
  }
  
  a, a:hover, a:focus {
    color: inherit;
    text-decoration: none;
    /* cursor: pointer; */
  }

  input,textarea {
    outline: none;
    border: 0;
    background-color: transparent;
  }

  button {
    background-color: transparent;
    border: none;
    outline: none;
    /* cursor: pointer; */
  }

  ol, ul, li {
    list-style: none;
  }

  img {
    width: 100%;
  }

  [tabindex]:focus-visible,
  label:focus-visible,
  button:focus-visible{
    outline: none;
    box-shadow: 0 0 0 3px rgba(0,0,0, 0.65);
  }
  
  .a11y {
    overflow: hidden;
    position: absolute;
    border: 0;
    width: 1px;
    height: 1px;
    clip: rect(1px, 1px, 1px, 1px);
  }
`

export default GlobalStyle
