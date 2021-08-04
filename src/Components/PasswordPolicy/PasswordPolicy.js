import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const PolicyItem = ({ policy, content }) => {
  return (
    <PolicyItemWrapper>
      <CheckIcon icon={faCheck} color={policy ? '#aac14f' : '#aeb0b4'} />
      <PolicySpan txtColor={policy}>{content}</PolicySpan>
    </PolicyItemWrapper>
  )
}

export default function PasswordPolicy({ passPolicy }) {
  return (
    <PolicyContainer>
      <PolicyItem policy={passPolicy.numeric} content="숫자" />
      <PolicyItem policy={passPolicy.special} content="특수문자" />
      <PolicyItem policy={passPolicy.alphabet} content="영문" />
      <PolicyItem policy={passPolicy.eight} content="8자리 이상" />
    </PolicyContainer>
  )
}

const PolicyContainer = styled.div`
  width: 100%;
  margin-bottom: 3rem;
  margin-left: 0.5rem;
`

const PolicyItemWrapper = styled.div`
  float: left;
  margin-right: 1.1rem;
`

const CheckIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
`

const PolicySpan = styled.span`
  min-height: 2rem;
  line-height: 2rem;
  float: right;
  font-size: 1.4rem;
  letter-spacing: -0.05rem;
  color: ${(props) => (props.txtColor ? 'black' : '#aeb0b4')};
  font-weight: ${(props) => (props.txtColor ? '700' : '400')};
`
