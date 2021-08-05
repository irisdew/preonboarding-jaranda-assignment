import React, { useState, useRef } from 'react'
import styled from 'styled-components/macro'
import Layout from 'Layout/Layout'
import userImg from 'Assets/Images/profile-user.png'
import auth from 'Utils/Auth/Auth'
import Toast from 'Components/Toast/Toast'
import CardPopup from 'Pages/Signup/CardPopup'
import { usePopup } from 'Pages/Signup/usePopup'
import useToast from 'Utils/Hooks/useToast'
import validation from 'Utils/Validation/Validation'
import GetLoggedAccountData from 'Utils/Storage/GetLoggedAccountData'
import SaveDataToLocalStorage from 'Utils/Storage/SaveDataToLocalStorage copy'
import CustomInput from 'Components/Form/CustomInput'
import Button from 'Components/Form/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useInput } from 'Utils/useInput'
import GetDataFromLocalStorage from 'Utils/Storage/GetDataFromLocalStorage'

const daum = window.daum

export default function Mypage() {
  const emailInputRef = useRef(null)
  const { isShow, message, toast } = useToast()
  const [showPopup, setPopup, openPopup, closePopup] = usePopup()
  const [cardNum, setCardNum] = useState('')
  const [addr, setAddr] = useState('')
  const [post, setPost] = useState('')
  const [extraAddr, setExtraAddr, onChangeExtraAddr] = useInput('')
  const [editEmail, setEditEmail] = useState(false)
  const [editAddress, setEditAddress] = useState(false)
  const [editCardNum, setEditCardNum] = useState(false)

  const handleEditClick = (editItem) => {
    switch (editItem) {
      case 'email':
        setEditEmail((prev) => !prev)
        console.log('edit email')
        return

      case 'address':
        setEditAddress((prev) => !prev)
        setAddr('')
        setExtraAddr('')
        console.log('edit address')

        return

      case 'cardNum':
        setCardNum('')
        setEditCardNum((prev) => !prev)
        console.log('edit cardNum')

        return

      default:
        throw new Error("Error! Edit button doesn't work properly.")
    }
  }

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
        const currentAccountAddress = data[currentAccountIdx].address
        currentAccountAddress.address = addr
        currentAccountAddress.postcode = post
        currentAccountAddress.address_detail = extraAddr
        SaveDataToLocalStorage('USER_LIST', data)
        setEditAddress((prev) => !prev)
        console.log('edit address')

        return

      case 'cardNum':
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

  function setDaumAddr(e) {
    console.log(e)
    e.preventDefault()

    const width = 500
    const height = 600

    daum.postcode.load(function () {
      new daum.Postcode({
        oncomplete: function (data) {
          // 우편번호 입력
          setPost(data.zonecode)

          // 기본 주소 입력
          if (data.userSelectedType === 'R') {
            // 사용자가 도로명 주소를 선택했을 경우
            setAddr(data.roadAddress)
          } else {
            // 사용자가 지번 주소를 선택했을 경우
            setAddr(data.jibunAddress)
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 상세주소에 입력
          if (data.userSelectedType === 'R') {
            let tempExtraAddr = ''
            // 법정동명이 있을 경우 추가 (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              tempExtraAddr += data.bname
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
              tempExtraAddr +=
                tempExtraAddr !== ''
                  ? ', ' + data.buildingName
                  : data.buildingName
            }
            // 상세주소 최종 문자열 조합
            setExtraAddr('(' + tempExtraAddr + ')')
            console.log(post, addr, extraAddr)
          }
        },
      }).open({
        left: window.screen.width / 2 - width / 2,
        top: window.screen.height / 2 - height / 2,
      })
    })
  }
  const onCardSubmit = (cardData, close) => {
    console.log('gi')
    setCardNum(cardData)
    setPopup(close)
  }

  return (
    <Layout>
      <Container>
        <UserContainer>
          <ProfileImgBox>
            <ProfileImg src={userImg} alt="user" />
          </ProfileImgBox>
          <Name>{auth.getAuth().name} 님</Name>
          <Role>
            {auth.getAuth().auth === 'teacher'
              ? '선생님'
              : auth.getAuth().auth === 'parent'
              ? '부모님'
              : '학생'}
          </Role>
        </UserContainer>
        <InfoContainer>
          {!editEmail ? (
            <InfoBox>
              이메일 :{' '}
              {GetDataFromLocalStorage('USER_LIST') &&
                GetLoggedAccountData().email}
              <EditIcon
                icon={faEdit}
                onClick={() => handleEditClick('email')}
              />
            </InfoBox>
          ) : (
            <EditBox>
              <Label>이메일 :</Label>
              <Input ref={emailInputRef} placeholder="Email" />
              <EditIcon icon={faCheck} onClick={() => handleModify('email')} />
            </EditBox>
          )}
          {!editAddress ? (
            <InfoBox>
              주소 :{' '}
              {GetDataFromLocalStorage('USER_LIST') &&
                GetLoggedAccountData().address.address}
              <EditIcon
                icon={faEdit}
                onClick={() => handleEditClick('address')}
              />
            </InfoBox>
          ) : (
            <EditBox>
              <Label>주소 :</Label>
              <AddressInputBox>
                <Input
                  onClick={(e) => setDaumAddr(e)}
                  placeholder="Address"
                  value={addr}
                  readOnly
                />
                <Input
                  placeholder="Detail Address"
                  value={extraAddr}
                  onChange={onChangeExtraAddr}
                />
                <EditButton clickHandler={(e) => setDaumAddr(e)}>
                  주소 검색
                </EditButton>
              </AddressInputBox>
              <EditIcon
                icon={faCheck}
                onClick={() => handleModify('address')}
              />
            </EditBox>
          )}
          {!editCardNum ? (
            <InfoBox>
              결제수단 :
              {GetDataFromLocalStorage('USER_LIST') &&
                GetLoggedAccountData().card_number}
              <EditIcon
                icon={faEdit}
                onClick={() => handleEditClick('cardNum')}
              />
            </InfoBox>
          ) : (
            <EditBox>
              <Label>결제수단 :</Label>
              <Input
                placeholder="Card Number"
                onClick={openPopup}
                value={cardNum}
                readOnly
              />
              <EditIcon
                icon={faCheck}
                onClick={() => handleModify('cardNum')}
              />
            </EditBox>
          )}
        </InfoContainer>
      </Container>
      <Toast message={message} isShow={isShow} />
      {showPopup ? (
        <>
          <CardPopup onSubmit={onCardSubmit} />
          <Background onClick={closePopup} />
        </>
      ) : null}
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.primary};
  width: auto;
`

const UserContainer = styled.div`
  background-color: #fff;
  margin: 10vw 2vw;
  border: solid 1.5px;
  border-radius: 10px;
  min-width: 270px;
  min-height: 220px;
  padding: 35px;
  text-align: center;
  @media screen and ${({ theme }) => theme.device.tablet} {
    padding: 20px;
    height: 1.5vw;
    min-width: 230px;
    min-height: 200px;
  }
`
const InfoContainer = styled(UserContainer)`
  min-width: 500px;
  text-align: left;
  @media screen and ${({ theme }) => theme.device.tablet} {
    min-width: 230px;
    height: 22vw;
    min-height: 250px;
  }
`

const ProfileImgBox = styled.div`
  display: flex;
  justify-content: center;
`
const ProfileImg = styled.img`
  max-width: 70px;
`

const Name = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
`
const Role = styled.div`
  margin-top: 10px;
  font-size: 15px;
  font-weight: 600;
`

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
  @media screen and ${({ theme }) => theme.device.tablet} {
    font-size: 14px;
    margin-top: 2vw;
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
    font-size: 12.5px;
    margin-top: 2vw;
    height: 4.5vw;
    width: 12vw;
  }
`

const EditBox = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
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
  min-width: 74px;
  margin-right: 10px;
  font-weight: 600;
  font-size: 16px;
  @media screen and ${({ theme }) => theme.device.tablet} {
    font-size: 12.5px;
  }
`

const EditIcon = styled(FontAwesomeIcon)`
  font-size: 15px;
  margin-left: 35px;
  @media screen and ${({ theme }) => theme.device.tablet} {
    margin-left: 2vw;
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
