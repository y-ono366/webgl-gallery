import * as React from 'react'
import styled from 'styled-components'

const Header: React.FC = () => (
  <div>
    <Left>
      <h1>WEBGL GALLERY</h1>
    </Left>
    <Right></Right>
  </div>
)

const Left = styled.div`
  position: fixed;
  left: 50px;
  top: 30px;
  z-index: 9;

  h1 {
    font-size: 32px;
    line-height: 36px;
    font-weight: 400;
    // letter-spacing: 0.3em;
    text-align: left;
    color: #c2c2c2;
  }
`
const Right = styled.div`
  position: fixed;
  right: 50px;
  top: 30px;
  z-index: 9;
`

export default Header
