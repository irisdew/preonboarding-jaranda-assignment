import { useState, useRef, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { rememberMeStorage } from 'Utils/Storage'
import { authType, errorState, toastMsg } from 'Constant'
import validation from 'Utils/Validation/Validation'
import auth from 'Utils/Auth/Auth'
import useToast from 'Utils/Hooks/useToast'

export default function useLogin(isAdminRestrict = false) {
  const history = useHistory()
  const [isRememberId, setIsRememberId] = useState(false)
  const idInputRef = useRef(null)
  const pwInputRef = useRef(null)
  const { isShow, message, toast } = useToast()

  useEffect(() => {
    const rememberId = rememberMeStorage.load()
    if (rememberId) {
      setIsRememberId(true)
      idInputRef.current.value = rememberId
    }
  }, [])

  const handleRememberMe = useCallback(({ target: { checked } }) => {
    checked ? setIsRememberId(true) : setIsRememberId(false)
  }, [])

  const handleAfterLogin = useCallback(
    (account) => {
      const { email, auth } = account
      isRememberId ? rememberMeStorage.save(email) : rememberMeStorage.remove()
      auth === authType.ADMIN.name ? history.push('/admin') : history.push('/')
    },
    [isRememberId]
  )

  const handleLogin = useCallback(async () => {
    const id = idInputRef.current
    const pw = pwInputRef.current
    if (!id.value) {
      toast(toastMsg.EMAIL_BLANK)
      id.focus()
      return
    } else if (!pw.value) {
      toast(toastMsg.PASSWORD_BLANK)
      pw.focus()
      return
    } else if (!validation.isEmail(id.value)) {
      toast(toastMsg.EMAIL_INVALID)
      id.value = ''
      id.focus()
      return
    }

    try {
      const loginData = {
        id: id.value,
        pw: pw.value,
      }
      const account = await auth.login(loginData, isAdminRestrict)
      handleAfterLogin(account)
    } catch (err) {
      toast(err.message)
      switch (err.type) {
        case errorState.NO_ACCOUNT_REGISTERED.name:
          id.focus()
          return

        case errorState.PASSWORD_MISMATCH.name:
          pw.focus()
          return

        default:
          throw new Error('is not valid error type')
      }
    }
  }, [handleAfterLogin, isAdminRestrict, toast])

  return {
    isRememberId,
    handleRememberMe,
    handleLogin,
    idInputRef,
    pwInputRef,
    toast: {
      isShow,
      message,
      toast,
    },
  }
}
