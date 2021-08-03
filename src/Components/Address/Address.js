import React, { useState } from 'react'
import styled from 'styled-components'
// import Button from 'Components/Button/Button'

const daum = window.daum

export default function Address() {
  const [post, setPost] = useState('')
  const [addr, setAddr] = useState('')
  const [extraAddr, setExtraAddr] = useState('')

  function setDaumAddr() {
    const width = 500
    const height = 600

    // 입력 초기화
    setAddr('')
    setExtraAddr('')
    setPost('')

    daum.postcode.load(function () {
      new daum.Postcode({
        oncomplete: function (data) {
          // 우편번호 입력
          setPost(data.zonecode)

          // 기본 주소 입력
          if (data.userSelectedType === 'R') {
            // 사용자가 도로명 주소를 선택했을 경우
            setAddr(data.roadAddress)
          } else {
            // 사용자가 지번 주소를 선택했을 경우
            setExtraAddr(data.jibunAddress)
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 상세주소 입력
          if (data.userSelectedType === 'R') {
            // 법정동명이 있을 경우 추가 (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              setExtraAddr(data.bname)
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
              setExtraAddr(
                extraAddr !== '' ? ', ' + data.buildingName : data.buildingName,
              )
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열 조합
            if (extraAddr !== '') {
              setExtraAddr(' (' + extraAddr + ')')
            }
          }
        },
      }).open({
        left: window.screen.width / 2 - width / 2,
        top: window.screen.height / 2 - height / 2,
      })
    })
  }
  return (
    <Container>
      <Item>
        <PostInput value={post} placeholder="우편번호" />
        <Button onClick={setDaumAddr}>주소 검색</Button>
      </Item>
      <Item>
        <AddrInput value={addr} placeholder="기본 주소" />
      </Item>
      <Item>
        <AddrInput value={extraAddr} placeholder="상세 주소" />
      </Item>
    </Container>
  )
}

const Container = styled.div`
  width: 500px;
  box-sizing: border-box;
`

const Item = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0;
`

const AddrInput = styled.input`
  font-size: 12px;
  height: 44px;
  margin-bottom: 8px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;

  height: 50px;
  background-color: #fff;
  border: 1px solid rgba(154, 154, 154, 0.5);
  border-radius: 2px;
  outline: none;

  :hover {
    color: #0085fd;
    border: solid 1px #0085fd;
    background-color: rgba(0, 133, 253, 0.1);
  }
`

const PostInput = styled(AddrInput)`
  width: 60%;
`

const Button = styled.button`
  flex: auto;
  height: 50px;
  margin-left: 8px;
  background-color: #0085fd;
  border-radius: 2px;
  color: white;
`
