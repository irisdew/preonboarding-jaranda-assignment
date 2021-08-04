import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import LoginForm from 'Components/Form/LoginForm'
import GetDataFromLocalStorage from 'Utils/GetDataFromLocalStorage'
import SaveDataToLocalStorage from 'Utils/SaveDataToLocalStorage'

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export default function AdminLogin() {
  const history = useHistory()

  const [input, setInput] = useState({})
  useEffect(() => {
    // 로그인 된 상태에서 로그인 페이지 접근할 시 main page로 redirect
    // const loginedAccount = GetDataFromLocalStorage('login')
    // if (loginedAccount) {
    //   alert('이미 로그인 되셨습니다.')
    //   history.push('/')
    // }
    const storedAccounts = GetDataFromLocalStorage('accounts')
    if (!storedAccounts) {
      try {
        fetch('http://localhost:3000/data/users.json')
          .then((response) => response.json())
          .then((response) => {
            // admin 계정 정보 따로 'admin' key로 저장
            SaveDataToLocalStorage('admin', response[0])
          })
      } catch (error) {
        console.log(error)
      }
    }
  }, [history])

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleTryLogin = (e) => {
    e.preventDefault()

    // 로그인한 시점 저장을 위한 정보
    const date = new Date()
    const loginTimeObj = { loginTime: date.getTime() }

    // LocalStorage에 저장되어 있는 admin 계정 정보들 가져와서
    // 현재 로그인 시도하는 계정과 일치하는지 대조
    const adminAccount = GetDataFromLocalStorage('admin') || []
    const loginAccount =
      adminAccount.email === input.email &&
      adminAccount.password === input.password

    // 현재 로그인 시도하는 계정이 admin 정보라면
    // LocalStorage에 login된 계정 목록에 admin 계정을 추가하고 main page로 이동
    if (loginAccount) {
      const loginAdminAccount = Object.assign(adminAccount, loginTimeObj)
      SaveDataToLocalStorage('login', loginAdminAccount)
      history.push('/admin')
    } else {
      alert('이메일 또는 비밀번호를 다시 확인해주세요.')
    }
  }

  return (
    <Root>
      <LoginForm
        handleInputChange={handleInputChange}
        handleTryLogin={handleTryLogin}
      />
    </Root>
  )
}