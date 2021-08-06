import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import validation from 'Utils/Validation/Validation'
import Toast from 'Components/Toast/Toast'
import useToast from 'Utils/Hooks/useToast'
import CustomInput from 'Components/Form/CustomInput'
import { FlexDiv, InputTitle, LongButton } from 'Pages/Signup/Signup'

export default function CardPopup(props) {
  const { isShow, message, toast } = useToast()

  const cardInput1 = useRef(null)
  const cardInput2 = useRef(null)
  const cardInput3 = useRef(null)
  const cardInput4 = useRef(null)
  const cardInputs = [null, cardInput1, cardInput2, cardInput3, cardInput4]

  const [inputs, setInputs] = useState({
    card1: '',
    card2: '',
    card3: '',
    card4: '',
  })
  const { card1, card2, card3, card4 } = inputs

  const setFocus = () => {
    cardInput1.current.focus()
  }

  useEffect(setFocus, [])

  const onChange = (event) => {
    const { name, value } = event.target
    let currentCardNum = Number(name[name.length - 1])

    if (validation.isNotNumeric(value)) {
      toast('숫자만 입력하세요')
    }

    if (!validation.isNotNumeric(value) && value.length <= 4) {
      setInputs({
        ...inputs,
        [name]: value,
      })
    }

    if (value.length === 4) {
      if (currentCardNum < 4) {
        cardInputs[currentCardNum + 1].current.focus()
      }
    }
  }

  const resetInput = (event) => {
    const { name } = event.target
    setInputs({ ...inputs, [name]: '' })
  }

  const SubmitCardInfo = (event) => {
    event.preventDefault()
    if (
      card1.length !== 4 ||
      card2.length !== 4 ||
      card3.length !== 4 ||
      card4.length !== 4
    ) {
      toast('카드 정보를 정확히 입력해주세요!')
      return
    }
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
            ref={cardInput1}
            value={card1}
            onChange={onChange}
            onClick={resetInput}
          />
          <CardInput
            type="text"
            name="card2"
            ref={cardInput2}
            value={card2}
            onChange={onChange}
            onClick={resetInput}
          />
          <CardInput
            type="text"
            name="card3"
            ref={cardInput3}
            value={card3}
            onChange={onChange}
            onClick={resetInput}
          />
          <CardInput
            type="text"
            name="card4"
            ref={cardInput4}
            value={card4}
            onChange={onChange}
            onClick={resetInput}
          />
        </FlexDiv>
        <LongButton clickHandler={SubmitCardInfo}>입력하기</LongButton>
        <Toast message={message} isShow={isShow} />
      </Wrapper>
    </>
  )
}

const CardInput = styled(CustomInput)`
  margin: 0 0.5rem;
  text-align: center;
  :hover,
  :focus {
    color: ${({ theme }) => theme.color.secondary};
    border: solid 1px ${({ theme }) => theme.color.secondary};
    background-color: ${({ theme }) => theme.color.secondaryAlpha};
  }
`

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
