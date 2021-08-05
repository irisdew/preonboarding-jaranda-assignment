import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import auth from 'Utils/Auth/Auth'

const MyInfo = () => {
  const [students, setStudents] = useState([])
  useEffect(() => {
    setStudents(
      auth
        .getList()
        .filter((user) => user.access.find((access) => access === '/student'))
        .filter((user) => user.access[0] !== '/admin')
    )
  }, [])
  console.log(students)
  return (
    <>
      <Table>
        <thead>
          <tr>
            <Th></Th>
            <Th>이메일</Th>
            <Th>이름</Th>
            <Th>나이</Th>
            <Th>주소</Th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => {
            return (
              <tr>
                <Td>{index + 1}</Td>
                <Td>{student.email}</Td>
                <Td>{student.name}</Td>
                <Td>{student.age}</Td>
                <Td>{student.address.address}</Td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

const Table = styled.table`
  border-collapse: collapse;
`

const Th = styled.th`
  height: 50px;
  border: 1px solid #cbcbcb;
  background: #eaeaea;
  text-align: center;
  line-height: 50px;
  font-weight: bold;
`

const Td = styled.td`
  padding: 0 20px;
  height: 50px;
  border: 1px solid #cbcbcb;
  text-align: center;
  line-height: 50px;
`

export default MyInfo
