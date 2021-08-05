import React from 'react'
import styled from 'styled-components'

import Layout from 'Layout/Layout'

export default function NotFound() {
  return (
    <Layout header footer>
      <StyledMain>
        <p>해당 페이지를 찾을 수 없습니다</p>
      </StyledMain>
    </Layout>
  )
}

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 49.3rem);
  padding-top: 6.3rem;
  background-color: #fff;
  @media screen and ${({ theme }) => theme.device.tablet} {
    padding-top: 4.8rem;
  }

  p {
    font-size: 5rem;
  }
`
