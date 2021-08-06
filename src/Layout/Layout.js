import React from 'react'
import styled, { ThemeProvider } from 'styled-components/macro'

import Header from 'Layout/Header'
import Footer from 'Layout/Footer'
import { theme } from 'Styles/Theme'

export default function Layout({ children, footerColor, header, footer }) {
  return (
    <ThemeProvider theme={theme}>
      {header && <Header />}
      <StyledMain header={header} footer={footer}>
        {children}
      </StyledMain>
      {footer && <Footer color={footerColor} />}
    </ThemeProvider>
  )
}

Layout.defaultProps = {
  footerColor: 'green',
}

const StyledMain = styled.main.attrs(({ header, footer }) => ({
  paddingTop: header ? '6.3rem' : null,
  tabletPaddingTop: header ? '4.8rem' : null,
  minHeight: footer ? 'calc(100vh - 49.3rem)' : '100vh',
}))`
  width: 100%;
  min-height: ${({ minHeight }) => minHeight};
  padding-top: ${({ paddingTop }) => paddingTop};
  background-color: ${({ theme }) => theme.color.white};
  @media screen and ${({ theme }) => theme.device.tablet} {
    padding-top: ${({ tabletPaddingTop }) => tabletPaddingTop};
  }
`
