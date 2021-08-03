import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components/macro'
import UserTable from './UserTable/UserTable'

import Search from 'Components/Admin/Search'
import UserAddForm from './UserTable/UserAddForm/UserAddForm'

export default function Admin() {
  const [userInfo, setUserInfo] = useState([])
  const searchRef = useRef()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    fetch('http://localhost:3002/data/users.json')
      .then((res) => res.json())
      .then((res) => {
        setUserInfo(res)
      })
  }

  const filterUserInfo = (selected) => {
    let inputValue = searchRef.current.value
    let filtering = ''
    let dataFilter = []
    // fetchData()

    // if (e.target.nextElementSibling) {
    if (inputValue.length > 0 && selected !== '선택') {
      // const inputValue = e.target.nextElementSibling.value

      if (selected === '아이디') filtering = 'email'
      if (selected === '이름') filtering = 'name'
      if (selected === '나이') {
        filtering = 'age'
        dataFilter = userInfo.filter(
          (item) => String(item[filtering]).indexOf(inputValue) !== -1
        )
      } else {
        dataFilter = userInfo.filter(
          (item) => item[filtering].indexOf(inputValue) !== -1
        )
      }
      console.log('검색결과', dataFilter)
      console.log(dataFilter)
      setUserInfo(dataFilter)
    }
  }

  return (
    <AdminWrapper>
      <Search filterUserInfo={filterUserInfo} searchRef={searchRef} />
      <UserTable usersData={userInfo} setUsersData={setUserInfo} />
      <UserAddForm userData={getUserDataTemplate()} />
      <UserAddButtonWrapper>
        <UserAddButton>사용자 추가</UserAddButton>
      </UserAddButtonWrapper>
    </AdminWrapper>
  )
}

function getUserDataTemplate(id) {
  const template = {
    // id,
    email: 'ex: abcdefg@jaranda.com',
    name: 'ex: 김학생',
    age: 'ex: 10',
    address: 'ex: 경기도 부천시 경인로117번길 27',
    card_num: 'ex: 0000-0000-0000-0000',
    auth: 'ex: parent',
  }
  return Object.entries(template)
}

const AdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const UserAddButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`

const UserAddButton = styled.button`
  margin-top: 20px;
  width: 100px;
  height: 50px;
  border: 1px solid black;
`
