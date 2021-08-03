import React from 'react'
import styled from 'styled-components'

export default function UserCell({ data }) {
  return <Td>{data}</Td>
}

const Td = styled.td`
  padding: 0 20px;
  height: 50px;
  border: 1px solid #cbcbcb;
  text-align: center;
  line-height: 50px;
`
