import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { UserProfile, UserContainer } from 'Components/Mypage/UserProfile'
import { InfoBox } from 'Components/Mypage/InfoBox'
import { EditBox } from 'Components/Mypage/EditBox'
import { accountInfoType } from 'Constant'

export default function MyInfo() {
  const [editMode, setEditMode] = useState({
    email: false,
    password: false,
    address: false,
    cardNum: false,
  })

  return (
    <Container>
      <UserProfile />
      <InfoContainer>
        {!editMode.email ? (
          <InfoBox
            infoTitle={accountInfoType.EMAIL.desc}
            infoType={accountInfoType.EMAIL.name}
            setEditMode={setEditMode}
          />
        ) : (
          <EditBox
            inputTitle={accountInfoType.EMAIL.desc}
            inputType={accountInfoType.EMAIL.name}
            setEditMode={setEditMode}
          />
        )}
        {!editMode.password ? (
          <InfoBox
            infoTitle={accountInfoType.PASSWORD.desc}
            infoType={accountInfoType.PASSWORD.name}
            setEditMode={setEditMode}
          />
        ) : (
          <EditBox
            inputTitle={accountInfoType.PASSWORD.desc}
            inputType={accountInfoType.PASSWORD.name}
            setEditMode={setEditMode}
          />
        )}

        {!editMode.address ? (
          <InfoBox
            infoTitle="주소"
            infoType="address"
            setEditMode={setEditMode}
          />
        ) : (
          <EditBox
            inputTitle={accountInfoType.ADDRESS.desc}
            inputType={accountInfoType.ADDRESS.name}
            setEditMode={setEditMode}
          />
        )}
        {!editMode.cardNum ? (
          <InfoBox
            infoTitle={accountInfoType.CARD_NUMBER.desc}
            infoType={accountInfoType.CARD_NUMBER.name}
            setEditMode={setEditMode}
          />
        ) : (
          <EditBox
            inputTitle={accountInfoType.CARD_NUMBER.desc}
            inputType={accountInfoType.CARD_NUMBER.name}
            setEditMode={setEditMode}
          />
        )}
      </InfoContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
`

const InfoContainer = styled(UserContainer)`
  min-width: 500px;
  text-align: left;
  padding-top: 15px;
  @media screen and ${({ theme }) => theme.device.tablet} {
    min-width: 230px;
    height: 22vw;
    min-height: 250px;
    padding: 25px 15px;
  }
  @media screen and ${({ theme }) => theme.device.mobile} {
    min-width: 230px;
    padding: 0 10px;
  }
`
