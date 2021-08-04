import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAngleDown } from '@fortawesome/free-solid-svg-icons'

export default function Search({ filterUserInfo, searchRef }) {
  const [selected, setSelected] = useState('선택')
  const [checkSelect, setCheckSelect] = useState(false)

  // 선택 버튼
  const selectBtn = () => {
    setCheckSelect(!checkSelect)
  }

  // 아이디, 이름, 나이 선택
  const selectValue = (e) => {
    setCheckSelect(false)
    setSelected(e.target.innerText)
  }

  return (
    <Container>
      <Dropdown>
        <DropBtn onClick={selectBtn}>
          <span>{selected}</span>
          <FontAwesomeIcon icon={faAngleDown} size="lg" color="#aac14f" />
        </DropBtn>
        <Menu checkSelect={checkSelect}>
          <span onClick={selectValue}>아이디</span>
          <span onClick={selectValue}>이름</span>
          <span onClick={selectValue}>나이</span>
        </Menu>
      </Dropdown>
      <InputBox>
        <InputBtn onClick={() => filterUserInfo(selected)}>
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </InputBtn>
        <input placeholder="검색..." ref={searchRef} />
      </InputBox>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

// 드롭다운
const Dropdown = styled.div`
  margin: 2rem auto;
`

const DropBtn = styled.button`
  width: 8rem;
  height: 3rem;
  color: #65737e;
  border: 0.1rem solid #aac14f;
  border-radius: 0.3rem;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const Menu = styled.div`
  display: ${(props) => (props.checkSelect ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  width: 8rem;
  height: 6rem;
  box-shadow: 0 0.4rem 1rem 0 rgba(0, 0, 0, 0.2);
  z-index: 10;
  margin-top: 0.2rem;
  border: 0.1rem solid #aac14f;
  border-radius: 0.3rem;

  span {
    color: #65737e;
    margin-left: 1.4rem;

    &:hover {
      cursor: pointer;
      color: #dd346c;
    }
  }
`

// 입력
const InputBox = styled.div`
  margin: 2rem auto;

  input {
    width: 16rem;
    height: 3rem;
    background: #fafafa;
    border: 0.1rem solid #aac14f;
    font-size: 1rem;
    color: #65737e;
    float: left;
    padding-left: 3.5rem;
    border-radius: 0.3rem;
    transition: background 0.5s ease;

    &::placeholder {
      color: #65737e;
    }
  }
`

const InputBtn = styled.button`
  position: absolute;
  width: 3rem;
  height: 3rem;
  z-index: 1;
  color: #ffffff;
  background: #aac14f;
  border: 1px solid #aac14f;
  border-radius: 0.3rem 0 0 0.3rem;

  &:hover {
    color: #dd346c;
  }
`
