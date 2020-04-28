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
  height: 50px;
  width: 400px;
  margin-right: 20px;
  margin-bottom: 10px;
  color: #c1c1c1c1;
`
const Author = styled.p`
  text-align: right;
`
export default IndexLayout
