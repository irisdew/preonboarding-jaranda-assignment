import React, { createContext, useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import { UsersInfoContext } from '../Admin'
import UserCategoryRow from './UserCategoryRow/UserCategoryRow'
import UserRows from './UserRows/UserRows'

export const EditContext = createContext({
  targetData: {},
  setTargetData: () => {},
})

export default function UserTable({ filterData, searchCheck }) {
  const [targetData, setTargetData] = useState({
    id: '',
    index: '',
  })
  const { usersInfo } = useContext(UsersInfoContext)
  const value = useMemo(
    () => ({
      targetData,
      setTargetData,
    }),
    [targetData, setTargetData]
  )

  const handleClickTable = ({ target: { parentNode, id, nodeName } }) => {
    if (nodeName === 'INPUT') return

    const clickedRowData = usersInfo.find((data) => {
      return data.id === Number(parentNode.id)
    })

    setTargetData({
      id: clickedRowData.id,
      index: Number(id),
    })
  }

  return (
    <Table onClick={handleClickTable}>
      <UserCategoryRow />
      <EditContext.Provider value={value}>
        {searchCheck ? <UserRows usersInfo={filterData} /> : <UserRows />}
      </EditContext.Provider>
    </Table>
  )
}

const Table = styled.table`
  width: 100%;
  min-width: 1000px;
  max-width: 1100px;
  background: white;
  z-index: 10;

  :hover {
    cursor: pointer;
  }
`
