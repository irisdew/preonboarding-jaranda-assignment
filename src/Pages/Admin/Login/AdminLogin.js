import React from 'react'
import styled from 'styled-components/macro'

import AdminLayout from 'Layout/Admin/AdminLayout'
import CustomInput from 'Components/Form/CustomInput'
import CustomCheckBox from 'Components/Form/CustomCheckBox'
import Button from 'Components/Form/Button'
import Toast from 'Components/Toast/Toast'
import useLogin from 'Utils/Hooks/useLogin'

export default function AdminLogin() {
  const {
    isRememberId,
    handleRememberMe,
    handleLogin,
    idInputRef,
    pwInputRef,
    toast: { isShow, message },
  } = useLogin(true)

  return (
    <AdminLayout>
      <StyledSection>
        <h2 className="a11y">관리자 로그인 페이지</h2>
        <Container>
          <LoginContent>
            <StyledTitle aria-hidden="true">ADMIN LOGIN</StyledTitle>
            <span className="a11y">admin login</span>
            <StyledInput ref={idInputRef} type="text" placeholder="이메일" />
            <StyledInput
              ref={pwInputRef}
              type="password"
              placeholder="비밀번호"
            />
            <StyledCustomCheckBox
              checked={isRememberId}
              id="rememberId"
              checkHandler={handleRememberMe}
            >
              아이디 기억하기
            </StyledCustomCheckBox>
            <LoginButton clickHandler={handleLogin}>로그인</LoginButton>
          </LoginContent>
        </Container>
      </StyledSection>
      <Toast message={message} isShow={isShow} />
    </AdminLayout>
  )
}

const StyledSection = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  height: 100vh;
  z-index: 100;
`

const Container = styled.div`
  max-width: 86.4rem;
  width: 100%;
  margin: 0 auto;
  border-top-right-radius: 6rem;
  padding: 4.8rem 0;
  background-color: ${({ theme }) => theme.color.white};
`

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 35rem;
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
  background-color: ${({ theme }) => theme.color.blueGrey};

  @media screen and ${({ theme }) => theme.device.tablet} {
    margin-bottom: 2.4rem;
  }
`
