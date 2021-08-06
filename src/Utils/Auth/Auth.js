import { userListStorage, currentAccountStorage } from 'Utils/Storage'
import { authType, errorState } from 'Constant'
import CustomError from 'Utils/Error/CustomError'

class Auth {
  constructor() {
    this.currentAccountStorage = currentAccountStorage
    this.userListStorage = userListStorage
    this.auth = currentAccountStorage.load()
    this.userList = userListStorage.load()
  }

  async login(loginData, isAdminRestrict = false) {
    const database = isAdminRestrict
      ? this.userList.filter((account) => account.auth === authType.ADMIN.name)
      : this.userList

    const account = database.find((account) => account.email === loginData.id)
    const isRegisteredAccount = database.some(
      (account) => account.email === loginData.id
    )
    const isPasswordMatch =
      isRegisteredAccount && account.password === loginData.pw
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

  update(account) {
    this.userList[account.id - 1] = account
    console.log('account', account)
    console.log('newUserList', this.userList)
    this.userListStorage.save(this.userList)
    this.currentAccountStorage.save(account)
    this.auth = {
      ...this.auth,
      name: account.name,
      access: account.access,
      auth: account.auth,
      id: account.id,
      email: account.email,
    }
  }

  getAuth() {
    return this.auth
  }
}

export default new Auth()
