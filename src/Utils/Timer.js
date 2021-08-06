import auth from 'Utils/Auth/Auth'
import { loginMaintenance } from 'Constant'

const Timer = () => {
  setInterval(() => {
    const loginAccount = auth.getAuth()
    if (loginAccount) {
      const currentTime = new Date().getTime()
      if (
        currentTime >
        loginAccount.loginTime + loginMaintenance.LOGIN_MAINTENANCE_TIME.time
      ) {
        auth.logout()
      }
    }
  }, loginMaintenance.LOGIN_CHECK_INTERVAL_TIME.time)
}

export default Timer
