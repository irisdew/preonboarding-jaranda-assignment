import React, { useState, useRef, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import Layout from 'Layout/Layout'
import CustomInput from 'Components/Form/CustomInput'
import CustomCheckBox from 'Components/Form/CustomCheckBox'
import Button from 'Components/Form/Button'
import Toast from 'Components/Toast/Toast'
import validation from 'Utils/Validation/Validation'
import useToast from 'Utils/Hooks/useToast'
import auth from 'Utils/Auth/Auth'
import bgImgUrl from 'Assets/Images/bg-sign_in.png'
import mBgImgUrl from 'Assets/Images/bg-sign_in-m.png'

export default function Login(props) {
  const history = useHistory()
  const [isRememberId, setIsRememberId] = useState(false)
  const idInputRef = useRef(null)
  const pwInputRef = useRef(null)
  const rememberRef = useRef(null)
  const { isShow, message, toast } = useToast()

  const handleRememberMe = useCallback(
    ({ target: { checked } }) => {
      checked ? setIsRememberId(true) : setIsRememberId(false)
    },
    [isRememberId]
  )

  const handleLogin = useCallback(() => {
    const id = idInputRef.current
    const pw = pwInputRef.current
    if (!id.value) {
      toast('이메일을 입력해주세요.')
      id.focus()
      return
    } else if (!pw.value) {
      toast('비밀번호를 입력해주세요.')
      pw.focus()
      return
    } else if (!validation.isEmail(id.value)) {
      toast('유효하지 않은 이메일입니다.')
      id.value = ''
      id.focus()
      return
    } else {
      const result = auth.login(id.value, pw.value)
      switch (result.state) {
        case 'success':
          history.push('/')
          return

        case 'fail':
          if (result.reason === '등록된 계정이 없습니다.') {
            toast('등록된 계정이 없습니다.')
            id.focus()
          } else {
            toast('패스워드가 일치하지 않습니다.')
            pw.focus()
          }
          return

        default:
          throw new Error('is not valid state')
      }
    }
  }, [])

  const handleSignup = useCallback(() => {
    toast('Test')
  }, [])

  return (
    <Layout>
      <StyledSection>
        <Container>
          <LoginContent>
            <StyledTitle aria-hidden="true">
              WELCOME<span className="a11y">welcome</span>
            </StyledTitle>
            <StyledInput ref={idInputRef} type="text" placeholder="이메일" />
            <StyledInput
              ref={pwInputRef}
              type="password"
              placeholder="비밀번호"
            />
            <StyledCustomCheckBox
              ref={rememberRef}
              cehcekd={isRememberId}
              id="rememberId"
              checkHandler={handleRememberMe}
            >
              아이디 기억하기
            </StyledCustomCheckBox>
            <LoginButton clickHandler={handleLogin}>로그인</LoginButton>
            <SingupButton clickHandler={handleSignup}>회원가입</SingupButton>
            <StyledLink to="/">관리자 로그인</StyledLink>
          </LoginContent>
        </Container>
      </StyledSection>
      <Toast message={message} isShow={isShow} />
    </Layout>
  )
}

const StyledSection = styled.section`
  position: relative;
  padding: 19.2rem 0 12.8rem;
  z-index: 100;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    display: block;
    width: 100%;
    height: 37.7rem;
    background: url(${bgImgUrl}) no-repeat top right;
    transform: translateY(-7rem);
    z-index: -1;
  }
  @media screen and ${({ theme }) => theme.device.tablet} {
    padding: 3.7rem 0 0;
    &::before {
      height: 13.7rem;
      background: url(${mBgImgUrl}) no-repeat top right;
      transform: translateY(-4rem);
    }
  }
`

const Container = styled.div`
  max-width: 86.4rem;
  margin: 0 auto;
  border-top-right-radius: 6rem;
  padding: 4.8rem 0;
  background-color: #fff;
  @media screen and ${({ theme }) => theme.device.tablet} {
    background-color: transparent;
  }
`

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 45rem;
  margin: 0 auto;
`

const StyledTitle = styled.h2`
  margin-bottom: 4.8rem;
  font-size: 2.4rem;
  font-weight: 600;
  text-align: center;
`

const StyledInput = styled(CustomInput)`
  margin-bottom: 1.6rem;
  @media screen and ${({ theme }) => theme.device.tablet} {
    height: 4.4rem;
    margin-bottom: 0.8rem;
  }
`

const StyledCustomCheckBox = styled(CustomCheckBox)`
  align-self: flex-start;
  margin-bottom: 2rem;
`

const LoginButton = styled(Button)`
  position: relative;
  margin-bottom: 4.8rem;
  &::before {
    content: '';
    position: absolute;
    bottom: -2.4rem;
    display: block;
    width: 100%;
    height: 0.1rem;
    background-color: #e5e5e5;
  }
  @media screen and ${({ theme }) => theme.device.tablet} {
    margin-bottom: 2.4rem;
    &::before {
      bottom: -1.2rem;
    }
  }
`
const SingupButton = styled(Button)`
  margin-bottom: 3.8rem;
  background-color: #0085fd;
`

const StyledLink = styled(Link)`
  padding: 1rem;
  font-size: 1.2rem;
`
