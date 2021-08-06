import React from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.btnColor};
  border-radius: 6px;
  cursor: pointer;
`
const ButtonText = styled.div`
  margin: 9px;
  font-size: 16px;
  color: ${(props) => props.txtColor};
`
export default function Button({ text, btnColor, txtColor, onClick }) {
  return (
    <ButtonContainer btnColor={btnColor} onClick={onClick}>
      <ButtonText txtColor={txtColor}>{text}</ButtonText>
    </ButtonContainer>
  )
}
