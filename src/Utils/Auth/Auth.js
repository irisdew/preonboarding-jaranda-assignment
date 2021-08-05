import { userListStorage, currentAccountStorage } from 'Utils/Storage'
import { loginState } from 'Constant'

class Auth {
  constructor() {
    this.auth = currentAccountStorage.load()
    this.userList = userListStorage.load()
    this.currentAccountStorage = currentAccountStorage
  }

  login(id, pw) {
    const account = this.userList.find((account) => account.email === id)
    const isRegisteredAccount = this.userList.some(
      (account) => account.email === id
    )
    const isPasswordMatch = isRegisteredAccount && account.password === pw
    if (!isRegisteredAccount) {
      return loginState.FAIL.reason.NO_ACCOUNT_REGISTERED
    } else if (!isPasswordMatch) {
      return loginState.FAIL.reason.PASSWORD_MISMATCH
    } else {
      const protectedAccountInfo = {
        loginTime: new Date().getTime(),
        name: account.name,
        access: account.access,
        auth: account.auth,
      }
      this.currentAccountStorage.save(protectedAccountInfo)
      this.auth = protectedAccountInfo
      return loginState.SUCCESS
    }
  }

  logout(cb) {
    this.auth = null
    this.currentAccountStorage.remove()
    typeof cb === 'function' && cb()
  }

  getAuth() {
    return this.auth
  }
}

export default new Auth()
