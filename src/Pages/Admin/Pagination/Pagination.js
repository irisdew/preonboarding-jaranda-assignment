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
  button {
    margin-right: 1rem;
    padding: 0.9rem;
    border: 0.1rem solid #aac14f;
    border-radius: 0.3rem;
  }
`

const PageNumber = styled.button`
  background-color: ${(props) => props.check === props.idx + 1 && '#aac14f'};
  color: ${(props) => props.check === props.idx + 1 && '#fafafa'};

  &:hover {
    background-color: #dfeda7;
    color: #fafafa;
    cursor: pointer;
  }
`

const Prev = styled.button`
  background-color: #fafafa;

  &:hover {
    background-color: #dfeda7;
    color: #fafafa;
    cursor: pointer;
  }
`

const Next = styled.button`
  background-color: #fafafa;

  &:hover {
    background-color: #dfeda7;
    color: #fafafa;
    cursor: pointer;
  }
`
