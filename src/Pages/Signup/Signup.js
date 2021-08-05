import React, { useState, useRef, forwardRef } from 'react'
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
import { useInput } from 'Utils/Hooks/useInput'
import { usePopup } from 'Components/CardInputPopup/usePopup'
import { userListStorage } from 'Utils/Storage'

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

  const inputEmail = useRef(null)
  const inputPassword = useRef(null)
  const inputPasswordConfirm = useRef(null)
  const inputName = useRef(null)
  const inputAge = useRef(null)
  const inputCard = useRef(null)
  const inputPostCode = useRef(null)

  const ALERT_EMAIL_BLANK = '이메일을 입력해주세요'
  const ALERT_EMAIL_INVALID = '유효한 이메일을 입력해주세요.'
  const ALERT_EMAIL_DUPLICATE = '이미 가입된 이메일 입니다.'

  const ALERT_PASSWORD_BLANK = '비밀번호를 입력해주세요'
  const ALERT_PASSWORD_INVALID = '비밀번호 규칙에 맞는 비밀번호를 입력해주세요'
  const ALERT_PASSWORD = '비밀번호가 일치하지 않습니다.'

  const ALERT_NAME_BLANK = '이름을 입력해주세요.'
  const ALERT_NAME_INVALID = '유효한 이름을 입력해주세요.'

  const ALERT_AGE_BLANK = '나이를 입력해주세요.'
  const ALERT_ADDRESS_BLANK = '주소를 입력해주세요.'
  const ALERT_CARD_BLANK = '카드번호를 입력해주세요.'
  const ALERT_AUTH_BLANK = '회원 유형을 선택해주세요.'

  const ALERT_ISNOT_KOREAN = '한글만 입력하실 수 있습니다.'
  const ALERT_ISNOT_NUMERIC = '숫자만 입력하실 수 있습니다.'

  //이메일 유효성 검사, 이메일 중복 검사
  const checkEmail = (e) => {
    checkEmailDuplication(e.target.value)
    isEmail(e.target.value) || toast(ALERT_EMAIL_INVALID)
  }

  // 이메일 중복 확인
  const checkEmailDuplication = (currentValue) => {
    const usersInfo = userListStorage.load()
    for (const info of usersInfo) {
      if (currentValue === info.email) {
        toast(ALERT_EMAIL_DUPLICATE)
      }
    }
  }

  // 비밀번호 검사
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
    validatePassword(currentInput) || toast(ALERT_PASSWORD_INVALID)
  }

  // 비밀번호 === 비밀번호 확인 일치 검사
  const checkPassword = () => {
    pass !== passConfirm && toast(ALERT_PASSWORD)
  }

  const checkName = (e) => {
    isNotKorean(e.target.value)
      ? toast(ALERT_ISNOT_KOREAN)
      : setName(e.target.value)
  }

  const checkAge = (e) => {
    isNotNumeric(e.target.value)
      ? toast(ALERT_ISNOT_NUMERIC)
      : setAge(e.target.value)
  }

  const onCardSubmit = (cardData, close) => {
    setCardNum(cardData)
    setPopup(close)
  }

  // checkBox 선택 시 값 변경
  const handleOption = (e) => {
    const currentSelectedOption = e.target.id
    setSelectedOption(currentSelectedOption)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    // 체크체크!
    !email && toast(ALERT_EMAIL_BLANK)
    // !isEmail(email) && toast(ALERT_EMAIL_INVALID)
    !pass && toast(ALERT_PASSWORD_BLANK)
    checkPasswordPolicy()
    pass !== passConfirm && toast(ALERT_PASSWORD)
    !name && toast(ALERT_NAME_BLANK)
    !isName(name) && toast(ALERT_NAME_INVALID)
    !age && toast(ALERT_AGE_BLANK)
    // !isNotNumeric(age) && toast('유효한 나이를 입력해주세요')
    !post && toast(ALERT_ADDRESS_BLANK)
    !cardNum && toast(ALERT_CARD_BLANK)
    !selectedOption && toast(ALERT_AUTH_BLANK)

    const usersInfo = userListStorage.load()
    const currentIndex = usersInfo.length
    const newUserInfo = {
      id: currentIndex + 1,
      email: isEmail(email) ? email : '',
      password: validatePassword(pass) ? pass : '',
      name: isName(name) ? name : '',
      age: !isNotNumeric(age) ? age : '',
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

    checkBlank(newUserInfo)

    checkUserInfo && userListStorage.save([...usersInfo, newUserInfo])
  }

  //빈 칸 있는지 확인 후 toast, focus
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
      ALERT_EMAIL_BLANK,
      ALERT_PASSWORD_BLANK,
      ALERT_NAME_BLANK,
      ALERT_AGE_BLANK,
      ALERT_ADDRESS_BLANK,
      ALERT_CARD_BLANK,
    ]
    let index = 0
    for (let key in newUserInfo) {
      if (index < userInfoInputs.length && newUserInfo[key] == '') {
        userInfoInputs[index].current.focus()
        toast(alerts[index])
        return
      }
      index++
    }
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
            onBlur={checkPassword}
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

const StyledCustomCheckBox = styled(CustomCheckBox)`
  align-self: flex-start;
  margin-top: 1rem;
`
