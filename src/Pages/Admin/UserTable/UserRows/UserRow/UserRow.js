import React from 'react'
import UserCell from './UserCell/UserCell'

export default function UserRow({
  userInfo: {
    id,
    email,
    name,
    age,
    address: { address, postcode, address_detail },
    card_number,
    auth,
  },
}) {
  const userInfo = [
    id,
    email,
    name,
    age,
    postcode,
    address,
    address_detail,
    card_number,
    auth,
  ]

  return (
    <tr id={id}>
      {userInfo.map((info, index) => (
        <UserCell key={index} info={info} id={id} index={index} />
      ))}
    </tr>
  )
}
