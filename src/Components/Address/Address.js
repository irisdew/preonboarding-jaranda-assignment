import React from 'react'
import { FlexDiv, Input, SmallButton } from 'Pages/Signup/Signup'
import { useInput } from 'Utils/useInput'

const daum = window.daum

export default function Address({
  post,
  setPost,
  addr,
  setAddr,
  extraAddr,
  setExtraAddr,
  onChangeExtraAddr,
}) {
  const setDaumAddr = (e) => {
    e.preventDefault()

    const width = 500
    const height = 600

    daum.postcode.load(function () {
      new daum.Postcode({
        oncomplete: function (data) {
          // 우편번호 입력
          setPost(data.zonecode)

          // 주소 입력
          if (data.userSelectedType === 'R') {
            // 사용자가 도로명 주소를 선택했을 경우
            setAddr(data.roadAddress)
            let tempExtraAddr = ''
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              tempExtraAddr += data.bname
            }
            if (data.buildingName !== '' && data.apartment === 'Y') {
              tempExtraAddr +=
                tempExtraAddr !== ''
                  ? ', ' + data.buildingName
                  : data.buildingName
            }
            setExtraAddr(`(${tempExtraAddr})`)
          } else {
            // 사용자가 지번 주소를 선택했을 경우
            setAddr(data.jibunAddress)
            setExtraAddr('')
          }
        },
      }).open({
        left: window.screen.width / 2 - width / 2,
        top: window.screen.height / 2 - height / 2,
      })
    })
  }
  return (
    <>
      <FlexDiv>
        <Input
          type="text"
          value={post}
          placeholder="우편번호"
          onClick={setDaumAddr}
          readOnly
        />
        <SmallButton clickHandler={setDaumAddr}>주소 검색하기</SmallButton>
      </FlexDiv>
      <Input type="text" placeholder="기본 주소" value={addr} disabled />
      <Input
        type="text"
        placeholder="상세 주소"
        value={extraAddr}
        onChange={onChangeExtraAddr}
      />
    </>
  )
}
