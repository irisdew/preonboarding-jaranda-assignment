import { UsersInfoContext } from 'Pages/Admin/Admin'
import React, { useContext } from 'react'
import UserRow from './UserRow/UserRow'

export default function UserRows() {
  const { usersInfo } = useContext(UsersInfoContext)
  return (
    <tbody>
      {usersInfo.map((userInfo) => (
        <UserRow key={userInfo.id} userInfo={userInfo} />
      ))}
    </tbody>
  )
}
