import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

import { toastMsg } from 'Constant'
import validation from 'Utils/Validation/Validation'
import useToast from 'Utils/Hooks/useToast'
import Toast from 'Components/Toast/Toast'
import CustomInput from 'Components/Form/CustomInput'
import { FlexDiv, InputTitle, LongButton } from 'Pages/Signup/Signup'

export default function CardPopup(props) {
  const { isShow, message, toast } = useToast()
  const cardInputs = useRef(null)

  const [cardNums, setCardNums] = useState({
    card1: '',
    card2: '',
    card3: '',
    card4: '',
  })
  const { card1, card2, card3, card4 } = cardNums

  const setInitialFocus = () => {
    cardInputs.current.firstChild.focus()
  }
  useEffect(setInitialFocus, [])

  const moveFocus = (tempInput) => {
    tempInput.nextElementSibling && tempInput.nextElementSibling.focus()
  }

  const resetInput = (event) => {
    setCardNums({
      ...cardNums,
      [event.target.name]: '',
    })
  }

  const failedValidation = (value) => {
    return validation.isNotNumeric(value)
  }

  const onChange = (event) => {
    const tempInput = event.target
    if (failedValidation(tempInput.value)) {
      toast(toastMsg.ISNOT_NUMERIC)
      return
    }

    if (tempInput.value.length === 4) {
      moveFocus(tempInput)
    }

    if (tempInput.value.length <= 4) {
      setCardNums({
        ...cardNums,
        [tempInput.name]: tempInput.value,
      })
    }
  } //onChange

  const combineCardNums = () => {
    let cardNum = ''
    for (let key in cardNums) {
      if (cardNums[key].length !== 4) {
        toast(toastMsg.CARD_BLANK)
        return
      }
      cardNum === ''
        ? (cardNum += cardNums[key])
        : (cardNum += '-' + cardNums[key])
    }
    return cardNum
  }

  const submitCardInfo = (event) => {
    event.preventDefault()
    const combinedCardNum = combineCardNums()
    props.onSubmit(combinedCardNum, false)
  }

  return (
    <>
      <Wrapper>
        <InputTitle>카드 정보를 입력해주세요</InputTitle>
        <FlexDiv ref={cardInputs}>
          <CardInput
            type="text"
            name="card1"
            value={card1}
            onChange={onChange}
            onClick={resetInput}
          />
          <CardInput
            type="text"
            name="card2"
            value={card2}
            onChange={onChange}
            onClick={resetInput}
          />
          <CardInput
            type="text"
            name="card3"
            value={card3}
            onChange={onChange}
            onClick={resetInput}
          />
          <CardInput
            type="text"
            name="card4"
            value={card4}
            onChange={onChange}
            onClick={resetInput}
          />
        </FlexDiv>
        <LongButton clickHandler={submitCardInfo}>입력하기</LongButton>
        <StyledToast message={message} isShow={isShow} />
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

const StyledToast = styled(Toast)`
  top: 45%;
`
