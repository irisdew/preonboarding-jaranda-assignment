import { userListStorage, currentAccountStorage } from 'Utils/Storage'
import { errorState } from 'Constant'
import CustomError from 'Utils/Error/Error'

class Auth {
  constructor() {
    this.auth = currentAccountStorage.load()
    this.userList = userListStorage.load()
    this.currentAccountStorage = currentAccountStorage
  }

  async login(id, pw) {
    const account = this.userList.find((account) => account.email === id)
    const isRegisteredAccount = this.userList.some(
      (account) => account.email === id
    )
    const isPasswordMatch = isRegisteredAccount && account.password === pw
    if (!isRegisteredAccount) {
      throw new CustomError(errorState.NO_ACCOUNT_REGISTERED)
    } else if (!isPasswordMatch) {
      throw new CustomError(errorState.PASSWORD_MISMATCH)
    } else {
      const protectedAccountInfo = {
        loginTime: new Date().getTime(),
        name: account.name,
        access: account.access,
        auth: account.auth,
        id: account.id,
        email: account.email,
      }
      this.currentAccountStorage.save(protectedAccountInfo)
      this.auth = protectedAccountInfo
      return protectedAccountInfo
    }
  }

  logout() {
    this.auth = null
    this.currentAccountStorage.remove()
  }

  getAuth() {
    return this.auth
  }
}

export default new Auth()
