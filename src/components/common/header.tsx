import * as React from 'react'
import styled from 'styled-components'

const Header: React.FC = () => (
  <div>
    <Left>
      <Logo> webgl / gallery</Logo>
    </Left>
    <Right></Right>
  </div>
)

const Left = styled.div`
  //z-index: 9;
`
const Right = styled.div`
  position: fixed;
  right: 50px;
  top: 30px;
  z-index: 9;
`
const Logo = styled.h1`
  width: 420px;
  height: 50px;
  position: fixed;
  z-index: 9;
  left: 30px;
  color: #c1c1c1c1;
`

export default Header
