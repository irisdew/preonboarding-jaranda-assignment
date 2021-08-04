import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useInput } from 'Utils/Hooks/useInput'
import { usePopup } from 'Pages/Signup/usePopup'
import { FlexDiv, Input, InputTitle, LongButton } from 'Pages/Signup/Signup'

export default function CardPopup(props) {
  const NOT_NUMBER = /[^0-9]/gi

  //카드 정보 입력 (숫자인지 확인 && 4글자 까지만 입력 가능)
  const [inputs, setInputs] = useState({
    card1: '',
    card2: '',
    card3: '',
    card4: '',
  })
  const { card1, card2, card3, card4 } = inputs

  const onChange = (event) => {
    const { name, value } = event.target

    if (NOT_NUMBER.test(value)) {
      alert('숫자만 입력하세요')
    } else if (value.length <= 4) {
      setInputs({
        ...inputs,
        [name]: value,
      })
    }
  } //onChange

  const SubmitCardInfo = () => {
    const cardNum = card1 + '-' + card2 + '-' + card3 + '-' + card4
    props.onSubmit(cardNum, false)
  }

  return (
    <>
      <Wrapper>
        <InputTitle>카드 정보를 입력해주세요</InputTitle>
        <FlexDiv>
          <CardInput
            type="text"
            name="card1"
            value={card1}
            onChange={onChange}
          />
          <CardInput
            type="text"
            name="card2"
            value={card2}
            onChange={onChange}
          />
          <CardInput
            type="text"
            name="card3"
            value={card3}
            onChange={onChange}
          />
          <CardInput
            type="text"
            name="card4"
            value={card4}
            onChange={onChange}
          />
        </FlexDiv>
        <LongButton onClick={SubmitCardInfo}>입력하기</LongButton>
      </Wrapper>
    </>
  )
}

const CardInput = styled.input`
  margin: 0 0.5rem;
  text-align: center;
  width: 5rem;
  height: 5rem;
  border: 1px solid black;
`

// const CardInput = styled(Input)`
//   margin: 0 0.5rem;
//   text-align: center;
// `

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
