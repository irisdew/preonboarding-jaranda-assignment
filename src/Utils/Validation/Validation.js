const validation = {
  isEmail(data) {
    if (!data) {
      return false
    }
    const reg = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/
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

  isNumeric(data) {
    if (!data) {
      return false
    }
    const reg = /[0-9]/g
    return reg.test(data)
  },

  isNotNumeric(data) {
    if (!data) {
      return false
    }
    const reg = /[a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g
    return reg.test(data)
  },

  isAlphabet(data) {
    if (!data) {
      return false
    }
    const reg = /[a-z]/gi
    return reg.test(data)
  },

  isSpecialCharacter(data) {
    if (!data) {
      return false
    }
    const reg = /[~!@#$%^&*()_+|<>?:{}]/g
    return reg.test(data)
  },

  isOverEight(data) {
    return data.length >= 8
  },

  isNotKorean(data) {
    if (!data) {
      return false
    }
    const reg = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g
    return reg.test(data)
  },
}

export default validation
