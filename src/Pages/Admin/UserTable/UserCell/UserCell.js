import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import useValidateCell from 'Pages/Admin/Hooks/useValidateCell'
import { EditContext } from 'Pages/Admin/UserTable/UserTable'
import { FilterInfoContext } from 'Pages/Admin/Admin'
import { userListStorage } from 'Utils/Storage'

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
          DATA_TABLE[index] === DATA_TABLE[5] ||
          DATA_TABLE[index] === DATA_TABLE[6] ||
          DATA_TABLE[index] === DATA_TABLE[7]
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
  2: 'password',
  3: 'name',
  4: 'age',
  5: 'postcode',
  6: 'address',
  7: 'address_detail',
  8: 'card_number',
  9: 'auth',
}

const setElementWidth = (index) => {
  switch (index) {
    case 0:
      return '50px'
    case 1:
      return '200px'
    case 2:
      return '130px'
    case 3:
      return '70px'
    case 4:
      return '50px'
    case 5:
      return '70px'
    case 6:
      return '230px'
    case 7:
      return '230px'
    case 8:
      return '180px'
    case 9:
      return '80px'
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

  @media ${(props) => props.theme.device.tablet} {
    min-width: 41rem;
  }
`

const Td = styled.td`
  padding: 0 5px;
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

  @media ${(props) => props.theme.device.tablet} {
    border: none;
    border-bottom: 1px solid #cbcbcb;
    position: relative;
    padding-left: 50%;
    width: 100%;
    min-width: 41rem;

    :before {
      position: absolute;
      left: 2px;
      width: 40%;
      white-space: nowrap;
    }

    :nth-of-type(1):before {
      content: 'ID';
      padding-left: 0%;
      font-weight: bold;
    }
    :nth-of-type(2):before {
      content: '이메일';
      font-weight: bold;
    }
    :nth-of-type(3):before {
      content: '비밀번호';
      font-weight: bold;
    }
    :nth-of-type(4):before {
      content: '이름';
      font-weight: bold;
    }
    :nth-of-type(5):before {
      content: '나이';
      font-weight: bold;
    }
    :nth-of-type(6):before {
      content: '우편번호';
      font-weight: bold;
    }
    :nth-of-type(7):before {
      content: '주소';
      font-weight: bold;
    }
    :nth-of-type(8):before {
      content: '상세주소';
      font-weight: bold;
    }
    :nth-of-type(9):before {
      content: '카드정보';
      font-weight: bold;
    }
    :nth-of-type(10):before {
      content: '권한';
      font-weight: bold;
    }
  }
`
