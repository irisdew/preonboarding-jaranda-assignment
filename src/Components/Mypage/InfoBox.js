import styled from 'styled-components/macro'
import GetDataFromLocalStorage from 'Utils/Storage/GetDataFromLocalStorage'
import GetLoggedAccountData from 'Utils/Storage/GetLoggedAccountData'
import { storageKeys, accountInfoType, errorState } from 'Constant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export function InfoBox({ infoTitle, infoType, setEditMode }) {
  const handleEditClick = (editItem) => {
    switch (editItem) {
      case accountInfoType.EMAIL.name:
        setEditMode((prev) => ({ ...prev, email: true }))
        return

      case accountInfoType.ADDRESS.name:
        setEditMode((prev) => ({ ...prev, address: true }))
        return

      case accountInfoType.CARD_NUMBER.name:
        setEditMode((prev) => ({ ...prev, cardNum: true }))
        return

      case accountInfoType.PASSWORD.name:
        setEditMode((prev) => ({ ...prev, password: true }))
        return

      default:
        throw new Error(errorState.MY_INFO_EDIT_ERROR.desc)
    }
  }
  return (
    <>
      <Info>
        {infoTitle} :{' '}
        {GetDataFromLocalStorage(storageKeys.USER_LIST.name) &&
        infoType !== accountInfoType.ADDRESS.name &&
        infoType !== accountInfoType.PASSWORD.name
          ? GetLoggedAccountData()[infoType]
          : GetLoggedAccountData()[infoType][infoType]}
        {infoType === accountInfoType.PASSWORD.name && '********'}
        <EditIcon icon={faEdit} onClick={() => handleEditClick(infoType)} />
      </Info>
    </>
  )
}

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
  @media screen and ${({ theme }) => theme.device.tablet} {
    font-size: 16px;
    /* margin-top: px; */
  }
`
export const EditIcon = styled(FontAwesomeIcon)`
  font-size: 15px;
  margin-left: 35px;
  cursor: pointer;
  @media screen and ${({ theme }) => theme.device.tablet} {
    margin-left: 2vw;
  }
`
