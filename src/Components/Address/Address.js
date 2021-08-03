import React from 'react'
import { FlexDiv, Input, SmallButton } from 'Pages/Signup/Signup'
import { useInput } from 'Utils/useInput'

const daum = window.daum

export default function Address() {
  const [post, setPost] = useInput('')
  const [addr, setAddr] = useInput('')
  const [extraAddr, setExtraAddr, onChangeExtraAddr] = useInput('')

  function setDaumAddr(e) {
    e.preventDefault()

    const width = 500
    const height = 600

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
            setAddr(data.jibunAddress)
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 상세주소에 입력
          if (data.userSelectedType === 'R') {
            let tempExtraAddr = ''
            // 법정동명이 있을 경우 추가 (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              tempExtraAddr += data.bname
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
              tempExtraAddr +=
                tempExtraAddr !== ''
                  ? ', ' + data.buildingName
                  : data.buildingName
            }
            // 상세주소 최종 문자열 조합
            setExtraAddr('(' + tempExtraAddr + ')')
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
        />
        <SmallButton onClick={(e) => setDaumAddr(e)}>주소 검색하기</SmallButton>
      </FlexDiv>
      <Input type="text" placeholder="기본 주소" value={addr} />
      <Input
        type="text"
        placeholder="상세 주소"
        value={extraAddr}
        onChange={onChangeExtraAddr}
      />
    </>
  )
}
