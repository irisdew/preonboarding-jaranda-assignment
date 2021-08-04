import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components/macro'
import UserTable from './UserTable/UserTable'

<<<<<<< HEAD
import Search from 'Components/Admin/Search'
import UserAddForm from './UserTable/UserAddForm/UserAddForm'

export default function Admin() {
  const [usersInfo, setUsersInfo] = useState([])
  const [isOpenedUserAddForm, setIsOpenedUserAddForm] = useState(false)
=======
import Search from 'Pages/Admin/Search/Search'
import Pagination from 'Pages/Admin/Pagination/Pagination'

export default function Admin() {
  const [userInfo, setUserInfo] = useState([])
  const [filterInfo, setFilterInfo] = useState([])
  const [pagingData, setPagingData] = useState({
    currentPage: 0,
    fullPage: 0,
  })
>>>>>>> develop
  const searchRef = useRef()

  const handleAddUserInfo = (value) => {
    const newUserInfo = {
      ...value,
      id: usersInfo.length,
      address: { address: value.address },
    }
    setUsersInfo([...usersInfo, newUserInfo])
  }

  useEffect(() => {
<<<<<<< HEAD
    fetchData()
  }, [])

  const fetchData = () => {
    fetch('http://localhost:3002/data/users.json')
      .then((res) => res.json())
      .then((res) => {
        setUsersInfo(res)
=======
    fetch('http://localhost:3000/data/users.json')
      .then((res) => res.json())
      .then((res) => {
        setUserInfo(res)
        setPagingData({ currentPage: 1, fullPage: Math.ceil(res.length / 4) })
>>>>>>> develop
      })
  }, [])

  const filterUserInfo = (selected) => {
    let inputValue = searchRef.current.value
    let filtering = ''
    let dataFilter = []
<<<<<<< HEAD
    // fetchData()
=======
>>>>>>> develop

    if (inputValue.length > 0 && selected !== '선택') {
      if (selected === '이메일') filtering = 'email'
      if (selected === '이름') filtering = 'name'
<<<<<<< HEAD
      if (selected === '나이') {
        filtering = 'age'
        dataFilter = usersInfo.filter(
          (item) => String(item[filtering]).indexOf(inputValue) !== -1
        )
      } else {
        dataFilter = usersInfo.filter(
          (item) => item[filtering].indexOf(inputValue) !== -1
        )
      }
      console.log('검색결과', dataFilter)
      console.log(dataFilter)
      setUsersInfo(dataFilter)
    }
  }

  console.log(usersInfo)

  return (
    <AdminWrapper>
      <Search filterUserInfo={filterUserInfo} searchRef={searchRef} />
      <UserTable
        usersInfo={usersInfo}
        setUsersInfo={setUsersInfo}
        setIsOpenedUserAddForm={setIsOpenedUserAddForm}
      />
      {isOpenedUserAddForm && (
        <UserAddForm
          userDataTemplate={getUserDataTemplate()}
          handleAddUserInfo={handleAddUserInfo}
          setIsOpenedUserAddForm={setIsOpenedUserAddForm}
        />
      )}
=======
      if (selected === '나이') filtering = 'age'
      dataFilter = userInfo.filter(
        (item) => item[filtering].indexOf(inputValue) !== -1
      )

      console.log('검색결과', dataFilter)

      setFilterInfo(dataFilter)
      setPagingData({
        currentPage: 1,
        fullPage: Math.ceil(dataFilter.length / 4),
      })
    }
  }

  const refreshBtn = () => {
    setFilterInfo(userInfo)
    setPagingData({
      currentPage: 1,
      fullPage: Math.ceil(userInfo.length / 4),
    })
  }

  return (
    <>
      <Search
        filterUserInfo={filterUserInfo}
        searchRef={searchRef}
        refreshBtn={refreshBtn}
      />
      <UserTable usersData={userInfo} filterData={filterInfo} />
>>>>>>> develop
      <UserAddButtonWrapper>
        <UserAddButton onClick={() => setIsOpenedUserAddForm(true)}>
          사용자 추가
        </UserAddButton>
      </UserAddButtonWrapper>
<<<<<<< HEAD
    </AdminWrapper>
=======
      <Pagination pagingData={pagingData} />
    </>
>>>>>>> develop
  )
}

function getUserDataTemplate() {
  const template = {
    email: 'ex: abcdefg@jaranda.com',
    name: 'ex: 김학생',
    age: 'ex: 10',
    address: 'ex: 경기도 부천시 경인로117번길 27',
    card_number: 'ex: 0000-0000-0000-0000',
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
  height: 40px;
  background: #4b85fc;
  color: white;
  border-radius: 10px;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`
