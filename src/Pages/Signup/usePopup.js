import { useState } from 'react'

export const usePopup = () => {
  const [showPopup, setPopup] = useState(false)

  const openPopup = (event) => {
    event.preventDefault() //페이지의 새로고침 방지
    setPopup(true)
    console.log('popup')
  }

  const closePopup = (event) => {
    event.preventDefault() //페이지의 새로고침 방지
    setPopup(false)
    console.log('close')
  }
  return [showPopup, openPopup, closePopup]
}
