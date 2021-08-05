import React, { useState, useRef } from 'react'
import styled from 'styled-components/macro'
import GetDataFromLocalStorage from 'Utils/Storage/GetDataFromLocalStorage'
import GetLoggedAccountData from 'Utils/Storage/GetLoggedAccountData'
import useToast from 'Utils/Hooks/useToast'
import validation from 'Utils/Validation/Validation'
import SaveDataToLocalStorage from 'Utils/Storage/SaveDataToLocalStorage'
import { useInput } from 'Utils/Hooks/useInput'
import setDaumAddr from 'Utils/SetDaumAddr'
import { EditIcon } from './InfoBox'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import CustomInput from 'Components/Form/CustomInput'
import { usePopup } from 'Pages/Signup/usePopup'
import Button from 'Components/Form/Button'
import CardPopup from 'Pages/Signup/CardPopup'
import Toast from 'Components/Toast/Toast'

export function EditBox({
  inputTitle,
  inputType,
  setEditEmail,
  setEditAddress,
  setEditCardNum,
}) {
  const { isShow, message, toast } = useToast()
  const emailInputRef = useRef(null)
  const [cardNum, setCardNum] = useState('')
  const [addr, setAddr] = useState('')
  const [post, setPost] = useState('')
  const [extraAddr, setExtraAddr, onChangeExtraAddr] = useInput('')
  const [showPopup, setPopup, openPopup, closePopup] = usePopup()

  const handleModify = (editItem) => {
    const emailRef = emailInputRef.current
    const data = GetDataFromLocalStorage('USER_LIST')

    const currentAccount = data.find(
      (account) => account.id === GetLoggedAccountData().id
    )

    const currentAccountIdx = data.indexOf(currentAccount)

    switch (editItem) {
      case 'email':
        if (!emailRef.value) {
          setEditEmail((prev) => !prev)
          return
        }

        if (!validation.isEmail(emailRef.value)) {
          toast('유효하지 않은 이메일입니다.')
          emailRef.value = ''
          emailRef.focus()
          return
        }

        // 이메일 변경 로직 추가
        // CURRENT_ACCOUNT와 USER_LIST 모두 수정
        data[currentAccountIdx].email = emailRef.value
        SaveDataToLocalStorage('USER_LIST', data)

        const emailModifiedObj = GetDataFromLocalStorage('CURRENT_ACCOUNT')
        emailModifiedObj.email = emailRef.value
        SaveDataToLocalStorage('CURRENT_ACCOUNT', emailModifiedObj)
        setEditEmail((prev) => !prev)
        return

      case 'address':
        if (!addr) {
          console.log('nothing')
          setEditAddress((prev) => !prev)
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
        SaveDataToLocalStorage('USER_LIST', data)
        setEditAddress((prev) => !prev)
        console.log('edit address')

        return

      case 'card_number':
        if (!cardNum) {
          console.log('nothing')
          setEditCardNum((prev) => !prev)
          return
        }
        // 카드 번호 변경 로직 추가
        // USER_LIST만 바꿔야함
        data[currentAccountIdx].card_number = cardNum
        SaveDataToLocalStorage('USER_LIST', data)
        setEditCardNum((prev) => !prev)

        return

      default:
        throw new Error("Error! Edit button doesn't work properly.")
    }
  }

  function handleSearchAddress(e) {
    e.preventDefault()
    setDaumAddr({ setPost, setAddr, setExtraAddr })
  }
  const onCardSubmit = (cardData, close) => {
    console.log('gi')
    setCardNum(cardData)
    setPopup(close)
  }

  return (
    <>
      <Edit>
        <Label>{inputTitle} :</Label>
        {inputType === 'email' && (
          <Input ref={emailInputRef} placeholder="Email" />
        )}

        {inputType === 'address' && (
          <AddressInputBox>
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
          </AddressInputBox>
        )}
        {inputType === 'card_number' && (
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
    /* margin: 10px 0; */
  }
`
const Input = styled(CustomInput)`
  display: flex;
  min-width: 170px;
  height: 3.5rem;
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
  @media screen and ${({ theme }) => theme.device.tablet} {
    font-size: 12.5px;
  }
`
const AddressInputBox = styled.div`
  width: 100%;
  @media screen and ${({ theme }) => theme.device.tablet} {
    max-width: 100%;
    min-width: 10px;
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
    font-size: 12px;
    margin-top: 2vw;
    height: 4.2vw;
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
