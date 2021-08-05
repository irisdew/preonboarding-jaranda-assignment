import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { EditContext } from 'Pages/Admin/UserTable/UserTable'
import { FilterInfoContext } from 'Pages/Admin/Admin'
import { userListStorage } from 'Utils/Storage'
import useValidateCell from 'Pages/Admin/UserTable/Hooks/useValidateCell'

export default function UserCell({ info, id, index }) {
  const [editInputData, setEditInputData] = useState('')
  const { targetData, setTargetData } = useContext(EditContext)
  const { filterInfo, setFilterInfo } = useContext(FilterInfoContext)
  const { isOpenedEditInput, setIsOpenedEditInput } = useValidateCell(
    index,
    id,
    targetData
  )

  useEffect(() => {
    setEditInputData(info)
  }, [info])

  const saveModifiedData = () => {
    setIsOpenedEditInput(false)
    setTargetData({ id: '', index: '' })

    if (editInputData === info) return
    if (!editInputData.length) return

    const originalUsersInfo = userListStorage.load()
    const [modifiedItem] = filterInfo.filter(
      (userInfo) => userInfo.id === targetData.id
    )

    const modifyCallback = (userInfo) => {
      if (userInfo.id === targetData.id) {
        if (
          DATA_TABLE[index] === DATA_TABLE[4] ||
          DATA_TABLE[index] === DATA_TABLE[5] ||
          DATA_TABLE[index] === DATA_TABLE[6]
        ) {
          return {
            ...modifiedItem,
            address: {
              ...userInfo.address,
              [DATA_TABLE[index]]: editInputData,
            },
          }
        } else {
          return {
            ...modifiedItem,
            [DATA_TABLE[index]]: editInputData,
          }
        }
      } else {
        return userInfo
      }
    }

    const modifiedStates = filterInfo.map(modifyCallback)
    const modifiedItems = originalUsersInfo.map(modifyCallback)

    setFilterInfo(modifiedStates)
    userListStorage.save(modifiedItems)
  }

  return isOpenedEditInput ? (
    <EditTd>
      <form onSubmit={saveModifiedData}>
        <EditInput
          placeholder={info}
          value={editInputData}
          onChange={({ target: { value } }) => setEditInputData(value)}
          onBlur={saveModifiedData}
          index={index}
          autoFocus
        />
      </form>
    </EditTd>
  ) : (
    <Td id={index} index={index}>
      {info}
    </Td>
  )
}

const DATA_TABLE = {
  0: 'id',
  1: 'email',
  2: 'name',
  3: 'age',
  4: 'postcode',
  5: 'address',
  6: 'address_detail',
  7: 'card_number',
  8: 'auth',
}

const setElementWidth = (index) => {
  switch (index) {
    case 0:
      return '60px'
    case 1:
      return '220px'
    case 2:
      return '80px'
    case 3:
      return '60px'
    case 4:
      return '90px'
    case 5:
      return '230px'
    case 6:
      return '230px'
    case 7:
      return '200px'
    case 8:
      return '90px'
    default:
      return
  }
}

const EditTd = styled.td`
  border: 2px solid #4b85fc;
`

const EditInput = styled.input`
  padding: 0 10px;
  width: ${(props) => setElementWidth(props.index)};
  height: 50px;
`

const Td = styled.td`
  padding: 0 20px;
  min-width: ${(props) => setElementWidth(props.index)};
  max-width: ${(props) => setElementWidth(props.index)};
  height: 50px;
  border: 1px solid #cbcbcb;
  font-size: 13.5px;
  text-align: center;
  line-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
