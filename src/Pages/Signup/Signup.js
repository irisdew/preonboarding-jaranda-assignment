import React, { useState, useEffect } from 'react'
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
import { userListStorage } from 'Utils/Storage'
import { save, load } from 'Utils/Storage/Generator'

import bgImgUrl from 'Assets/Images/bg-sign_up.png'
import mBgImgUrl from 'Assets/Images/bg-sign-m.png'

export default function Signup() {
  const [email, , onChangeEmail] = useInput('')
  const [pass, , onChangePass] = useInput('')
  const [passPolicy, setPassPolicy] = useState({
    numeric: false,
    special: false,
    alphabet: false,
    eight: false,
  })
  const [passConfirm, , onChangePassConfirm] = useInput('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [post, setPost] = useInput('')
  const [addr, setAddr] = useInput('')
  const [extraAddr, setExtraAddr, onChangeExtraAddr] = useInput('')
  const [cardNum, setCardNum] = useState('')
  const [selectedOption, setSelectedOption] = useState('')

  const [showPopup, setPopup, openPopup, closePopup] = usePopup()
  const { isShow, message, toast } = useToast()

  const {
    isEmail,
    isNotKorean,
    isName,
    isNotNumeric,
    isNumeric,
    isSpecialCharacter,
    isAlphabet,
    isOverEight,
  } = validation

  const checkEmail = (e) => {
    isEmail(e.target.value) || toast('유효한 이메일을 입력해주세요')
  }

  const validatePassword = (password) => {
    return (
      isNumeric(password) &&
      isSpecialCharacter(password) &&
      isAlphabet(password) &&
      isOverEight(password)
    )
  }

  const checkPasswordPolicy = (e) => {
    const currentInput = e?.targetValue || pass
    const currentPassPolicy = {
      numeric: isNumeric(currentInput),
      special: isSpecialCharacter(currentInput),
      alphabet: isAlphabet(currentInput),
      eight: isOverEight(currentInput),
    }
    setPassPolicy(currentPassPolicy)
    validatePassword(currentInput) ||
      toast('비밀번호 규칙에 맞는 비밀번호를 입력해주세요')
  }

  const checkPassword = () => {
    if (pass !== passConfirm) {
      toast('비밀번호가 일치하지 않습니다!')
    }
  }

  const checkName = (e) => {
    isNotKorean(e.target.value) || toast('이름을 한글로 입력해주세요!')
    setName(e.target.value)
  }

  const checkAge = (e) => {
    isNotNumeric(e.target.value) || toast('숫자만 입력해주세요!')
    setAge(e.target.value)
  }

  const onCardSubmit = (cardData, close) => {
    setCardNum(cardData)
    setPopup(close)
  }

  const handleOption = (e) => {
    const currentSelectedOption = e.target.value
    setSelectedOption(currentSelectedOption)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    // 체크체크!
    !email && toast('이메일을 입력해주세요')
    !isEmail(email) && toast('유효한 이메일을 입력해주세요')
    !pass && toast('비밀번호를 입력해주세요')
    checkPasswordPolicy()
    pass !== passConfirm && toast('비밀번호가 서로 일치하지 않습니다')
    !name && toast('이름을 입력해주세요')
    !isName(name) && toast('유효한 이름을 입력해주세요')
    !age && toast('나이를 입력해주세요')
    // !isNotNumeric(age) && toast('유효한 나이를 입력해주세요')
    !post && toast('주소를 입력해주세요')
    !cardNum && toast('카드번호를 입력해주세요')
    !selectedOption && toast('회원 유형을 선택해주세요')

    const usersInfo = userListStorage.load()
    const currentIndex = usersInfo.length
    const newUserInfo = {
      id: currentIndex + 1,
      email: isEmail(email) ? email : '',
      name: isName(name) ? name : '',
      age: !isNotNumeric(age) ? age : '',
      password: validatePassword(pass) ? pass : '',
      address:
        post.length > 0
          ? { postcode: post, address: addr, address_detail: extraAddr }
          : '',
      card_number: cardNum,
      auth: selectedOption,
      access: [`/${selectedOption}`],
    }

    const checkUserInfo = Object.values(newUserInfo).every((item) =>
      Boolean(item)
    )

    console.log(
      Object.values(newUserInfo),
      Object.values(newUserInfo).map((item) => Boolean(item))
    )

    checkUserInfo && userListStorage.save([...usersInfo, newUserInfo])
  }

  return (
    <Layout footerColor="blue">
      <StyledSection>
        <h2 className="a11y">회원가입 페이지</h2>
        <FormSection>
          <FormTitle>
            <div>간편하게 회원가입하고</div>
            <div>자란다를 이용해보세요</div>
          </FormTitle>
          <Input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={onChangeEmail}
            onBlur={checkEmail}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={pass}
            onChange={onChangePass}
            onBlur={checkPasswordPolicy}
          />
          <PasswordPolicy passPolicy={passPolicy} />
          <Input
            type="password"
            placeholder="비밀번호 확인"
            onBlur={checkPassword}
            value={passConfirm}
            onChange={onChangePassConfirm}
          />
          <Input
            type="text"
            name="name"
            placeholder="이름"
            value={name}
            onChange={checkName}
          />
          <Input
            type="text"
            name="age"
            placeholder="나이"
            value={age}
            onChange={checkAge}
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
            <Input
              type="text"
              value={cardNum}
              placeholder="카드 번호"
              disabled
            />
            <SmallButton clickHandler={openPopup} type="button">
              카드 입력하기
            </SmallButton>
          </FlexDiv>
          <InputTitle>회원 유형을 선택해주세요</InputTitle>
          <Radio
            type="radio"
            name="role"
            id="radio_student"
            value="student"
            checked={selectedOption === 'student'}
            onChange={handleOption}
          />
          <Label htmlFor="radio_student">학생</Label>
          <Radio
            type="radio"
            name="role"
            id="radio_parent"
            value="parent"
            checked={selectedOption === 'parent'}
            onChange={handleOption}
          />
          <Label htmlFor="radio_parent">학부모님</Label>
          <Radio
            type="radio"
            name="role"
            id="radio_teacher"
            value="teacher"
            checked={selectedOption === 'teacher'}
            onChange={handleOption}
          />
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
      </StyledSection>
    </Layout>
  )
}

const StyledSection = styled.section`
  position: relative;
  padding: 19.2rem 0 12.8rem;
  z-index: 100;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    display: block;
    width: 100%;
    height: 37.7rem;
    background: url(${bgImgUrl}) no-repeat top right;
    transform: translateY(-7rem);
    z-index: -1;
  }
  @media screen and ${({ theme }) => theme.device.tablet} {
    padding: 3.7rem 0 0;
    &::before {
      height: 13.7rem;
      background: url(${mBgImgUrl}) no-repeat top right;
      transform: translateY(-4rem);
    }
  }
`

const FormSection = styled.form`
  width: 45rem;
  margin: 0 auto;
`

const FormTitle = styled.div`
  font-size: 2.4rem;
  margin-bottom: 3rem;
  @media screen and ${({ theme }) => theme.device.tablet} {
    margin-top: 4.8rem;
  }
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
    color: ${({ theme }) => theme.color.secondary};
    border: solid 1px ${({ theme }) => theme.color.secondary};
    background-color: ${({ theme }) => theme.color.secondaryAlpha};
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
  background-color: ${({ theme }) => theme.color.secondary};
`

export const SmallButton = styled(Button)`
  width: 30rem;
  margin-left: 1rem;
  background-color: ${({ theme }) => theme.color.secondary};
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
