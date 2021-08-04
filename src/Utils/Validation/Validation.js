export default {
  isEmail(data) {
    if (!data) {
      return false
    }
    const reg = RegExp(/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/)
    return reg.test(data)
  },

  isPassword(data) {
    if (!data) {
      return false
    }
    const reg =
      /^(?=.*[a-zA-Z0-9])(?=.*[a-zA-Z!@#$%^&*])(?=.*[0-9!@#$%^&*]).{8,15}$/
    return reg.test(data)
  },
}
