import React from 'react'
import ReactDOM from 'react-dom'

import Routes from 'Routes'
import GlobalStyle from 'Styles/GlobalStyle'
import Timer from 'Utils/Timer'

ReactDOM.render(
  <>
    <GlobalStyle />
    <Routes />
  </>,
  document.getElementById('root')
)
// Timer()
