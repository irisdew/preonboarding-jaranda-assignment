import styled from 'styled-components/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import GetDataFromLocalStorage from 'Utils/Storage/GetDataFromLocalStorage'
import GetLoggedAccountData from 'Utils/Storage/GetLoggedAccountData'

export function InfoBox({
  infoTitle,
  infoType,
  setEditEmail,
  setEditAddress,
  setEditCardNum,
  setEditPassword,
}) {
  const handleEditClick = (editItem) => {
    switch (editItem) {
      case 'email':
        setEditEmail((prev) => !prev)
        console.log('edit email')
        return

      case 'address':
        setEditAddress((prev) => !prev)
        // setAddr('')
        // setExtraAddr('')
        console.log('edit address')

        return

      case 'card_number':
        // setCardNum('')
        setEditCardNum((prev) => !prev)
        console.log('edit cardNum')

        return
      case 'password':
        // setCardNum('')
        setEditPassword((prev) => !prev)
        console.log('edit password')

        return

      default:
        throw new Error("Error! Edit button doesn't work properly.")
    }
  }
  return (
    <>
      <Info>
        {infoTitle} :{' '}
        {GetDataFromLocalStorage('USER_LIST') &&
        infoType !== 'address' &&
        infoType !== 'password'
          ? GetLoggedAccountData()[infoType]
          : GetLoggedAccountData()[infoType][infoType]}
        {infoType === 'password' && '********'}
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
