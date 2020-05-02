import * as React from 'react'
import styled from 'styled-components'

const Popup: React.FC = () => {
  return (
    <Wrapper>
      <ItemList>
        <Item href="https://twitter.com/y_ono366">
          <ItemBox />
          <ItemSec>
            <ItemHead>01-twitter</ItemHead>
            <ItemText>y_ono366</ItemText>
          </ItemSec>
        </Item>
        <Item href="https://github.com/y-ono366">
          <ItemBox />
          <ItemSec>
            <ItemHead>02-github</ItemHead>
            <ItemText>y-ono366</ItemText>
          </ItemSec>
        </Item>
        <Item href="mailto:yusuke@ohno.systems">
          <ItemBox />
          <ItemSec>
            <ItemHead>03-email</ItemHead>
            <ItemText>ohno.systems</ItemText>
          </ItemSec>
        </Item>
      </ItemList>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: fixed;
  z-index: 19;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  background: black;
  opacity: 0.9;
`
const ItemList = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 920px;
  height: 65px;
`
const Item = styled.a.attrs({
  target: '_blank',
})`
  color: #0b0b0b;
  text-decoration: none;
  margin: 0 auto;
  width: 204px;
  height: 65px;
  background: #f0f0f0;
  &:hover {
    .ItemBox {
      width: 204px;
    }
  }
`
const ItemBox = styled.div.attrs({
  className: 'ItemBox',
})`
  transition: 280ms all cubic-bezier(0.22, 1, 0.36, 1);
  width: 0px;
  height: 65px;
  position: absolute;
  background: -moz-linear-gradient(top, #fff, #ffc778 30%, #f89174 60%, #748af8);
  background: -webkit-linear-gradient(top, #fff, #ffc778 30%, #f89174 60%, #748af8);
  background: linear-gradient(to bottom, #fff, #ffc778 30%, #f89174 60%, #748af8);
`
const ItemHead = styled.p`
  margin: 0;
  font-size: 16px;
  text-align: left;
`
const ItemText = styled.p`
  margin: 0;
  margin-top: -4px;
  font-size: 28px;
  text-align: center;
  line-height: 34px;
`
const ItemSec = styled.div`
  position: relative;
`
export default Popup
