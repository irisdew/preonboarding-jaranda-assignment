import React from 'react'
import styled from 'styled-components'
import UserCategoryRow from './UserCategoryRow/UserCategoryRow'
import UserRows from './UserRows/UserRows'

export default function UserTable({ usersData, filterData }) {
  const handleClickTable = () => {
    console.log('1')
  }

  return (
    <Table onClick={handleClickTable}>
      <UserCategoryRow />
      {filterData.length !== 0 ? (
        <UserRows usersData={filterData} />
      ) : (
        <UserRows usersData={usersData} />
      )}
    </Table>
  )
}

const Table = styled.table`
  width: 100%;
`
