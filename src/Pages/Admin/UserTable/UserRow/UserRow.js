import React from 'react'
import UserCell from '../UserCell/UserCell'

export default function UserRow({
  userData: {
    id,
    email,
    name,
    age,
    address: { address },
    card_number,
    auth,
  },
}) {
  const userData = [id + 1, email, name, age, address, card_number, auth]

  return (
    <tr>
      {userData.map((data, index) => (
        <UserCell key={index} data={data} />
      ))}
    </tr>
  )
}
