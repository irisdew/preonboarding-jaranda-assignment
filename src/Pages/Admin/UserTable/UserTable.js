import React from 'react'
import styled from 'styled-components'
import UserCategoryRow from './UserCategoryRow/UserCategoryRow'
import UserRows from './UserRows/UserRows'

export default function UserTable({ usersData, setUserData }) {
  const handleClickTable = () => {
    console.log(1)
  }
  return (
    <Table onClick={handleClickTable}>
      <UserCategoryRow />
      <UserRows usersData={usersData} />
    </Table>
  )
}

const Table = styled.table`
  width: 100%;
`
