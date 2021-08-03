import React from 'react'
import UserRow from '../UserRow/UserRow'

export default function UserRows({ usersData }) {
  return (
    <tbody>
      {usersData.map((userData) => (
        <UserRow key={userData.id} userData={userData} />
      ))}
    </tbody>
  )
}
