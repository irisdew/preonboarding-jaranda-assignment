import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components/macro'

import Search from 'Components/Admin/Search'

export default function Admin() {
  const [userInfo, setUserInfo] = useState([])
  const searchRef = useRef()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    fetch('http://localhost:3000/data/users.json')
      .then((res) => res.json())
      .then((res) => {
        setUserInfo(res)
      })
  }

  const filterUserInfo = (selected) => {
    let inputValue = searchRef.current.value
    let filtering = ''
    let dataFilter = []
    fetchData()

    // if (e.target.nextElementSibling) {
    if (inputValue.length > 0 && selected !== '선택') {
      // const inputValue = e.target.nextElementSibling.value

      if (selected === '아이디') filtering = 'email'
      if (selected === '이름') filtering = 'name'
      if (selected === '나이') {
        filtering = 'age'
        dataFilter = userInfo.filter(
          (item) => String(item[filtering]).indexOf(inputValue) !== -1
        )
      } else {
        dataFilter = userInfo.filter(
          (item) => item[filtering].indexOf(inputValue) !== -1
        )
      }
      console.log('검색결과', dataFilter)
      setUserInfo(dataFilter)
    }
  }

  return (
    <div>
      <Search filterUserInfo={filterUserInfo} searchRef={searchRef} />
    </div>
  )
}
