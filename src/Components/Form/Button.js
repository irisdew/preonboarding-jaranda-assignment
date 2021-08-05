import React from 'react'
import styled from 'styled-components/macro'

export default function Button({
  className,
  children,
  clickHandler,
  ...restProps
}) {
  return (
    <Wrapper className={className} onClick={clickHandler} {...restProps}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5.2rem;
  border-radius: 0.6rem;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.primary};
  @media screen and ${({ theme }) => theme.device.tablet} {
    height: 4.4rem;
  }
`
