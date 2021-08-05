import React from 'react'
import styled from 'styled-components'

export default function EmptyRow() {
  return (
    <Tr>
      <Td>검색 결과가 없습니다.</Td>
    </Tr>
  )
}

const Tr = styled.tr`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Td = styled.td`
  font-size: 24px;
  font-weight: bold;
`
