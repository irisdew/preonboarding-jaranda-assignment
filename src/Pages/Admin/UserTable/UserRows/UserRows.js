import { FilterInfoContext } from 'Pages/Admin/Admin'
import React, { useContext } from 'react'
import UserRow from './UserRow/UserRow'

export default function UserRows() {
  const { filterInfo } = useContext(FilterInfoContext)

  return (
    <tbody>
      {filterInfo.length
        ? filterInfo.map((userInfo) => (
            <UserRow key={userInfo.id} userInfo={userInfo} />
          ))
        : getNullDataTemplate().map((userInfo, index) => (
            <UserRow key={index} userInfo={userInfo} />
          ))}
    </tbody>
  )
}

const getNullDataTemplate = () =>
  Array(5).fill({
    id: '',
    email: '',
    name: '',
    age: '',
    postcode: '',
    address: '',
    address_detail: '',
    card_number: '',
    auth: '',
  })
