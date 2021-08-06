import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import Layout from 'Layout/Layout'
import CustomInput from 'Components/Form/CustomInput'
import Button from 'Components/Form/Button'
import PasswordPolicy from 'Components/PasswordPolicy/PasswordPolicy'
import Address from 'Components/Address/Address'
import CardPopup from 'Components/CardInputPopup/CardPopup'
import CustomCheckBox from 'Components/Form/CustomCheckBox'
import Toast from 'Components/Toast/Toast'
import useToast from 'Utils/Hooks/useToast'
import validation from 'Utils/Validation/Validation'
import auth from 'Utils/Auth/Auth'
import { useInput } from 'Utils/Hooks/useInput'
import { usePopup } from 'Components/CardInputPopup/usePopup'
import { userListStorage } from 'Utils/Storage'
import { toastMsg } from 'Constant'

import bgImgUrl from 'Assets/Images/bg-sign_up.png'
import mBgImgUrl from 'Assets/Images/bg-sign-m.png'

export default function Signup() {
  const [email, , onChangeEmail, inputEmail] = useInput('')
  const [pass, , onChangePass, inputPassword] = useInput('')
  const [passPolicy, setPassPolicy] = useState({
    numeric: false,
    special: false,
    alphabet: false,
    eight: false,
  })
  const [passConfirm, , onChangePassConfirm, inputPasswordConfirm] =
    useInput('')
  const [name, setName, , inputName] = useInput('')
  const [age, setAge, , inputAge] = useInput('')
  const [post, setPost, , inputPostCode] = useInput('')
  const [addr, setAddr] = useInput('')
  const [extraAddr, setExtraAddr, onChangeExtraAddr] = useInput('')
  const [cardNum, setCardNum, , inputCard] = useInput('')
  const [selectedOption, setSelectedOption] = useState('')

  const [showPopup, setPopup, openPopup, closePopup] = usePopup()
  const { isShow, message, toast } = useToast()
  const history = useHistory()

  const {
    isEmail,
    isNotKorean,
    isName,
    isNotNumeric,
    isNumeric,
    isAge,
    isSpecialCharacter,
    isAlphabet,
    isOverEight,
  } = validation

  const checkEmailDuplication = (currentValue) => {
    const usersInfo = userListStorage.load()
    let isEmailDuplicate = false
    for (const info of usersInfo) {
      if (currentValue === info.email) {
        toast(toastMsg.EMAIL_DUPLICATE)
        isEmailDuplicate = true
      }
    }
    return isEmailDuplicate
  }

  const checkEmail = (e) => {
    checkEmailDuplication(e.target.value)
    isEmail(e.target.value) || toast(toastMsg.EMAIL_INVALID)
  }

  const isCheckedPassword = (password) => {
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
    isCheckedPassword(currentInput) || toast(toastMsg.PASSWORD_INVALID)
  }

  const checkPasswordConfirm = () => {
    pass !== passConfirm && toast(toastMsg.PASSWORD_MISSMATCH)
  }

  const checkName = (e) => {
    isNotKorean(e.target.value)
      ? toast(toastMsg.ISNOT_KOREAN)
      : setName(e.target.value)
  }

  const checkAge = (e) => {
    isNotNumeric(e.target.value)
      ? toast(toastMsg.ISNOT_NUMERIC)
      : setAge(e.target.value)
  }

  const onCardSubmit = (cardData, close) => {
    setCardNum(cardData)
    setPopup(close)
  }

  const handleOption = (e) => {
    const currentSelectedOption = e.target.id
    setSelectedOption(currentSelectedOption)
  }

  const checkBlank = (newUserInfo) => {
    const userInfoInputs = [
      '',
      inputEmail,
      inputPassword,
      inputName,
      inputAge,
      inputPostCode,
      inputCard,
    ]

    const alerts = [
      '',
      toastMsg.EMAIL_BLANK,
      toastMsg.PASSWORD_BLANK,
      toastMsg.NAME_BLANK,
      toastMsg.AGE_BLANK,
      toastMsg.ADDRESS_BLANK,
      toastMsg.CARD_BLANK,
    ]

    let index = 0
    for (let key in newUserInfo) {
      if (index < userInfoInputs.length && newUserInfo[key] === '') {
        userInfoInputs[index].current.focus()
        userInfoInputs[index].current.value || toast(alerts[index])
        return
      }
      index++
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    !email && toast(toastMsg.EMAIL_BLANK)
    !isEmail(email) && toast(toastMsg.EMAIL_INVALID)
    !pass && toast(toastMsg.PASSWORD_BLANK)
    checkPasswordPolicy()
    pass !== passConfirm && toast(toastMsg.PASSWORD_MISSMATCH)
    !name && toast(toastMsg.NAME_BLANK)
    !isName(name) && toast(toastMsg.NAME_INVALID)
    !age && toast(toastMsg.AGE_BLANK)
    !isAge(age) && toast(toastMsg.AGE_INVALID)
    !post && toast(toastMsg.ADDRESS_BLANK)
    !cardNum && toast(toastMsg.CARD_BLANK)
    !selectedOption && toast(toastMsg.AUTH_BLANK)

    const usersInfo = userListStorage.load()
    const currentIndex = usersInfo.length
    const newUserInfo = {
      id: currentIndex + 1,
      email: !checkEmailDuplication(email) && isEmail(email) ? email : '',
      password: isCheckedPassword(pass) ? pass : '',
      name: isName(name) ? name : '',
      age: isAge(age) ? age : '',
      address:
        post.length > 0
          ? { postcode: post, address: addr, address_detail: extraAddr }
          : '',
      card_number: cardNum,
      auth: selectedOption,
      access: [`/${selectedOption}`],
    }

    checkBlank(newUserInfo)

    const isValidatedUserInfo = Object.values(newUserInfo).every((item) => item)
    if (isValidatedUserInfo) {
      userListStorage.save([...usersInfo, newUserInfo])
      isValidatedUserInfo && toast(toastMsg.SIGNUP_SUCCESSED)
      setTimeout(() => {
        history.push('/login')
      }, 500)
    }
  }

  return (
    <Layout header footer footerColor="blue">
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
            ref={inputEmail}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={pass}
            onChange={onChangePass}
            onBlur={checkPasswordPolicy}
            ref={inputPassword}
          />
          <PasswordPolicy passPolicy={passPolicy} />
          <Input
            type="password"
            placeholder="비밀번호 확인"
            onBlur={checkPasswordConfirm}
            value={passConfirm}
            onChange={onChangePassConfirm}
            ref={inputPasswordConfirm}
          />
          <Input
            type="text"
            name="name"
            placeholder="이름"
            value={name}
            onChange={checkName}
            ref={inputName}
          />
          <Input
            type="text"
            name="age"
            placeholder="나이"
            value={age}
            onChange={checkAge}
            ref={inputAge}
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
            ref={inputPostCode}
          />
          <InputTitle>결제 정보</InputTitle>
          <FlexDiv>
            <Input
              type="text"
              value={cardNum}
              placeholder="카드 번호"
              ref={inputCard}
              readOnly
            />
            <SmallButton clickHandler={openPopup} type="button">
              카드 입력하기
            </SmallButton>
          </FlexDiv>
          <InputTitle>회원 유형을 선택해주세요</InputTitle>
          <FlexDiv>
            <StyledCustomCheckBox
              checked={selectedOption === 'student'}
              id="student"
              checkHandler={handleOption}
            >
              자란다어린이
            </StyledCustomCheckBox>
            <StyledCustomCheckBox
              checked={selectedOption === 'parent'}
              id="parent"
              checkHandler={handleOption}
            >
              자란다부모님
            </StyledCustomCheckBox>
            <StyledCustomCheckBox
              checked={selectedOption === 'teacher'}
              id="teacher"
              checkHandler={handleOption}
            >
              자란다선생님
            </StyledCustomCheckBox>
          </FlexDiv>
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
  padding-top: 10rem;
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
    padding-top: 3.7rem;
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
  justify-content: space-around;
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

const StyledCustomCheckBox = styled(CustomCheckBox)`
  align-self: flex-start;
  margin-top: 1rem;
`
