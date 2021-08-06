import React, { useState, useRef } from 'react'
import styled from 'styled-components/macro'
import GetDataFromLocalStorage from 'Utils/Storage/GetDataFromLocalStorage'
import GetLoggedAccountData from 'Utils/Storage/GetLoggedAccountData'
import useToast from 'Utils/Hooks/useToast'
import { useInput } from 'Utils/Hooks/useInput'
import validation from 'Utils/Validation/Validation'
import setDaumAddr from 'Utils/SetDaumAddr'
import auth from 'Utils/Auth/Auth'
import CustomInput from 'Components/Form/CustomInput'
import Toast from 'Components/Toast/Toast'
import PasswordPolicy from 'Components/PasswordPolicy/PasswordPolicy'
import Button from 'Components/Form/Button'
import CardPopup from 'Pages/Signup/CardPopup'
import { usePopup } from 'Pages/Signup/usePopup'
import { EditIcon } from './InfoBox'
import { storageKeys, accountInfoType, errorState } from 'Constant'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export function EditBox({ inputTitle, inputType, setEditMode }) {
  const { isShow, message, toast } = useToast()
  const emailInputRef = useRef(null)
  const prevPasswordInputRef = useRef(null)
  const newPasswordInputRef = useRef(null)
  const [cardNum, setCardNum] = useState('')
  const [addr, setAddr] = useState('')
  const [post, setPost] = useState('')
  const [passPolicy, setPassPolicy] = useState({
    numeric: false,
    special: false,
    alphabet: false,
    eight: false,
  })
  const [isPassPolicy, setIsPassPolicy] = useState(false)

  const [extraAddr, setExtraAddr, onChangeExtraAddr] = useInput('')
  const [showPopup, setPopup, openPopup, closePopup] = usePopup()
  const { isNumeric, isSpecialCharacter, isAlphabet, isOverEight } = validation

  const handleModify = (editItem) => {
    const emailRef = emailInputRef.current
    const prevPasswordRef = prevPasswordInputRef.current
    const newPasswordRef = newPasswordInputRef.current
    const data = GetDataFromLocalStorage(storageKeys.USER_LIST.name)
    const currentAccountData = data.find(
      (account) => account.id === GetLoggedAccountData().id
    )
    const currentAccountIdx = data.indexOf(currentAccountData)

    switch (editItem) {
      case accountInfoType.EMAIL.name:
        if (!emailRef.value) {
          setEditMode((prev) => ({ ...prev, email: false }))
          return
        }

        if (!validation.isEmail(emailRef.value)) {
          toast(errorState.INVALID_EMAIL.desc)
          emailRef.value = ''
          emailRef.focus()
          return
        }

        // 이메일 변경 로직 추가
        // CURRENT_ACCOUNT와 USER_LIST 모두 수정
        data[currentAccountIdx].email = emailRef.value
        auth.update(data[currentAccountIdx])
        // SaveDataToLocalStorage('USER_LIST', data)

        // const emailModifiedObj = GetDataFromLocalStorage('CURRENT_ACCOUNT')
        // emailModifiedObj.email = emailRef.value
        // SaveDataToLocalStorage('CURRENT_ACCOUNT', emailModifiedObj)

        setEditMode((prev) => ({ ...prev, email: false }))
        return

      case accountInfoType.ADDRESS.name:
        if (!addr) {
          setEditMode((prev) => ({ ...prev, address: false }))
          return
        }

        // 주소 변경 로직 추가
        // USER_LIST만 바꿔야함
        const newAddress = {
          postcode: post,
          address: addr,
          address_detail: extraAddr,
        }
        // USER_LIST의 현재 로그인 한 계정의 address를 newAddress로 대체
        data[currentAccountIdx].address = newAddress
        auth.update(data[currentAccountIdx])
        setEditMode((prev) => ({ ...prev, address: false }))
        return

      case accountInfoType.CARD_NUMBER.name:
        if (!cardNum) {
          setEditMode((prev) => ({ ...prev, cardNum: false }))
          return
        }
        // 카드 번호 변경 로직 추가
        // USER_LIST만 바꿔야함
        data[currentAccountIdx].card_number = cardNum
        auth.update(data[currentAccountIdx])
        setEditMode((prev) => ({ ...prev, cardNum: false }))

        return

      case accountInfoType.PASSWORD.name:
        if (!newPasswordRef.value) {
          setEditMode((prev) => ({ ...prev, password: false }))
          return
        }
        // 비밀 번호 변경 로직 추가
        // 이전 비밀번호 체크 후
        // USER_LIST만 바꿔야함
        if (!prevPasswordRef.value) {
          toast(errorState.NO_PREVIOUS_PASSWORD.desc)
          prevPasswordRef.focus()
          return
        }

        if (prevPasswordRef.value !== currentAccountData.password) {
          toast(errorState.INVALID_PREVIOUS_PASSWORD.desc)
          prevPasswordRef.focus()
          return
        }

        if (!isPassPolicy) {
          toast(errorState.INVALID_NEW_PASSWORD.desc)
          newPasswordRef.focus()
          return
        }
        data[currentAccountIdx].password = newPasswordRef.value
        auth.update(data[currentAccountIdx])
        setEditMode((prev) => ({ ...prev, password: false }))
        return

      default:
        throw new Error(errorState.MY_INFO_EDIT_ERROR.desc)
    }
  }

  function checkPasswordPolicy(e) {
    const currentInput = e.target.value
    const currentPassPolicy = {
      numeric: isNumeric(currentInput),
      special: isSpecialCharacter(currentInput),
      alphabet: isAlphabet(currentInput),
      eight: isOverEight(currentInput),
    }
    setPassPolicy(currentPassPolicy)
    const validated = Object.values(currentPassPolicy).every((item) => item)
    setIsPassPolicy(validated)
  }

  function handleSearchAddress(e) {
    e.preventDefault()
    setDaumAddr({ setPost, setAddr, setExtraAddr })
  }
  const onCardSubmit = (cardData, close) => {
    setCardNum(cardData)
    setPopup(close)
  }

  return (
    <>
      <Edit>
        <Label>{inputTitle} :</Label>
        {inputType === accountInfoType.EMAIL.name && (
          <Input ref={emailInputRef} placeholder="Email" />
        )}
        {inputType === accountInfoType.PASSWORD.name && (
          <InputBox>
            <Input
              placeholder="이전 비밀번호"
              type="password"
              ref={prevPasswordInputRef}
            />
            <Input
              placeholder="새 비밀번호"
              type="password"
              ref={newPasswordInputRef}
              onBlur={checkPasswordPolicy}
            />
            <PasswordPolicy passPolicy={passPolicy} />
          </InputBox>
        )}

        {inputType === accountInfoType.ADDRESS.name && (
          <InputBox>
            <Input
              onClick={(e) => handleSearchAddress(e)}
              placeholder="Address"
              value={addr}
              readOnly
            />
            <Input
              placeholder="Detail Address"
              value={extraAddr}
              onChange={onChangeExtraAddr}
            />
            <EditButton clickHandler={(e) => handleSearchAddress(e)}>
              주소 검색
            </EditButton>
          </InputBox>
        )}
        {inputType === accountInfoType.CARD_NUMBER.name && (
          <Input
            placeholder="Card Number"
            onClick={openPopup}
            value={cardNum}
            readOnly
          />
        )}

        <EditIcon icon={faCheck} onClick={() => handleModify(inputType)} />
      </Edit>
      <Toast message={message} isShow={isShow} />

      {showPopup ? (
        <>
          <CardPopup onSubmit={onCardSubmit} />
          <Background onClick={closePopup} />
        </>
      ) : null}
    </>
  )
}

const Edit = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  @media screen and ${({ theme }) => theme.device.tablet} {
    margin: 7px 0;
  }
  @media screen and ${({ theme }) => theme.device.mobile} {
    margin: 17px 0;
  }
`
const Input = styled(CustomInput)`
  display: flex;
  min-width: 170px;
  height: 3.5rem;
  margin-top: 5px;
  @media screen and ${({ theme }) => theme.device.tablet} {
    min-width: 10px;
  }
`

const Label = styled.div`
  display: inline-block;
  min-width: 80px;
  margin-right: 10px;
  font-weight: 600;
  font-size: 16px;
`
const InputBox = styled.div`
  width: 100%;
  @media screen and ${({ theme }) => theme.device.tablet} {
    max-width: 100%;
    min-width: 10px;
    display: none;
  }
`
const EditButton = styled(Button)`
  background-color: #fff;
  color: #000;
  border: 2px solid;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
  font-weight: 600;
  height: 3.5rem;
  width: 15rem;
  @media screen and ${({ theme }) => theme.device.tablet} {
    font-size: 11px;
    margin-top: 2vw;
    height: 4vw;
    width: 12vw;
  }
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
