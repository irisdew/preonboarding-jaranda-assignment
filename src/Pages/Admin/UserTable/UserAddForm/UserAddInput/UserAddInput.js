import React from 'react'
import styled from 'styled-components'

export default function UserAddInput({ data }) {
  return (
    <InputContainer>
      <div>
        <span>{data[0]}</span>
      </div>
      <input placeholder={`${data[1]}`} />
    </InputContainer>
  )
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  margin: 10px;

  div {
    display: flex;
    justify-content: center;
    width: 20%;
    min-width: 90px;
  }

  input {
    padding: 0 10px;
    width: 200px;
    height: 40px;
    border: 1px solid #cbcbcb;
  }
`
