import React from 'react'
import styled from 'styled-components/macro'

import footerBgUrl from 'Assets/Images/bg-footer.png'
import footerBgBlueUrl from 'Assets/Images/bg-footer-blue.png'

export default function Footer({ color }) {
  return (
    <Wrapper>
      <Container color={color}>
        <Content>
          <TeamInfoWrap>
            <Title>Team RE4CT</Title>
          </TeamInfoWrap>
          <CustomerServiceWrap>
            <Title>고객센터/기업제휴</Title>
            <DefinitionList>
              <DefinitionTitle>운영시간</DefinitionTitle>
              <DefinitionDesc>평일 10:00~19:00</DefinitionDesc>
            </DefinitionList>
            <DefinitionList>
              <DefinitionTitle>카톡</DefinitionTitle>
              <DefinitionDesc>카카오톡 친구 자란다</DefinitionDesc>
            </DefinitionList>
            <DefinitionList>
              <DefinitionTitle>전화</DefinitionTitle>
              <DefinitionDesc>1577 4013</DefinitionDesc>
            </DefinitionList>
            <DefinitionList>
              <DefinitionTitle>메일</DefinitionTitle>
              <DefinitionDesc>contact@jaranda.kr</DefinitionDesc>
            </DefinitionList>
            <DefinitionList>
              <DefinitionTitle>블로그</DefinitionTitle>
              <DefinitionDesc>blog.naver.com/jaranda</DefinitionDesc>
            </DefinitionList>
          </CustomerServiceWrap>
        </Content>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  width: 100%;
  height: 49.3rem;
  padding-top: 24.1rem;
  @media screen and ${({ theme }) => theme.device.mobile} {
    height: 69rem;
  }
`
const Container = styled.div.attrs(({ color, theme }) => ({
  bgColor: color === 'green' ? theme.color.primary : theme.color.secondary,
  bgImg: color === 'green' ? footerBgUrl : footerBgBlueUrl,
}))`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ bgColor }) => bgColor};
  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 15rem;
    background: center top / 1440px 100% no-repeat url(${({ bgImg }) => bgImg});
    transform: translateY(-14.9rem);
  }
  @media screen and ${({ theme }) => theme.device.desktop} {
    &::before {
      background-size: 100% 100%;
    }
  }
`
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 96rem;
  height: 100%;
  margin: 0 auto;
  color: ${({ theme }) => theme.color.white};
  font-size: 1.4rem;
  @media screen and ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    justify-content: flex-start;
    max-width: 47.6rem;
  }
`
const TeamInfoWrap = styled.div`
  width: 50%;
  padding: 0 1.5rem;
  @media screen and ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`
const Title = styled.span`
  display: block;
  margin-bottom: 1.2rem;
  font-size: 1.6rem;
  line-height: 1.8;
`

const CustomerServiceWrap = styled.div`
  width: 33%;
  padding: 0 1.5rem;
  @media screen and ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`
const DefinitionList = styled.dl`
  display: flex;
  font-size: 1.4rem;
  line-height: 1.5;
`
const DefinitionTitle = styled.dt`
  position: relative;
  margin-right: 1.4rem;
  font-weight: 400;
  &::before {
    content: '';
    position: absolute;
    right: -0.7rem;
    width: 0.1rem;
    height: 60%;
    background-color: ${({ theme }) => theme.color.white};
    transform: translateY(35%);
  }
`
const DefinitionDesc = styled.dd`
  font-weight: 300;
`
