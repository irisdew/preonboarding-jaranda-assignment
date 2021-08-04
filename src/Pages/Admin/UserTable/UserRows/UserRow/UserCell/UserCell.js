import { EditContext } from 'Pages/Admin/UserTable/UserTable'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

const TABLE = {
  0: 'id',
  1: 'email',
  2: 'name',
  3: 'age',
  4: 'address',
  5: 'card_number',
  6: 'auth',
}

export default function UserCell({ info, id, index }) {
  const [editInputData, setEditInputData] = useState('')
  const [isOpenedEditInput, setIsOpenedEditInput] = useState(false)
  const { targetData, usersInfo, setUsersInfo } = useContext(EditContext)

  useEffect(() => {
    if (
      index !== targetData.index ||
      id !== targetData.id ||
      targetData.index === 0
    )
      return

    setIsOpenedEditInput(true)
  }, [index, id, targetData])

  const handleBlurInput = () => {
    if (editInputData.length) {
      const [modifiedItem] = usersInfo.filter(
        (userInfo) => userInfo.id === targetData.id
      )
      const modifiedItems = usersInfo.map((userInfo) => {
        if (userInfo.id === targetData.id) {
          if (TABLE[index] === 'address') {
            console.log(1)
            return {
              ...modifiedItem,
              [TABLE[index]]: { [TABLE[index]]: editInputData },
            }
          } else {
            return { ...modifiedItem, [TABLE[index]]: editInputData }
          }
        } else {
          return userInfo
        }
      })

      setUsersInfo(modifiedItems)
    }
    setIsOpenedEditInput(false)
  }

  return isOpenedEditInput ? (
    <EditTd>
      <EditInput
        placeholder={info}
        value={editInputData}
        onChange={({ target: { value } }) => setEditInputData(value)}
        onBlur={handleBlurInput}
        id={index}
        autoFocus
      />
    </EditTd>
  ) : (
    <Td id={index}>{info}</Td>
  )
}

const EditTd = styled.td`
  border: 3px solid #4b85fc;
`

const EditInput = styled.input`
  padding: 0 10px;
  width: ${(props) =>
    props.id === 2 || props.id === 3 || props.id === 6 ? '70px' : '200px'};
  height: 50px;
`

const Td = styled.td`
  padding: 0 20px;
  height: 50px;
  border: 1px solid #cbcbcb;
  text-align: center;
  line-height: 50px;
`
