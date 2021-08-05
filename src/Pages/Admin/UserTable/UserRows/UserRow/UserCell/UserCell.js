import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { EditContext } from 'Pages/Admin/UserTable/UserTable'
import { UsersInfoContext } from 'Pages/Admin/Admin'
import { userListStorage } from 'Utils/Storage'
import useValidateCell from 'Utils/Hooks/useValidateCell'

const DATA_TABLE_KEY_VALUE = {
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
  // const [isOpenedEditInput, setIsOpenedEditInput] = useState(false)
  const { targetData, setTargetData } = useContext(EditContext)
  const { usersInfo, filterInfo, setUsersInfo } = useContext(UsersInfoContext)
  const { isOpenedEditInput, setIsOpenedEditInput } = useValidateCell(
    index,
    id,
    targetData
  )

  const handleBlurInput = () => {
    if (editInputData.length) {
      const originalUsersInfo = userListStorage.load()
      const [modifiedItem] = usersInfo.filter(
        (userInfo) => userInfo.id === targetData.id
      )

      const modifyCallback = (userInfo) => {
        if (userInfo.id === targetData.id) {
          if (DATA_TABLE_KEY_VALUE[index] === 'address') {
            return {
              ...modifiedItem,
              [DATA_TABLE_KEY_VALUE[index]]: {
                [DATA_TABLE_KEY_VALUE[index]]: editInputData,
              },
            }
          } else {
            return {
              ...modifiedItem,
              [DATA_TABLE_KEY_VALUE[index]]: editInputData,
            }
          }
        } else {
          return userInfo
        }
      }

      const modifiedStates = usersInfo.map(modifyCallback)
      const modifiedItems = originalUsersInfo.map(modifyCallback)

      setUsersInfo(modifiedStates)
      userListStorage.save(modifiedItems)
    }
    setIsOpenedEditInput(false)
    setTargetData({ id: '', index: '' })
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
  border: 2px solid #4b85fc;
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
  font-size: 13.5px;
  text-align: center;
  line-height: 50px;
`
