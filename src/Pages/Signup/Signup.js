import React, { useState } from 'react'
import styled from 'styled-components'
import PasswordPolicy from 'Components/PasswordPolicy/PasswordPolicy'
import Address from 'Components/Address/Address'
import CardPopup from 'Pages/Signup/CardPopup'
import Toast from 'Components/Toast/Toast'
import useToast from 'Utils/Hooks/useToast'
// import Button from 'Components/Button/Button'
import { useInput } from 'Utils/useInput'
import { usePopup } from 'Pages/Signup/usePopup'

export default function Signup() {
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
  //카드 입력 모달 창
  const [showPopup, setPopup, openPopup, closePopup] = usePopup()

  const { isShow, message, toast } = useToast()

  const CheckPasswordPolicy = (password) => {
    console.log('password policy: ', password)
    const numeric = /[0-9]/g
    const alphabet = /[a-z]/gi
    const special = /[~!@#$%^&*()_+|<>?:{}]/g
    const currentPassword = {}

    if (numeric.test(password)) {
      console.log('숫자')
      currentPassword.numeric = true
    }
    if (special.test(password)) {
      console.log('특수문자')
      currentPassword.special = true
      console.log(passPolicy)
    }
    if (alphabet.test(password)) {
      currentPassword.alphabet = true
      console.log('영문')
    }
    if (password.length >= 8) {
      currentPassword.eight = true
      console.log('8자리 이상')
    }

    setPassPolicy(currentPassword)
  }

  //비밀번호와 비밀번호확인이 일치하지 않을 때
  const CheckPassWord = () => {
    if (pass !== passConfirm) {
      toast('비밀번호가 일치하지 않습니다!')
    }
  }

  //카드 팝업 창 닫기, 카드정보 input에 value 설정
  const onCardSubmit = (cardData, close) => {
    setCardNum(cardData)
    setPopup(close)
  }

  // 이름, 나이 validation
  const [inputs, setInputs] = useState({
    name: '',
    age: '',
  })
  const { name, age } = inputs
  const checkValidation = (event) => {
    const NOT_NUMERIC = /[^0-9]/gi //숫자가 아닌 경우
    const HANGUL = /[^ㄱ-ㅎㅏ-ㅣ가-힣]/gi //한글이 아닌 경우

    const { name, value } = event.target

    if (name === 'name') {
      if (HANGUL.test(value)) {
        toast('한글로 입력해주세요!')
        return
      }
    }
    if (name === 'age') {
      if (NOT_NUMERIC.test(value)) {
        toast('숫자만 입력해주세요!')
        return
      }
    }
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  return (
    <FormSection>
      <FormTitle>
        <div>간편하게 회원가입하고</div>
        <div>자란다를 이용해보세요</div>
      </FormTitle>
      <form action="">
        <ul>
          <li>
            <Input type="text" placeholder="이메일" />
          </li>
          <li>
            <Input
              type="password"
              placeholder="비밀번호"
              value={pass}
              onChange={onChangePass}
              onBlur={(e) => CheckPasswordPolicy(e.target.value)}
            />
            <PasswordPolicy passPolicy={passPolicy} />
            <Input
              type="password"
              placeholder="비밀번호 확인"
              onBlur={CheckPassWord}
              value={passConfirm}
              onChange={onChangePassConfirm}
            />
          </li>
          <li>
            <Input
              type="text"
              name="name"
              placeholder="이름"
              value={name}
              onChange={checkValidation}
            />
          </li>
          <li>
            <Input
              type="text"
              name="age"
              placeholder="나이"
              value={age}
              onChange={checkValidation}
            />
          </li>
          <li>
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
          </li>
          <li>
            <InputTitle>결제 정보</InputTitle>
            <FlexDiv>
              <Input
                type="text"
                value={cardNum}
                placeholder="{cardNum}"
                disabled
              />
              <SmallButton onClick={openPopup}>카드 입력하기</SmallButton>
            </FlexDiv>
          </li>
          <li>
            <InputTitle>회원 유형을 선택해주세요</InputTitle>
            <Radio type="radio" name="role" id="radio_student" />
            <Label htmlFor="radio_student">학생</Label>
            <Radio type="radio" name="role" id="radio_parent" />
            <Label htmlFor="radio_parent">학부모님</Label>
            <Radio type="radio" name="role" id="radio_teacher" />
            <Label htmlFor="radio_teacher">선생님</Label>
          </li>
          <LongButton>가입하기</LongButton>
        </ul>
      </form>
      {showPopup ? (
        <>
          <CardPopup onSubmit={onCardSubmit} />
          <Background onClick={closePopup} />
        </>
      ) : null}
      <Toast message={message} isShow={isShow} />
    </FormSection>
  )
}

const FormSection = styled.div`
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

export const Input = styled.input`
  width: 100%;
  height: 4.5rem;
  border: 1px solid rgba(154, 154, 154, 0.5);
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;

  :hover {
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

const Button1 = styled.button`
  height: 4.5rem;
  background-color: #0085fd;
  color: white;
  cursor: pointer;
`

export const LongButton = styled(Button1)`
  width: 100%;
  margin-top: 3rem;
`

export const SmallButton = styled(Button1)`
  width: 30rem;
  margin-left: 1rem;
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
