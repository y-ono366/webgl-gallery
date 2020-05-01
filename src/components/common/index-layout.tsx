import * as React from 'react'
import Header from '@/components/common/header'
import styled from 'styled-components'

const IndexLayout: React.FC = ({ children }) => (
  <Wrapper>
    <Header />
    {children}
    <Footer>
      <Author>yusuke ohno / ohno.systems</Author>
    </Footer>
  </Wrapper>
)

const Wrapper = styled.div``
const Footer = styled.div`
  position: fixed;
  right: 0%;
  bottom: 0%;
  background-color: #f0f0f0;
  height: 35px;
  width: 380px;
`
const Author = styled.p`
  margin: 0px;
  text-align: left;
  margin-left: 15px;
  line-height: 35px;
  font-size: 15px;
`
export default IndexLayout
