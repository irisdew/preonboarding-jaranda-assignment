import React from 'react'
import styled from 'styled-components/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

export default function Pagination({ pagingData, changePageNum }) {
  return (
    <Container>
      <Paging>
        {pagingData.currentPage > 1 && (
          <Prev onClick={changePageNum} data-check="prev">
            <FontAwesomeIcon icon={faCaretLeft} />
          </Prev>
        )}
        {[...Array(pagingData.fullPage)].map((ele, index) => (
          <a key={index}>
            <span onClick={changePageNum}>{index + 1}</span>
          </a>
        ))}
        {pagingData.fullPage > pagingData.currentPage && (
          <Next onClick={changePageNum} data-check="next">
            <FontAwesomeIcon icon={faCaretRight} />
          </Next>
        )}
      </Paging>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
`

const Paging = styled.div`
  a {
    margin-right: 1rem;
  }

  span {
    padding: 0.8rem;
    border: 0.1rem solid #aac14f;
    border-radius: 0.3rem;
    background-color: #fafafa;

    &:hover {
      background-color: #dd346c;
      color: #fafafa;
    }
  }
`

// 이전
const Prev = styled.a`
  padding: 0.8rem;
  border: 0.1rem solid #aac14f;
  border-radius: 0.3rem;
  background-color: #fafafa;

  &:hover {
    background-color: #dd346c;
    color: #fafafa;
  }
`

// 이후
const Next = styled.a`
  padding: 0.8rem;
  border: 0.1rem solid #aac14f;
  border-radius: 0.3rem;
  background-color: #fafafa;

  &:hover {
    background-color: #dd346c;
    color: #fafafa;
  }
`
