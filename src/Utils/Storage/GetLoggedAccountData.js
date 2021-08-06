import GetDataFromLocalStorage from 'Utils/Storage/GetDataFromLocalStorage'
import auth from 'Utils/Auth/Auth'
import { storageKeys } from 'Constant'

const GetLoggedAccountData = () => {
  const data =
    GetDataFromLocalStorage(storageKeys.USER_LIST.name).find(
      (account) => account.id === auth.getAuth().id
    ) || []
  return data
}

export default GetLoggedAccountData
