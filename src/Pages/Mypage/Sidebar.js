import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import auth from 'Utils/Auth/Auth'

const Sidebar = () => {
  return (
    <SideBar>
      <ul>
        <AsideItem>
          <Link to="/mypage/myinfo">내정보</Link>
        </AsideItem>
        {auth
          .getAuth()
          .access.find((accessiblePath) => accessiblePath === '/teacher') && (
          <AsideItem>
            <Link to="/mypage/studentInfo">학생정보</Link>
          </AsideItem>
        )}
      </ul>
    </SideBar>
  )
}

const SideBar = styled.aside`
  width: 200px;
  padding: 2rem;
`

const AsideItem = styled.li`
  padding: 1rem;
  font-size: 2rem;
  font-weight: bold;
`
export default Sidebar
