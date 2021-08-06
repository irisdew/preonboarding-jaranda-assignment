import React from 'react'
import styled from 'styled-components'

import Layout from 'Layout/Layout'

export default function EtcPage({ content }) {
  return (
    <Layout header footer>
      <StyledMain>
        <p>{content}</p>
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
