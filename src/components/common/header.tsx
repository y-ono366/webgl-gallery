import * as React from 'react'
import styled from 'styled-components'

export default class Header extends React.Component<{}> {
  render(): JSX.Element {
    return (
      <Wrapper>
        <h1>WEBGL-GALLERY</h1>
      </Wrapper>
    )
  }
}
const Wrapper = styled.div`
  padding-top: 35px;
  padding-bottom: 35px;
  width: 1280px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: 'Montserrat', 'sans-serif';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  h1 {
    font-size: 32px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-family: Montserrat, sans-serif;
    font-size: 33px;
    line-height: 36px;
    font-weight: 400;
    text-align: left;
  }
`
