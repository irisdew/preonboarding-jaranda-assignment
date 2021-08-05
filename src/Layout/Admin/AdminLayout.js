import React from 'react'
import styled, { ThemeProvider } from 'styled-components/macro'

import Header from 'Layout/Header'
import { theme } from 'Styles/Theme'

export default function AdminLayout({ children, header }) {
  return (
    <ThemeProvider theme={theme}>
      {header && <Header />}
      <StyledMain header={header}>{children}</StyledMain>
    </ThemeProvider>
  )
}

const StyledMain = styled.main.attrs(({ header }) => ({
  padding: header ? '6.3rem' : null,
  tabletPadding: header ? '4.8rem' : null,
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding-top: ${({ padding }) => padding};
  background-color: ${({ theme }) => theme.color.white};
  @media screen and ${({ theme }) => theme.device.tablet} {
    padding-top: ${({ tabletPadding }) => tabletPadding};
  }
`
