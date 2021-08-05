import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Layout from 'Layout/Layout'
import { UserProfile, UserContainer } from 'Components/Mypage/UserProfile'
import { InfoBox } from 'Components/Mypage/InfoBox'
import { EditBox } from 'Components/Mypage/EditBox'

export default function Mypage() {
  const [editEmail, setEditEmail] = useState(false)
  const [editAddress, setEditAddress] = useState(false)
  const [editCardNum, setEditCardNum] = useState(false)

  return (
    <Layout>
      <Container>
        <UserProfile />
        <InfoContainer>
          {!editEmail ? (
            <InfoBox
              infoTitle="이메일"
              infoType="email"
              setEditEmail={setEditEmail}
            />
          ) : (
            <EditBox
              inputTitle="이메일"
              inputType="email"
              setEditEmail={setEditEmail}
            />
          )}
          {!editAddress ? (
            <InfoBox
              infoTitle="주소"
              infoType="address"
              setEditAddress={setEditAddress}
            />
          ) : (
            <EditBox
              inputTitle="주소"
              inputType="address"
              setEditAddress={setEditAddress}
            />
          )}
          {!editCardNum ? (
            <InfoBox
              infoTitle="결제 수단"
              infoType="card_number"
              setEditCardNum={setEditCardNum}
            />
          ) : (
            <EditBox
              inputTitle="결제 수단"
              inputType="card_number"
              setEditCardNum={setEditCardNum}
            />
          )}
        </InfoContainer>
      </Container>
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

const InfoContainer = styled(UserContainer)`
  min-width: 500px;
  text-align: left;
  @media screen and ${({ theme }) => theme.device.tablet} {
    min-width: 230px;
    height: 22vw;
    min-height: 250px;
    padding: 10px;
  }
`
