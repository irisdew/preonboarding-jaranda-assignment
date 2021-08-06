import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useMemo,
} from 'react'
import styled from 'styled-components/macro'
import UserTable from 'Pages/Admin/UserTable/UserTable'
import Search from 'Pages/Admin/Search/Search'
import UserAddForm from 'Pages/Admin/UserTable/UserAddForm/UserAddForm'
import Pagination from 'Pages/Admin/Pagination/Pagination'
import Toast from 'Components/Toast/Toast'
import useToast from 'Utils/Hooks/useToast'
import { errorState } from 'Constant'
import { userListStorage } from 'Utils/Storage'
import AdminLayout from 'Layout/Admin/AdminLayout'

export const FilterInfoContext = createContext({
  filterInfo: [],
  setFilterInfo: () => {},
})

export default function Admin() {
  const [usersInfo, setUsersInfo] = useState([])
  const [isOpenedUserAddForm, setIsOpenedUserAddForm] = useState(false)
  const [filterInfo, setFilterInfo] = useState([])
  const [pagingData, setPagingData] = useState({
    currentPage: 1,
    fullPage: 0,
  })
  const { isShow, message, toast } = useToast()
  const isFristRun = useRef(true)
  const searchRef = useRef()
  const value = useMemo(
    () => ({
      filterInfo,
      setFilterInfo,
    }),
    [filterInfo, setFilterInfo]
  )

  const handleAddUserInfo = (value) => {
    const usersInfo = userListStorage.load()
    const newUserInfo = {
      ...value,
      id: usersInfo.length + 1,
      address: {
        address: value.address,
        postcode: value.postcode,
        address_detail: value.detail,
      },
    }

    if ('detail' in newUserInfo) {
      delete newUserInfo.detail
    }
    if ('postcode' in newUserInfo) {
      delete newUserInfo.postcode
    }

    userListStorage.save([...usersInfo, newUserInfo])
    setUsersInfo([...usersInfo, newUserInfo])
    setPagingData({
      currentPage: Math.ceil(userListStorage.load().length / 5),
      fullPage: Math.ceil(userListStorage.load().length / 5),
    })
  }

  useEffect(() => {
    const userList = userListStorage.load()

    setUsersInfo(userList)
    setPagingData({ currentPage: 1, fullPage: Math.ceil(userList.length / 5) })
    setFilterInfo(userList.slice(0, 5))
  }, [])

  useEffect(() => {
    if (isFristRun.current) {
      isFristRun.current = false
      return
    }

    if (usersInfo.length < userListStorage.load().length) {
      setFilterInfo(
        usersInfo.slice(
          pagingData.currentPage * 5 - 5,
          pagingData.currentPage * 5
        )
      )
    }
    if (usersInfo.length === userListStorage.load().length) {
      setFilterInfo(
        usersInfo.slice(
          pagingData.currentPage * 5 - 5,
          pagingData.currentPage * 5
        )
      )
    }
  }, [pagingData.currentPage, usersInfo])

  const filterUserInfo = (selected) => {
    const userList = userListStorage.load()
    const inputValue = searchRef.current.value

    if (inputValue.length > 0 && selected === '선택') {
      const dataFilter = userList.filter(
        (item) =>
          item.email.indexOf(inputValue) !== -1 ||
          item.name.indexOf(inputValue) !== -1 ||
          item.age.indexOf(inputValue) !== -1
      )

      if (dataFilter.length === 0) {
        toast(errorState.NO_RESULT_SEARCH.desc)
      }

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

    if (inputValue.length > 0 && selected !== '선택') {
      let filtering = ''
      if (selected === '이메일') filtering = 'email'
      if (selected === '이름') filtering = 'name'
      if (selected === '나이') filtering = 'age'
      const dataFilter = userList.filter(
        (item) => item[filtering].indexOf(inputValue) !== -1
      )

      if (dataFilter.length === 0) {
        toast(errorState.NO_RESULT_SEARCH.desc)
      }

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
    toast(errorState.INIT_RESULT_SEARCH.desc)
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
    <AdminLayout header>
      <AdminWrapper>
        <Search
          filterUserInfo={filterUserInfo}
          searchRef={searchRef}
          refreshBtn={refreshBtn}
        />
        <FilterInfoContext.Provider value={value}>
          <UserTable setIsOpenedUserAddForm={setIsOpenedUserAddForm} />
        </FilterInfoContext.Provider>
        {isOpenedUserAddForm && (
          <UserAddForm
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
    </AdminLayout>
  )
}

const AdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1390px;
  margin: 50px auto 0 auto;
  padding: 0 50px;

  @media ${(props) => props.theme.device.tablet} {
    margin: 0 auto;
  }
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
