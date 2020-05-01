import * as React from 'react'
import styled from 'styled-components'
import Menu from '@/components/common/menu'

const Header: React.FC = () => (
  <div>
    <Left>
      <Logo> webgl / gallery</Logo>
    </Left>
    <Right>
      <Menu />
    </Right>
  </div>
)

const Left = styled.div`
  //z-index: 9;
`
const Right = styled.div`
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: 9;
`
const Logo = styled.h1`
  position: fixed;
  z-index: 9;
  top: 0px;
  left: 0px;
  margin: 0;
  background-color: #f0f0f0;

  text-align: center;
  width: 380px;
  height: 65px;
  line-height: 65px;
  font-size: 35px;
  padding-bottom: 4px;
  font-weight: 100;
`
export default Header
