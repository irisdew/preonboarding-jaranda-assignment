import React from 'react'
import styled from 'styled-components'

export default function UserCategoryRow() {
  return (
    <thead>
      <tr>
        <Th></Th>
        <Th>이메일</Th>
        <Th>이름</Th>
        <Th>나이</Th>
        <Th>우편번호</Th>
        <Th>주소</Th>
        <Th>상세주소</Th>
        <Th>카드정보</Th>
        <Th>권한</Th>
      </tr>
    </thead>
  )
}

const Th = styled.th`
  height: 50px;
  border: 1px solid #cbcbcb;
  background: #e8e3f3;
  text-align: center;
  line-height: 50px;
  font-weight: bold;
`
