import * as React from 'react'
import styled from 'styled-components'

const Header: React.FC = () => (
  <Wrapper>
    <h1>WEBGL-GALLERY</h1>
  </Wrapper>
)

const Wrapper = styled.div`
  position: fixed;
  left: 50px;
  top: 50px;

  h1 {
    font-size: 32px;
    line-height: 36px;
    font-weight: 400;
    text-align: left;
  }
`
export default Header
