import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default function PasswordPolicy() {
  return (
    <PolicyContainer>
      <PolicyItem class="password-policy-item" id="policy-numeric">
        <CheckIcon icon={faCheck} color="#aeb0b4" />
        <PolicySpan>숫자</PolicySpan>
      </PolicyItem>
      <PolicyItem class="password-policy-item" id="policy-specialcharacter">
        <CheckIcon icon={faCheck} color="#aeb0b4" />
        <PolicySpan>특수문자</PolicySpan>
      </PolicyItem>
      <PolicyItem class="password-policy-item" id="policy-alphabet">
        <CheckIcon icon={faCheck} color="#aeb0b4" />
        <PolicySpan>영문</PolicySpan>
      </PolicyItem>
      <PolicyItem class="password-policy-item" id="policy-characterlength">
        <CheckIcon icon={faCheck} color="#aeb0b4" />
        <PolicySpan>8자리 이상</PolicySpan>
      </PolicyItem>
    </PolicyContainer>
  )
}

const PolicyContainer = styled.div`
  width: 100%;
  margin-bottom: 3rem;
  margin-left: 0.5rem;
`

const PolicyItem = styled.div`
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
  color: #aeb0b4;
`
