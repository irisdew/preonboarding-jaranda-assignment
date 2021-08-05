import { userListStorage, currentAccountStorage } from 'Utils/Storage'

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
      return { state: 'fail', reason: '등록된 계정이 없습니다.' }
    } else if (!isPasswordMatch) {
      return { state: 'fail', reason: '패스워드가 일치하지 않습니다.' }
    } else {
      const protectedAccountInfo = {
        loginTime: new Date().getTime(),
        name: account.name,
        access: account.access,
        auth: account.auth,
      }
      this.currentAccountStorage.save(protectedAccountInfo)
      this.auth = protectedAccountInfo
      return { state: 'success' }
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

  getList() {
    return this.userList
  }
}

export default new Auth()
