import React from 'react'
import styled, { ThemeProvider } from 'styled-components/macro'

import AdminHeader from 'Layout/Admin/AdminHeader'
import { theme } from 'Styles/Theme'

export default function AdminLayout({ children, header }) {
  return (
    <ThemeProvider theme={theme}>
      {header && <AdminHeader />}
      <StyledMain header={header}>{children}</StyledMain>
    </ThemeProvider>
  )
}

const StyledMain = styled.main.attrs(({ header }) => ({
  paddingTop: header ? '6.3rem' : null,
}))`
  width: 100%;
  min-height: 100vh;
  padding-top: ${({ paddingTop }) => paddingTop};
  background-color: ${({ theme }) => theme.color.white};
`
