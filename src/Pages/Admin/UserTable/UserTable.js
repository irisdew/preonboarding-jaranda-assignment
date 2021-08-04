import React, { createContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import UserCategoryRow from './UserCategoryRow/UserCategoryRow'
import UserRows from './UserRows/UserRows'

<<<<<<< HEAD
export const EditContext = createContext({
  targetData: {},
  usersInfo: [],
  setUsersInfo: () => {},
})

export default function UserTable({ usersInfo, setUsersInfo }) {
  const [targetData, setTargetData] = useState({
    id: '',
    index: '',
  })
  const value = useMemo(
    () => ({
      targetData,
      usersInfo,
      setUsersInfo,
    }),
    [targetData, usersInfo, setUsersInfo]
  )

  const handleClickTable = ({ target: { parentNode, id, nodeName } }) => {
    if (nodeName === 'INPUT') return

    const [clickedRowData] = usersInfo.filter((data) => {
      return data.id === Number(parentNode.id)
    })

    setTargetData({
      id: clickedRowData.id,
      index: Number(id),
    })
=======
export default function UserTable({ usersData, filterData }) {
  const handleClickTable = () => {
    console.log('1')
>>>>>>> develop
  }

  return (
    <Table onClick={handleClickTable}>
      <UserCategoryRow />
<<<<<<< HEAD
      <EditContext.Provider value={value}>
        <UserRows usersInfo={usersInfo} />
      </EditContext.Provider>
=======
      {filterData.length !== 0 ? (
        <UserRows usersData={filterData} />
      ) : (
        <UserRows usersData={usersData} />
      )}
>>>>>>> develop
    </Table>
  )
}

const Table = styled.table`
  width: 100%;
  min-width: 1000px;
  max-width: 1200px;
  background: white;
  z-index: 10;

  :hover {
    cursor: pointer;
  }
`
