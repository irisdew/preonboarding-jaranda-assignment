import React from 'react'
import styled from 'styled-components'
import UserAddInput from './UserAddInput/UserAddInput'

export default function UserAddForm({ userData }) {
  return (
    <Form>
      <TitleWrapper>
        <h1>사용자 계정 생성</h1>
      </TitleWrapper>
      <BodyWrapper>
        {userData.map((data) => (
          <UserAddInput data={data} />
        ))}
        <div>
          <button type="submit">확인</button>
          <button type="button">취소</button>
        </div>
      </BodyWrapper>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  padding: 10px;
  border: 1px solid #cbcbcb;
  border-radius: 20px;
}
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 5px;

  h1 {
    font-size: 25px;
    font-weight: bold;
  }
`

const BodyWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;

  button {
    margin: 10px;
    width: 80px;
    height: 40px;
    border: 1px solid #cbcbcb;
    border-radius: 10px;

    :hover {
      cursor: pointer;
    }
  }
`
