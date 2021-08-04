import React, { useState, useRef, useCallback } from 'react'
import styled, { css } from 'styled-components/macro'
import Layout from 'Layout/Layout'
import userImg from 'Assets/Images/profile-user.png'
import auth from 'Utils/Auth/Auth'
import Toast from 'Components/Toast/Toast'
import CardPopup from 'Pages/Signup/CardPopup'
import { usePopup } from 'Pages/Signup/usePopup'
import useToast from 'Utils/Hooks/useToast'
import validation from 'Utils/Validation/Validation'
import GetLoggedAccountData from 'Utils/Storage/GetLoggedAccountData'
import CustomInput from 'Components/Form/CustomInput'
import Button from 'Components/Form/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheck } from '@fortawesome/free-solid-svg-icons'

const daum = window.daum

export default function Mypage() {
  const emailInputRef = useRef(null)
  const addressInputRef = useRef(null)
  const cardNumInputRef = useRef(null)
  const { isShow, message, toast } = useToast()
  // const [daumAddr, setDaumAddr] = useState(false)
  const [showPopup, setPopup, openPopup, closePopup] = usePopup()
  const [cardNum, setCardNum] = useState('')
  const [addr, setAddr] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [editAddress, setEditAddress] = useState(false)
  const [editCardNum, setEditCardNum] = useState(false)

  const handleEditClick = (editItem) => {
    // setEditMode((prev) => !prev)
    switch (editItem) {
      case 'email':
        setEditEmail((prev) => !prev)
        console.log('edit email')
        return

      case 'address':
        setEditAddress((prev) => !prev)
        setAddr('')
        console.log('edit address')

        return

      case 'cardNum':
        setEditCardNum((prev) => !prev)
        console.log('edit cardNum')

        return

      default:
        throw new Error("Error! Edit button doesn't work properly.")
    }
  }

  const handleModify = (editItem) => {
    const email = emailInputRef.current
    const cardNum = cardNumInputRef.current

    switch (editItem) {
      case 'email':
        if (!validation.isEmail(email.value)) {
          toast('유효하지 않은 이메일입니다.')
          email.value = ''
          email.focus()
          return
        }
        // 이메일 변경 로직 추가
        // CURRENT_ACCOUNT와 USER_LIST 모두에서 바꿔야함
        setEditEmail((prev) => !prev)
        return

      case 'address':
        if (!addr) {
          console.log('nothing')
          setEditAddress((prev) => !prev)
          return
        }

        // 주소 변경 로직 추가
        // CURRENT_ACCOUNT와 USER_LIST 모두에서 바꿔야함

        setEditAddress((prev) => !prev)
        console.log('edit address')

        return

      case 'cardNum':
        setEditCardNum((prev) => !prev)
        console.log('edit cardNum')
        // 카드 번호 변경 로직 추가
        // CURRENT_ACCOUNT와 USER_LIST 모두에서 바꿔야함

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
          // setPost(data.zonecode)

          // 기본 주소 입력
          if (data.userSelectedType === 'R') {
            // 사용자가 도로명 주소를 선택했을 경우
            setAddr(data.roadAddress)
          } else {
            // 사용자가 지번 주소를 선택했을 경우
            setAddr(data.jibunAddress)
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
              이메일 : {GetLoggedAccountData().email}{' '}
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
              주소 : {GetLoggedAccountData().address.address}
              <EditIcon
                icon={faEdit}
                onClick={() => handleEditClick('address')}
              />
            </InfoBox>
          ) : (
            <EditBox>
              <Label>주소 :</Label>
              <Input
                onClick={(e) => setDaumAddr(e)}
                placeholder="Address"
                value={addr}
                readOnly
              />
              <EditIcon
                icon={faCheck}
                onClick={() => handleModify('address')}
              />
            </EditBox>
          )}
          {!editCardNum ? (
            <InfoBox>
              결제수단 : {GetLoggedAccountData().card_number}
              <EditIcon
                icon={faEdit}
                onClick={() => handleEditClick('cardNum')}
              />
            </InfoBox>
          ) : (
            <EditBox>
              <Label>결제수단 :</Label>
              <Input
                ref={cardNumInputRef}
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
          {/* <EditButton clickHandler={handleEditClick}>정보 수정</EditButton> */}
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
    min-height: 200px;
  }
`

const ProfileImgBox = styled.div`
  display: flex;
  justify-content: center;
`
const ProfileImg = styled.img`
  max-width: 70px;
  /* margin-top: 8px; */
`

const UserInfoBox = styled.div`
  text-align: center;
  margin: 30px 0 70px;
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

const ModifiableInfoBox = styled.div``

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

const EditButton = styled(Button)`
  background-color: #fff;
  color: #000;
  border: 2px solid;
  cursor: pointer;
  font-size: 14px;
  margin-top: 30px;
  font-weight: 600;
  height: 3vw;

  @media screen and ${({ theme }) => theme.device.tablet} {
    font-size: 12.5px;
    margin-top: 2vw;
    height: 6vw;
  }
`

const SaveButton = styled(EditButton)`
  margin-top: 23px;
  height: 35px;
  /* width: 10vw; */
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
