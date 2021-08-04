import React, { useState } from 'react'
import styled from 'styled-components/macro'

import Layout from 'Layout/Layout'
import CustomInput from 'Components/Form/CustomInput'
import Button from 'Components/Form/Button'
import PasswordPolicy from 'Components/PasswordPolicy/PasswordPolicy'
import Address from 'Components/Address/Address'
import CardPopup from 'Pages/Signup/CardPopup'
// import Toast from 'Components/Toast/Toast'
import validation from 'Utils/Validation/Validation'
import { useInput } from 'Utils/Hooks/useInput'
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

  //비밀번호와 비밀번호확인이 일치하지 않을 때
  const CheckPassWord = () => {
    if (pass !== passConfirm) {
      console.log('비밀번호가 일치하지 않습니다')
    }
  }

  const CheckPasswordPolicy = (password) => {
    const { isNumeric, isSpecialCharacter, isAlphabet, isOverEight } =
      validation
    setPassPolicy({
      numeric: isNumeric(password),
      special: isSpecialCharacter(password),
      alphabet: isAlphabet(password),
      eight: isOverEight(password),
    })
  }

  const onCardSubmit = (cardData, close) => {
    setCardNum(cardData)
    setPopup(close)
  }

  return (
    <Layout>
      <FormSection>
        <FormTitle>
          <div>간편하게 회원가입하고</div>
          <div>선생님 정보를 받아보세요</div>
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
              <Input type="text" placeholder="이름" />
            </li>
            <li>
              <Input type="text" placeholder="나이" />
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
              <InputTitle>학부모님 이신가요?</InputTitle>
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
      </FormSection>
    </Layout>
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
  margin-top: 3rem;
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
