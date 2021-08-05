import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components/macro'
import UserTable from './UserTable/UserTable'
import Search from 'Pages/Admin/Search/Search'
import UserAddForm from './UserTable/UserAddForm/UserAddForm'
import Pagination from 'Pages/Admin/Pagination/Pagination'
import Toast from 'Components/Toast/Toast'
import useToast from 'Utils/Hooks/useToast'
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
  const { isShow, message, toast } = useToast()
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

    // setUsersInfo(userList.slice(0, 5))
    setUsersInfo(userList)
    setPagingData({ currentPage: 1, fullPage: Math.ceil(userList.length / 5) })
    setFilterInfo(userList.slice(0, 5))
  }, [])

  // 페이지 변경
  useDidMountEffect(() => {
    // 검색하고 페이지 변경하는 경우
    if (usersInfo.length < userListStorage.load().length) {
      setFilterInfo(
        usersInfo.slice(
          pagingData.currentPage * 5 - 5,
          pagingData.currentPage * 5
        )
      )
      // setSearchCheck(true)
    }
    // 검색하지 않고 페이지 변경하는 경우
    if (usersInfo.length === userListStorage.load().length) {
      setFilterInfo(
        usersInfo.slice(
          pagingData.currentPage * 5 - 5,
          pagingData.currentPage * 5
        )
      )
      // setSearchCheck(true)
    }
  }, [pagingData.currentPage])

  const filterUserInfo = (selected) => {
    const userList = userListStorage.load()
    const inputValue = searchRef.current.value

    // 메뉴 선택하지 않고 검색하는 경우
    if (inputValue.length > 0 && selected === '선택') {
      const dataFilter = userList.filter(
        (item) =>
          item.email.indexOf(inputValue) !== -1 ||
          item.name.indexOf(inputValue) !== -1 ||
          item.age.indexOf(inputValue) !== -1
      )
      // 검색 결과 없음
      if (dataFilter.length === 0) toast('일치하는 검색결과가 없습니다')

      console.log('검색결과', dataFilter)

      setUsersInfo(dataFilter)
      // setFilterInfo(filterSlice)
      setFilterInfo(
        dataFilter.slice(
          pagingData.currentPage * 5 - 5,
          pagingData.currentPage * 5
        )
      )
      setPagingData({
        currentPage: 1,
        fullPage: Math.ceil(dataFilter.length / 5),
      })
      // setSearchCheck(true)
    }

    // 메뉴 선택하고 검색하는 경우
    if (inputValue.length > 0 && selected !== '선택') {
      let filtering = ''
      if (selected === '이메일') filtering = 'email'
      if (selected === '이름') filtering = 'name'
      if (selected === '나이') filtering = 'age'
      const dataFilter = userList.filter(
        (item) => item[filtering].indexOf(inputValue) !== -1
      )

      // 검색 결과 없음
      if (dataFilter.length === 0) toast('일치하는 검색결과가 없습니다')

      console.log('검색결과', dataFilter)

      setUsersInfo(dataFilter)
      setFilterInfo(
        dataFilter.slice(
          pagingData.currentPage * 5 - 5,
          pagingData.currentPage * 5
        )
      )
      setPagingData({
        currentPage: 1,
        fullPage: Math.ceil(dataFilter.length / 5),
      })
    }
  }

  const refreshBtn = () => {
    const userList = userListStorage.load()
    setUsersInfo(userList)
    setPagingData({ currentPage: 1, fullPage: Math.ceil(userList.length / 5) })
    setFilterInfo(userList.slice(0, 5))
    toast('검색결과가 초기화 되었습니다')
  }

  const changePageNum = (e) => {
    setPagingData({ ...pagingData, currentPage: Number(e.target.innerText) })
  }

  const arrowBtn = (e) => {
    let target = e.target.dataset.check
    if (e.target.localName === 'path') {
      target = e.target.parentNode.parentNode.dataset.check
    }

    if (target === 'prev') {
      setPagingData({
        ...pagingData,
        currentPage: pagingData.currentPage - 1,
      })
    }
    if (target === 'next') {
      setPagingData({
        ...pagingData,
        currentPage: pagingData.currentPage + 1,
      })
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
      <Pagination
        pagingData={pagingData}
        changePageNum={changePageNum}
        arrowBtn={arrowBtn}
      />
      <Toast message={message} isShow={isShow} />
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
  /* align-items: center; */
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
