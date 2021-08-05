import GetDataFromLocalStorage from 'Utils/Storage/GetDataFromLocalStorage'
import auth from 'Utils/Auth/Auth'

const GetLoggedAccountData = () => {
  const data =
    GetDataFromLocalStorage('USER_LIST').find(
      (account) => account.id === auth.getAuth().id
    ) || []
  return data
}

export default GetLoggedAccountData
