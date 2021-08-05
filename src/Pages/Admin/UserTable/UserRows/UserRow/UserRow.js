import React from 'react'
import UserCell from './UserCell/UserCell'

export default function UserRow({
  userInfo: {
    id,
    email,
    name,
    age,
    address: { address },
    card_number,
    auth,
  },
}) {
  const userInfo = [id, email, name, age, address, card_number, auth]

  return (
    <tr id={id}>
      {userInfo.map((info, index) => (
        <UserCell key={index} info={info} id={id} index={index} />
      ))}
    </tr>
  )
}
