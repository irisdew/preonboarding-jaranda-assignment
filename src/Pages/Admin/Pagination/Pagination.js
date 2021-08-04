import React from 'react'
import styled from 'styled-components/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

export default function Pagination({ pagingData, changePageNum, arrowBtn }) {
  return (
    <Container>
      <Paging>
        {pagingData.currentPage > 1 && (
          <Prev onClick={arrowBtn} data-check="prev">
            <FontAwesomeIcon icon={faCaretLeft} />
          </Prev>
        )}
        {[...Array(pagingData.fullPage)].map((ele, index) => (
          <PageNumber
            onClick={changePageNum}
            key={index}
            check={pagingData.currentPage}
            idx={index}
          >
            {index + 1}
          </PageNumber>
        ))}
        {pagingData.fullPage > pagingData.currentPage && (
          <Next onClick={arrowBtn} data-check="next">
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
  /* a {
    margin-right: 1rem;
  } */

  span {
    margin-right: 1rem;
    padding: 0.8rem;
    border: 0.1rem solid #aac14f;
    border-radius: 0.3rem;
    background-color: #fafafa;
    vertical-align: middle;

    &:hover {
      background-color: #dfeda7;
      color: #fafafa;
      cursor: pointer;
    }
  }
`

const PageNumber = styled.button`
  margin-right: 1rem;
  padding: 0.9rem;
  border: 0.1rem solid #aac14f;
  border-radius: 0.3rem;
  background-color: ${(props) => props.check === props.idx + 1 && '#aac14f'};
  color: ${(props) => props.check === props.idx + 1 && '#fafafa'};

  &:hover {
    background-color: #dfeda7;
    color: #fafafa;
    cursor: pointer;
  }
`

// 이전
// const Prev = styled.a`
const Prev = styled.span`
  padding: 0.8rem;
  border: 0.1rem solid #aac14f;
  border-radius: 0.3rem;
  background-color: #fafafa;

  &:hover {
    background-color: #dfeda7;
    color: #fafafa;
    cursor: pointer;
  }
`

// 이후
// const Next = styled.a`
const Next = styled.span`
  padding: 0.8rem;
  border: 0.1rem solid #aac14f;
  border-radius: 0.3rem;
  background-color: #fafafa;

  &:hover {
    background-color: #dfeda7;
    color: #fafafa;
    cursor: pointer;
  }
`
