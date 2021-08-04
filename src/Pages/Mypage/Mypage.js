import React, { useState, useRef, useCallback } from 'react'
import styled, { css } from 'styled-components/macro'
import Layout from 'Layout/Layout'
import userImg from 'Assets/Images/profile-user.png'
import auth from 'Utils/Auth/Auth'
import Toast from 'Components/Toast/Toast'
import useToast from 'Utils/Hooks/useToast'
import validation from 'Utils/Validation/Validation'
import GetLoggedAccountData from 'Utils/Storage/GetLoggedAccountData'
import CustomInput from 'Components/Form/CustomInput'
import Button from 'Components/Form/Button'
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
  min-width: 280px;
  min-height: 220px;
  padding: 35px;
  text-align: center;
  @media screen and ${({ theme }) => theme.device.tablet} {
    padding: 20px;
    height: 1.5vw;
    min-width: 230px;
    min-height: 230px;
  }
`
const InfoContainer = styled(UserContainer)`
  text-align: left;
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

const Info = styled.div`
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
  width: 90%;
  height: 3.5rem;
`
const Label = styled.div`
  display: inline-block;
  min-width: 60px;
  margin-right: 10px;
  font-weight: 600;
  @media screen and ${({ theme }) => theme.device.tablet} {
    font-size: 12.5px;
  }
`

export default function Mypage() {
  const emailInputRef = useRef(null)
  const addressInputRef = useRef(null)
  const cardNumInputRef = useRef(null)
  const { isShow, message, toast } = useToast()

  const [editMode, setEditMode] = useState(false)

  const handleEditClick = () => {
    setEditMode((prev) => !prev)
  }

  const handleSaveClick = () => {
    setEditMode((prev) => !prev)
  }

  console.log(editMode)
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
        {editMode ? (
          <InfoContainer>
            <EditBox>
              <Label>이메일</Label>
              <Input ref={emailInputRef} placeholder="Email" />
            </EditBox>
            <EditBox>
              <Label>주소</Label>
              <Input ref={addressInputRef} placeholder="Address" />
            </EditBox>
            <EditBox>
              <Label>결제수단</Label>
              <Input ref={cardNumInputRef} placeholder="Card Number" />
            </EditBox>
            <SaveButton clickHandler={handleSaveClick}>저장</SaveButton>
          </InfoContainer>
        ) : (
          <InfoContainer>
            <Info>이메일 : {GetLoggedAccountData().email}</Info>
            {GetLoggedAccountData().address.address.length < 20 ? (
              <Info>주소 : {GetLoggedAccountData().address.address}</Info>
            ) : (
              <Info>
                주소 : {GetLoggedAccountData().address.address.slice(0, 20)}...
              </Info>
            )}
            <Info>결제수단 : {GetLoggedAccountData().card_number}</Info>
            {/* <EditButton clickHandler={handleEditClick}>정보 수정</EditButton> */}
          </InfoContainer>
        )}
      </Container>
    </Layout>
  )
}
