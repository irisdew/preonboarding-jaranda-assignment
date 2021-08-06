import React, { useState } from 'react'
import styled from 'styled-components'

export default function UserAddInput({ dataTemplate, handleNewUserInfo }) {
  const [inputValue, setInputValue] = useState('')

  const handleBlurInput = ({ target: { value } }) => {
    handleNewUserInfo(dataTemplate[0], value)
  }
  return (
    <InputContainer>
      <div>
        <span>{dataTemplate[0]}</span>
      </div>
      <input
        placeholder={`${dataTemplate[1]}`}
        value={inputValue}
        onChange={({ target: { value } }) => setInputValue(value)}
        onBlur={handleBlurInput}
      />
    </InputContainer>
  )
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  margin: 10px;

  @media ${(props) => props.theme.device.tablet} {
    width: 100%;
    margin: 5px;
  }

  div {
    display: flex;
    justify-content: center;
    width: 20%;
    min-width: 100px;

    span {
      font-weight: 600;
    }
  }

  input {
    padding: 0 10px;
    width: 80%;
    height: 40px;
    border: 1px solid #cbcbcb;
  }
`
