import React, { forwardRef } from 'react'
import { FlexDiv, Input, SmallButton } from 'Pages/Signup/Signup'
import setDaumAddr from 'Utils/SetDaumAddr'

const Address = (
  { post, setPost, addr, setAddr, extraAddr, setExtraAddr, onChangeExtraAddr },
  ref
) => {
  const handleClick = (e) => {
    e.preventDefault()
    setDaumAddr({ setPost, setAddr, setExtraAddr })
  }

  return (
    <>
      <FlexDiv>
        <Input
          type="text"
          value={post}
          placeholder="우편번호"
          onClick={setDaumAddr}
          ref={ref}
          readOnly
        />
        <SmallButton type="button" clickHandler={handleClick}>
          주소 검색하기
        </SmallButton>
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

export default forwardRef(Address)
