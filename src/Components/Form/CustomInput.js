import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'

const CustomInput = forwardRef(({ ...restProps }, ref) => {
  return <Wrapper ref={ref} {...restProps} />
})

const Wrapper = styled.input`
  width: 100%;
  height: 5.2rem;
  border-radius: 0.2rem;
  border: solid 0.1rem #ccc;
  padding: 0 1.5rem;
  font-size: 1.4rem;
  line-height: 3.71428;
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.white};
  ::placeholder {
    color: ${({ theme }) => theme.color.lightGreyA};
  }
  :hover,
  :focus {
    border: solid 0.1rem ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.primaryAlpha};
  }
  @media screen and ${({ theme }) => theme.device.tablet} {
    height: 4.4rem;
    margin-bottom: 0.8rem;
  }
`

export default CustomInput
