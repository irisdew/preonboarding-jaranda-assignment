import auth from 'Utils/Auth/Auth'

const Timer = () => {
  setInterval(() => {
    const loginAccount = auth.getAuth()
    if (loginAccount) {
      const currentTime = new Date().getTime()
      if (currentTime > loginAccount.loginTime + 30000 * 1000) {
        auth.logout()
      }
    }
  }, 1000 * 10)
}

export default Timer
