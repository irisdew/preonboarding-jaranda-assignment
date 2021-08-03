import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components/macro'
import UserTable from './UserTable/UserTable'

import Search from 'Pages/Admin/Search/Search'

export default function Admin() {
  const [userInfo, setUserInfo] = useState([])
  const [filterInfo, setFilterInfo] = useState([])
  const searchRef = useRef()

  useEffect(() => {
    fetch('http://localhost:3000/data/users.json')
      .then((res) => res.json())
      .then((res) => {
        setUserInfo(res)
      })
  }, [])

  const filterUserInfo = (selected) => {
    let inputValue = searchRef.current.value
    let filtering = ''
    let dataFilter = []

    if (inputValue.length > 0 && selected !== '선택') {
      if (selected === '이메일') filtering = 'email'
      if (selected === '이름') filtering = 'name'
      if (selected === '나이') filtering = 'age'
      dataFilter = userInfo.filter(
        (item) => item[filtering].indexOf(inputValue) !== -1
      )

      console.log('검색결과', dataFilter)
      setFilterInfo(dataFilter)
    }
  }

  const refreshBtn = () => {
    setFilterInfo(userInfo)
  }

  return (
    <div>
      <Search
        filterUserInfo={filterUserInfo}
        searchRef={searchRef}
        refreshBtn={refreshBtn}
      />
      <UserTable
        usersData={userInfo}
        filterData={filterInfo}
        setUsersData={setUserInfo}
      />
      <UserAddButtonWrapper>
        <UserAddButton>사용자 추가</UserAddButton>
      </UserAddButtonWrapper>
    </div>
  )
}

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
