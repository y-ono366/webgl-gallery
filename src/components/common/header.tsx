import * as React from 'react'
import styled from 'styled-components'

const Header: React.FC = () => (
  <Wrapper>
    <h1>WEBGL-GALLERY</h1>
  </Wrapper>
)

const Wrapper = styled.div`
  padding-top: 35px;
  padding-bottom: 35px;
  width: 1280px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  h1 {
    font-size: 32px;
    margin-top: 0px;
    margin-bottom: 0px;
    line-height: 36px;
    font-weight: 400;
    text-align: left;
  }
`
export default Header
