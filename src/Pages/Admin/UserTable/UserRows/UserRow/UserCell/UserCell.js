import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { EditContext } from 'Pages/Admin/UserTable/UserTable'
import { FilterInfoContext } from 'Pages/Admin/Admin'
import { userListStorage } from 'Utils/Storage'
import useValidateCell from 'Pages/Admin/UserTable/Hooks/useValidateCell'

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

export default function UserCell({ info, id, index }) {
  const [editInputData, setEditInputData] = useState('')
  const { targetData, setTargetData } = useContext(EditContext)
  const { filterInfo, setFilterInfo } = useContext(FilterInfoContext)
  const { isOpenedEditInput, setIsOpenedEditInput } = useValidateCell(
    index,
    id,
    targetData
  )

  const handleBlurInput = () => {
    if (editInputData.length) {
      const originalUsersInfo = userListStorage.load()
      const [modifiedItem] = filterInfo.filter(
        (userInfo) => userInfo.id === targetData.id
      )

      const modifyCallback = (userInfo) => {
        if (userInfo.id === targetData.id) {
          if (
            DATA_TABLE[index] === 'postcode' ||
            'address' ||
            'address_detail'
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
    setIsOpenedEditInput(false)
    setTargetData({ id: '', index: '' })
  }
  console.log(isOpenedEditInput)
  return isOpenedEditInput ? (
    <EditTd>
      <EditInput
        placeholder={info}
        value={editInputData}
        onChange={({ target: { value } }) => setEditInputData(value)}
        onBlur={handleBlurInput}
        index={index}
        autoFocus
      />
    </EditTd>
  ) : (
    <Td id={index} index={index}>
      {info}
    </Td>
  )
}

const setElementWidth = (index) => {
  switch (index) {
    case 0:
      return '70px'
    case 1:
      return '220px'
    case 2:
      return '100px'
    case 3:
      return '70px'
    case 4:
      return '80px'
    case 5:
      return '260px'
    case 6:
      return '260px'
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
`
