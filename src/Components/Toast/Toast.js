import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components/macro'

export default function Toast({ message, isShow, className }) {
  const [show, setShow] = useState(null)

  useEffect(() => {
    if (!isShow) {
      setTimeout(() => {
        setShow(false)
      }, [200])
    } else {
      setShow(isShow)
    }
  }, [isShow])

  return (
    <>
      {show &&
        createPortal(
          <Wrapper
            role="alertdialog"
            aria-live="assertive"
            isShow={isShow ? 1 : 0}
            className={className}
          >
            <Message>{message}</Message>
          </Wrapper>,
          document.body
        )}
    </>
  )
}

const Wrapper = styled.div.attrs(({ isShow }) => ({
  opacity: isShow,
}))`
  position: fixed;
  top: 15rem;
  left: 50%;
  border-radius: 1.5rem;
  padding: 0.5rem 1rem;
  background: rgba(87, 87, 87, 0.9);
  transform: translateX(-50%);
  opacity: ${({ opacity }) => opacity};
  transition: opacity linear 0.2s;
  z-index: 10000;
`
const Message = styled.span`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.9);
`
