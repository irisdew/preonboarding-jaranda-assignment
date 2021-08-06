import React from 'react'
import styled from 'styled-components'

import Layout from 'Layout/Layout'

export default function EtcPage({ content }) {
  return (
    <Layout header footer>
      <StyledTitle>{content}</StyledTitle>
    </Layout>
  )
}

const StyledTitle = styled.h2`
  padding-top: 9rem;
  font-size: 5rem;
  text-align: center;
`
