import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components/macro'
import UserTable from './UserTable/UserTable'
import Search from 'Components/Admin/Search'
import UserAddForm from './UserTable/UserAddForm/UserAddForm'
import Pagination from 'Pages/Admin/Pagination/Pagination'
import useDidMountEffect from 'Utils/Hooks/useDidMountEffect'
import { userListStorage } from 'Utils/Storage'

export default function Admin() {
  const [usersInfo, setUsersInfo] = useState([])
  const [isOpenedUserAddForm, setIsOpenedUserAddForm] = useState(false)
  const [filterInfo, setFilterInfo] = useState([])
  const [pagingData, setPagingData] = useState({
    currentPage: 1,
    fullPage: 0,
  })
  const [searchCheck, setSearchCheck] = useState(false)
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
    const userList = userListStorage.load()

    setUsersInfo(userList.slice(0, 5))
    setPagingData({ currentPage: 1, fullPage: Math.ceil(userList.length / 5) })
  }, [])

  // 페이지 변경
  useDidMountEffect(() => {
    const userList = userListStorage.load()
    const temp = userList.slice(
      pagingData.currentPage * 5 - 5,
      pagingData.currentPage * 5
    )

    setFilterInfo(temp)
    setSearchCheck(true)
    console.log('페이지 변경', pagingData.currentPage)
  }, [pagingData.currentPage])

  const filterUserInfo = (selected) => {
    // const getData = JSON.parse(localStorage.getItem('data'))
    let inputValue = searchRef.current.value
    let filtering = ''
    // let dataFilter = []

    if (inputValue.length > 0 && selected !== '선택') {
      if (selected === '이메일') filtering = 'email'
      if (selected === '이름') filtering = 'name'
      if (selected === '나이') filtering = 'age'
      const dataFilter = usersInfo.filter(
        (item) => item[filtering].indexOf(inputValue) !== -1
      )

      // const dataFilter = getData
      //   .filter((item) => item[filtering].indexOf(inputValue) !== -1)
      //   .slice(pagingData.currentPage * 5 - 5, pagingData.currentPage * 5)
      // const lastId = dataFilter.filter((ele, index) => index === 5)[0].id

      console.log('검색결과', dataFilter)
      // console.log('마지막', lastId)

      setFilterInfo(dataFilter)
      setPagingData({
        // currentPage: 1,
        ...pagingData,
        fullPage: Math.ceil(dataFilter.length / 5),
      })
    }
    setSearchCheck(true)
  }

  const refreshBtn = () => {
    setFilterInfo(usersInfo)
    setSearchCheck(false)
    setPagingData({ currentPage: 1, fullPage: Math.ceil(usersInfo.length / 5) })
  }

  const changePageNum = (e) => {
    // prev, next
    if (e.target.dataset.check) {
      if (e.target.dataset.check === 'prev') {
        setPagingData({
          ...pagingData,
          currentPage: pagingData.currentPage - 1,
          // currentPage:
          //   pagingData.currentPage > 1 ? pagingData.currentPage - 1 : 1,
        })
      }
      if (e.target.dataset.check === 'next') {
        setPagingData({
          ...pagingData,
          currentPage: pagingData.currentPage + 1,
        })
      }
    }
    // number btn
    else {
      setPagingData({ ...pagingData, currentPage: Number(e.target.innerText) })
    }
  }

  return (
    <AdminWrapper>
      <Search
        filterUserInfo={filterUserInfo}
        searchRef={searchRef}
        refreshBtn={refreshBtn}
      />
      <UserTable
        usersInfo={usersInfo}
        setUsersInfo={setUsersInfo}
        setIsOpenedUserAddForm={setIsOpenedUserAddForm}
        filterData={filterInfo}
        searchCheck={searchCheck}
      />
      {isOpenedUserAddForm && (
        <UserAddForm
          userDataTemplate={getUserDataTemplate()}
          handleAddUserInfo={handleAddUserInfo}
          setIsOpenedUserAddForm={setIsOpenedUserAddForm}
        />
      )}
      <UserAddButtonWrapper>
        <UserAddButton onClick={() => setIsOpenedUserAddForm(true)}>
          사용자 추가
        </UserAddButton>
      </UserAddButtonWrapper>
      <Pagination pagingData={pagingData} changePageNum={changePageNum} />
    </AdminWrapper>
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
