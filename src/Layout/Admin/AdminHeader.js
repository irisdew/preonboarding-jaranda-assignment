import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import styled, { css } from 'styled-components/macro'

import auth from 'Utils/Auth/Auth'
import logoImgUrl from 'Assets/Images/logo.png'

export default function AdminHeader() {
  const history = useHistory()

  const isActiveLink = (path) => {
    const {
      location: { pathname },
    } = history
    if (Array.isArray(path)) {
      return path.indexOf(pathname.toLowerCase()) !== -1 ? 1 : 0
    } else {
      return path === pathname.toLowerCase() ? 1 : 0
    }
  }

  const handleLogout = () => {
    auth.logout()
    history.push('/login')
  }

  return (
    <Wrapper>
      <Container>
        <StyledLogo to="/">
          <h1 className="a11y">RE4CT</h1>
          <LogoImg src={logoImgUrl} alt="logo" />
        </StyledLogo>
        <StyledNav>
          <NavList>
            {auth.getAuth() ? (
              <>
                <NavItem>
                  <LogoutBtn onClick={handleLogout}>관리자 로그아웃</LogoutBtn>
                </NavItem>
              </>
            ) : (
              <NavItem>
                <StyledLink to="/login" active={isActiveLink('/admin/login')}>
                  로그인
                </StyledLink>
              </NavItem>
            )}
          </NavList>
        </StyledNav>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 6.3rem;
  background-color: #fff;
  z-index: 300;
`
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 132rem;
  height: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
`
const StyledLogo = styled(Link)`
  display: block;
  width: 10.2rem;
  height: 3.9rem;
`
const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const StyledNav = styled.nav`
  height: 100%;
`
const NavList = styled.ul`
  display: flex;
  height: 100%;
`
const NavItem = styled.li`
  height: 100%;
  padding: 0 1.5rem;
`
const navButtonMixin = css`
  display: flex;
  align-items: center;
  height: 100%;
  font-weight: 400;
  color: ${({ theme }) => theme.color.blueGrey};

  &:hover {
    font-weight: 600;
    color: ${({ theme }) => theme.color.black};
  }
`

const StyledLink = styled(Link).attrs(({ active, theme }) => ({
  color: active ? theme.color.primary : theme.color.deepGrey,
  weight: active ? '600' : '400',
}))`
  ${navButtonMixin};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};
`
const LogoutBtn = styled.button`
  ${navButtonMixin};
  font-weight: 600;
`
