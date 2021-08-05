import { FilterInfoContext } from 'Pages/Admin/Admin'
import React, { useContext } from 'react'
import UserRow from './UserRow/UserRow'

export default function UserRows() {
  const { filterInfo } = useContext(FilterInfoContext)

  return (
    <tbody>
      {filterInfo.map((userInfo) => (
        <UserRow key={userInfo.id} userInfo={userInfo} />
      ))}
    </tbody>
  )
}
