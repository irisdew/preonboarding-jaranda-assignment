import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'

import Sidebar from 'Pages/Mypage/Sidebar'
import Routes from 'Pages/Mypage/Routes'
import Layout from 'Layout/Layout'

const MyPage = () => {
  return (
    <Layout header>
      <Router>
        <Route
          render={(props) => (
            <>
              <MypageHeaderWrap>
                <MypageHeader>
                  <h2>마이페이지</h2>
                </MypageHeader>
              </MypageHeaderWrap>
              <Wrap>
                <Sidebar />
                <MainContent>
                  <Routes />
                </MainContent>
              </Wrap>
            </>
          )}
        />
      </Router>
    </Layout>
  )
}

const Wrap = styled.div`
  display: flex;
  max-width: 96rem;
  margin: 0 auto;
`
const MypageHeaderWrap = styled.div`
  width: 100%;
  background-color: #333b3d;
`
const MypageHeader = styled.div`
  width: 930px;
  padding: 1rem 0;
  font-size: 2.5rem;
  margin: 0 auto;
  color: #eee;
  font-weight: bold;
`

const MainContent = styled.article`
  width: 100%;
  height: 500px;
  padding: 0 2rem;
`
export default MyPage
