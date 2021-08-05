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
  color: #0b0b0b;
  background-color: #fff;
  ::placeholder {
    color: #ccc;
  }
  :hover,
  :focus {
    border: solid 0.1rem #a5d25f;
    color: #6dc043;
    background-color: rgba(165, 210, 95, 0.1);
  }
  @media screen and ${({ theme }) => theme.device.tablet} {
    height: 4.4rem;
    margin-bottom: 0.8rem;
  }
`

export default CustomInput
