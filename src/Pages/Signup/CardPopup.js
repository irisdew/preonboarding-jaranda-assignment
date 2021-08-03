import React from 'react'
import styled from 'styled-components'
import { FlexDiv, Input, InputTitle, LongButton } from 'Pages/Signup/Signup'

export default function CardPopup() {
  return (
    <>
      <Wrapper>
        <InputTitle>카드 정보를 입력해주세요</InputTitle>
        <FlexDiv>
          <Input type="text" />
          <Input type="text" />
          <Input type="text" />
          <Input type="text" />
        </FlexDiv>
        <LongButton>입력하기</LongButton>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 40rem;
  position: fixed;
  top: 40%;
  left: calc(50% - (40rem / 2));
  text-align: center;
  background-color: white;
  box-shadow: 0 0rem 2.5rem -0.8rem rgba(0, 0, 0, 0.5);
  font-size: 2rem;
  padding: 2rem;
  z-index: 999;
`
