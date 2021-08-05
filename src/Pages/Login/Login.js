import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import Layout from 'Layout/Layout'
import CustomInput from 'Components/Form/CustomInput'
import CustomCheckBox from 'Components/Form/CustomCheckBox'
import Button from 'Components/Form/Button'
import Toast from 'Components/Toast/Toast'
import useLogin from 'Utils/Hooks/useLogin'
import bgImgUrl from 'Assets/Images/bg-sign_in.png'
import mBgImgUrl from 'Assets/Images/bg-sign-m.png'

export default function Login() {
  const {
    isRememberId,
    handleRememberMe,
    handleLogin,
    idInputRef,
    pwInputRef,
    toast: { isShow, message },
  } = useLogin()

  return (
    <Layout>
      <StyledSection>
        <h2 className="a11y">로그인 페이지</h2>
        <Container>
          <LoginContent>
            <StyledTitle aria-hidden="true">WELCOME</StyledTitle>
            <span className="a11y">welcome</span>
            <StyledInput ref={idInputRef} type="text" placeholder="이메일" />
            <StyledInput
              ref={pwInputRef}
              type="password"
              placeholder="비밀번호"
              onKeyPress={onKeyPress}
            />
            <StyledCustomCheckBox
              checked={isRememberId}
              id="rememberId"
              checkHandler={handleRememberMe}
            >
              아이디 기억하기
            </StyledCustomCheckBox>
            <LoginButton clickHandler={handleLogin}>로그인</LoginButton>
            <SignupButton to="/signup">회원가입</SignupButton>
            <StyledLink to="/admin/login">관리자 로그인</StyledLink>
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
  background-color: ${({ theme }) => theme.color.white};
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
  padding: 0 1rem;
`

const StyledTitle = styled.span`
  display: block;
  margin-bottom: 4.8rem;
  font-size: 2.4rem;
  font-weight: 600;
  text-align: center;
`

const StyledInput = styled(CustomInput)`
  margin-bottom: 1.6rem;
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
    background-color: ${({ theme }) => theme.color.lightGreyB};
  }
  @media screen and ${({ theme }) => theme.device.tablet} {
    margin-bottom: 2.4rem;
    &::before {
      bottom: -1.2rem;
    }
  }
`
const SignupButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5.2rem;
  margin-bottom: 3.8rem;
  border-radius: 0.6rem;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.secondary};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.white};
  }
  @media screen and ${({ theme }) => theme.device.tablet} {
    height: 4.4rem;
  }
`

const StyledLink = styled(Link)`
  padding: 1rem;
  font-size: 1.2rem;
`
