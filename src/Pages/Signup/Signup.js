import React, { useState } from 'react'
import styled from 'styled-components/macro'

import Layout from 'Layout/Layout'
import CustomInput from 'Components/Form/CustomInput'
import Button from 'Components/Form/Button'
import PasswordPolicy from 'Components/PasswordPolicy/PasswordPolicy'
import Address from 'Components/Address/Address'
import CardPopup from 'Pages/Signup/CardPopup'
import Toast from 'Components/Toast/Toast'
import useToast from 'Utils/Hooks/useToast'
import validation from 'Utils/Validation/Validation'
import { useInput } from 'Utils/Hooks/useInput'
import { usePopup } from 'Pages/Signup/usePopup'

export default function Signup() {
  const { isShow, message, toast } = useToast()

  const [pass, , onChangePass] = useInput('')
  const [passConfirm, , onChangePassConfirm] = useInput('')
  const [passPolicy, setPassPolicy] = useState({
    numeric: false,
    special: false,
    alphabet: false,
    eight: false,
  })
  const [post, setPost] = useInput('')
  const [addr, setAddr] = useInput('')
  const [extraAddr, setExtraAddr, onChangeExtraAddr] = useInput('')
  const [cardNum, setCardNum] = useState('카드 번호')
  // 카드 입력 모달 창
  const [showPopup, setPopup, openPopup, closePopup] = usePopup()

  // 비밀번호와 비밀번호확인이 일치하지 않을 때
  const checkPassWord = () => {
    if (pass !== passConfirm) {
      toast('비밀번호가 일치하지 않습니다!')
    }
  }

  // 이름, 나이 validation
  const [inputs, setInputs] = useState({
    name: '',
    age: '',
  })
  const { name, age } = inputs
  const checkValidation = (event) => {
    const { name, value } = event.target

    if (name === 'name') {
      if (validation.isNotKorean(value)) {
        toast('이름을 한글로 입력해주세요!')
        return
      }
    }
    if (name === 'age') {
      if (validation.isNotNumeric(value)) {
        toast('숫자만 입력해주세요!')
        return
      }
    }
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  // 비밀번호 validation
  const checkPasswordPolicy = (password) => {
    const { isNumeric, isSpecialCharacter, isAlphabet, isOverEight } =
      validation
    const currentPassPolicy = {
      numeric: isNumeric(password),
      special: isSpecialCharacter(password),
      alphabet: isAlphabet(password),
      eight: isOverEight(password),
    }
    setPassPolicy(currentPassPolicy)
    const validated = Object.values(currentPassPolicy).every((item) => item)
    validated || toast('비밀번호 규칙에 맞는 비밀번호를 입력해주세요')
  }

  const onCardSubmit = (cardData, close) => {
    setCardNum(cardData)
    setPopup(close)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    const userInfo = {
      ...inputs,
      pass,
      passConfirm,
      post,
      addr,
      extraAddr,
      cardNum,
    }

    console.log('userInfo', userInfo)
  }

  return (
    <Layout>
      <FormSection>
        <FormTitle>
          <div>간편하게 회원가입하고</div>
          <div>자란다를 이용해보세요</div>
        </FormTitle>
        <Input type="text" placeholder="이메일" />
        <Input
          type="password"
          placeholder="비밀번호"
          value={pass}
          onChange={onChangePass}
          onBlur={(e) => checkPasswordPolicy(e.target.value)}
        />
        <PasswordPolicy passPolicy={passPolicy} />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          onBlur={checkPassWord}
          value={passConfirm}
          onChange={onChangePassConfirm}
        />
        <Input
          type="text"
          name="name"
          placeholder="이름"
          value={name}
          onChange={checkValidation}
        />
        <Input
          type="text"
          name="age"
          placeholder="나이"
          value={age}
          onChange={checkValidation}
        />
        <InputTitle>주소</InputTitle>
        <Address
          post={post}
          setPost={setPost}
          addr={addr}
          setAddr={setAddr}
          extraAddr={extraAddr}
          setExtraAddr={setExtraAddr}
          onChangeExtraAddr={onChangeExtraAddr}
        />
        <InputTitle>결제 정보</InputTitle>
        <FlexDiv>
          <Input type="text" value={cardNum} placeholder="{cardNum}" disabled />
          <SmallButton clickHandler={openPopup} type="button">
            카드 입력하기
          </SmallButton>
        </FlexDiv>
        <InputTitle>회원 유형을 선택해주세요</InputTitle>
        <Radio type="radio" name="role" id="radio_student" />
        <Label htmlFor="radio_student">학생</Label>
        <Radio type="radio" name="role" id="radio_parent" />
        <Label htmlFor="radio_parent">학부모님</Label>
        <Radio type="radio" name="role" id="radio_teacher" />
        <Label htmlFor="radio_teacher">선생님</Label>
        <LongButton clickHandler={onSubmitHandler}>가입하기</LongButton>
        {showPopup ? (
          <>
            <CardPopup onSubmit={onCardSubmit} />
            <Background onClick={closePopup} />
          </>
        ) : null}
        <Toast message={message} isShow={isShow} />
      </FormSection>
    </Layout>
  )
}

const FormSection = styled.form`
  width: 45rem;
  margin: 0 auto;
`

const FormTitle = styled.div`
  font-size: 2.4rem;
  margin: 10rem 0 3rem;
`

export const InputTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  margin: 1rem 0;
`

export const FlexDiv = styled.div`
  display: flex;
`

export const Input = styled(CustomInput)`
  margin-bottom: 1rem;
  :hover,
  :focus {
    color: #0085fd;
    border: solid 1px #0085fd;
    background-color: rgba(0, 133, 253, 0.1);
  }
`

const Radio = styled.input`
  /* height: 1rem; */
`

const Label = styled.label`
  margin: 0 4rem 0 0.8rem;
`

export const LongButton = styled(Button)`
  width: 100%;
  margin-top: 5rem;
  background-color: #0085fd;
`

export const SmallButton = styled(Button)`
  width: 30rem;
  margin-left: 1rem;
  background-color: #0085fd;
  border-radius: 0.2rem;
`
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.15);
  z-index: 1;
`
