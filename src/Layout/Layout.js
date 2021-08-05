import React from 'react'
import styled, { ThemeProvider } from 'styled-components/macro'

import Header from 'Layout/Header'
import Footer from 'Layout/Footer'
import { theme } from 'Styles/Theme'

export default function Layout({ children, footerColor }) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <StyledMain>{children}</StyledMain>
      <Footer color={footerColor} />
    </ThemeProvider>
  )
}

Layout.defaultProps = {
  footerColor: 'green',
}

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 49.3rem);
  padding-top: 6.3rem;
  background-color: ${({ theme }) => theme.color.white};
  @media screen and ${({ theme }) => theme.device.tablet} {
    padding-top: 4.8rem;
  }
`
