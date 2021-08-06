import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import styled, { css } from 'styled-components/macro'

import auth from 'Utils/Auth/Auth'
import { ReactComponent as Hamburger } from 'Assets/Icon/ic_hamburger.svg'
import logoImgUrl from 'Assets/Images/logo.png'

export default function Header() {
  const history = useHistory()
  const [isOpenNav, setIsOpenNav] = useState(false)

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

  const handleOpenMobileMenu = () => {
    setIsOpenNav((isOpenNav) => !isOpenNav)
  }

  const handleCloseMobileMenu = (e) => {
    const target = e.target
    const nodeName = target.nodeName.toLowerCase()
    if (nodeName === 'nav') {
      setIsOpenNav(false)
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
        <StyledNav mobileShow={isOpenNav} onClick={handleCloseMobileMenu}>
          <NavList>
            <NavItem>
              <StyledLink to="/teacher" active={isActiveLink('/teacher')}>
                자란다선생님 메뉴
              </StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/parent" active={isActiveLink('/parent')}>
                자란다부모님 메뉴
              </StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/student" active={isActiveLink('/student')}>
                자란다어린이 메뉴
              </StyledLink>
            </NavItem>
            {auth.getAuth() ? (
              <>
                <NavItem>
                  <StyledLink to="/mypage">마이페이지</StyledLink>
                </NavItem>
                <NavItem>
                  <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
                </NavItem>
              </>
            ) : (
              <NavItem>
                <StyledLink
                  to="/login"
                  active={isActiveLink(['/login', '/signup'])}
                >
                  로그인/회원가입
                </StyledLink>
              </NavItem>
            )}
          </NavList>
        </StyledNav>
        <HamburgerBtn onClick={handleOpenMobileMenu}>
          <HamburgerIcon />
        </HamburgerBtn>
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
  @media screen and ${({ theme }) => theme.device.tablet} {
    height: 4.8rem;
  }
`
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 96rem;
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

const StyledNav = styled.nav.attrs(({ mobileShow }) => ({
  visibility: mobileShow ? 'visible' : 'hidden',
  transform: mobileShow ? 'translateX(0)' : 'translateX(25rem)',
  transition: mobileShow
    ? 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)'
    : 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1), visibility 0s 0.6s',
  content: mobileShow ? '""' : 'none',
}))`
  height: 100%;
  @media screen and ${({ theme }) => theme.device.tablet} {
    position: absolute;
    top: 0;
    right: 0;
    width: 25rem;
    height: 100vh;
    background-color: ${({ theme }) => theme.color.white};
    visibility: ${({ visibility }) => visibility};
    transform: ${({ transform }) => transform};
    transition: ${({ transition }) => transition};
    z-index: 3000;
    &::before {
      content: ${({ content }) => content};
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 200vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.4);
      transform: translateX(calc(-200vw + 25rem));
      transition: none;
      z-index: -1;
    }
  }
`
const NavList = styled.ul`
  display: flex;
  height: 100%;
  @media screen and ${({ theme }) => theme.device.tablet} {
    position: relative;
    flex-direction: column;
    padding: 1.7rem;
    background-color: ${({ theme }) => theme.color.white};
  }
`
const NavItem = styled.li`
  height: 100%;
  padding: 0 1.5rem;
  @media screen and ${({ theme }) => theme.device.tablet} {
    width: 100%;
    height: auto;
    padding: 1.5rem;
  }
`
const navButtonMixin = css`
  display: flex;
  align-items: center;
  height: 100%;
  font-weight: 400;
  color: ${({ theme }) => theme.color.deepGrey};

  &:hover {
    font-weight: 600;
    color: ${({ theme }) => theme.color.primary};
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
  color: ${({ theme }) => theme.color.primary};
`

const HamburgerBtn = styled.button`
  display: none;
  width: 4.8rem;
  height: 4.8rem;
  padding: 1.4rem 1.3rem;
  @media screen and ${({ theme }) => theme.device.tablet} {
    display: block;
  }
`

const HamburgerIcon = styled(Hamburger)`
  width: 2.2rem;
  height: 2rem;
  pointer-events: none;
`
