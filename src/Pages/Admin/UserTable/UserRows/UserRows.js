import React from 'react'
import UserRow from './UserRow/UserRow'

export default function UserRows({ usersInfo }) {
  return (
    <tbody>
      {usersInfo.map((userInfo) => (
        <UserRow key={userInfo.id} userInfo={userInfo} />
      ))}
    </tbody>
  )
}
