import { userListStorage, currentAccountStorage } from 'Utils/Storage'
import { authType, errorState } from 'Constant'
import CustomError from 'Utils/Error/CustomError'

class Auth {
  constructor() {
    this.currentAccountStorage = currentAccountStorage
    this.userListStorage = userListStorage
    this.auth = this.currentAccountStorage.load()
    this.userList = this.userListStorage.load()
  }

  updateDatabase = () => {
    this.userList = this.userListStorage.load()
  }

  getDatabase = (isAdminRestrict) => {
    return isAdminRestrict
      ? this.userList.filter((account) => account.auth === authType.ADMIN.name)
      : this.userList
  }

  getAccount = (database, id) => {
    return database.find((account) => account.email === id)
  }

  isEligibleForLogin = (database, { id, pw }) => {
    const account = this.getAccount(database, id)
    const isRegisteredAccount = database.some((account) => account.email === id)
    const isPasswordMatch = isRegisteredAccount && account.password === pw

    if (!isRegisteredAccount) {
      throw new CustomError(errorState.NO_ACCOUNT_REGISTERED)
    } else if (!isPasswordMatch) {
      throw new CustomError(errorState.PASSWORD_MISMATCH)
    }

    return isRegisteredAccount && isPasswordMatch
  }

  static getProtectedAccountInfo(account) {
    const { password, address, card_number, ...otherKeys } = account
    return {
      loginTime: new Date().getTime(),
      ...otherKeys,
    }
  }

  async login(loginData, isAdminRestrict = false) {
    this.updateDatabase()
    const database = this.getDatabase(isAdminRestrict)
    const account = this.getAccount(database, loginData.id)
    if (this.isEligibleForLogin(database, loginData)) {
      const protectedAccountInfo = Auth.getProtectedAccountInfo(account)
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
