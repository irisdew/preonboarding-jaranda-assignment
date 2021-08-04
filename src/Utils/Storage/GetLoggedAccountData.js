import GetDataFromLocalStorage from 'Utils/Storage/GetDataFromLocalStorage'
import auth from 'Utils/Auth/Auth'

const GetLoggedAccountData = () => {
  const data =
    GetDataFromLocalStorage('USER_LIST').find(
      (account) => account.email === auth.getAuth().email
    ) || []
  console.log(auth.getAuth().email)
  return data
}

export default GetLoggedAccountData
