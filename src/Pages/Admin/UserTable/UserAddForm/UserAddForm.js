import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import UserAddInput from './UserAddInput/UserAddInput'

export default function UserAddForm({
  setIsOpenedUserAddForm,
  handleAddUserInfo,
}) {
  const [newUserInfo, setNewUserInfo] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    postcode: '',
    address: '',
    detail: '',
    card_number: '',
    auth: '',
  })
  const [isStartAnimation, setIsStartAnimation] = useState(true)

  const handleNewUserInfo = (key, value) => {
    setNewUserInfo({ ...newUserInfo, [key]: value })
  }

  const handleClickButton = ({ target: { name } }) => {
    if (!name) return

    if (name === 'confirm') {
      const itemValue = Object.values(newUserInfo).find((value) => value === '')
      if (itemValue === '') {
        return alert('항목의 값을 입력해주세요')
      }

      handleAddUserInfo(newUserInfo)
    }
    setIsStartAnimation(false)
    setTimeout(() => setIsOpenedUserAddForm(false), 200)
  }

  return (
    <Form isStartAnimation={isStartAnimation}>
      <TitleWrapper>
        <h1>사용자 계정 생성</h1>
      </TitleWrapper>
      <BodyWrapper>
        {getUserDataTemplate().map((dataTemplate, index) => (
          <UserAddInput
            key={index}
            dataTemplate={dataTemplate}
            handleNewUserInfo={handleNewUserInfo}
          />
        ))}
        <div onClick={handleClickButton}>
          <button type="button" name="confirm">
            확인
          </button>
          <button type="button" name="cancel">
            취소
          </button>
        </div>
      </BodyWrapper>
    </Form>
  )
}

const getUserDataTemplate = () => {
  const template = {
    email: 'ex: abcdefg@jaranda.com',
    password: '00000000',
    name: 'ex: 김학생',
    age: 'ex: 10',
    card_number: 'ex: 0000-0000-0000-0000',
    auth: 'ex: parent',
    postcode: 'ex: 00000',
    address: 'ex: 경기도 부천시 경인로117번길 27',
    detail: 'ex: 204호',
  }
  return Object.entries(template)
}

const renderAnimation = keyframes`
    from {
        transform: translateY(-300px)
    } 
    to {
        transform: translateY(0)
    }
`

const cancelAnimation = keyframes`
    from {
        transform: translateY(0)
    } 
    to {
        transform: translateY(-300px)
    }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  padding: 10px;
  border: 1px solid #cbcbcb;
  border-radius: 20px;
  animation: ${(props) =>
    props.isStartAnimation ? renderAnimation : cancelAnimation} 0.4s;
}
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 5px 0 10px 0;

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
    border-radius: 10px;
    background: #87bf44;
    color: white;

    :hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }
`
