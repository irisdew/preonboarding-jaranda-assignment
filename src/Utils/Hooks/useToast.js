import { useState, useEffect, useCallback } from 'react'

export default function useToast(timer = 3000) {
  const [isShow, setIsShow] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setIsShow(false)
    }, [timer])

    return () => clearTimeout(timeId)
  }, [message, isShow, timer])

  const toast = useCallback((message) => {
    setIsShow(true)
    setMessage(message)
  }, [])

  return {
    isShow,
    message,
    toast,
  }
}
