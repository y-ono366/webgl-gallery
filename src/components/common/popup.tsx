import * as React from 'react'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'

interface Types {
  isShow: boolean
  toggleMenu: Function
}
const Popup: React.FC<Types> = ({ isShow, toggleMenu }) => {
  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 0.9 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  }
  return (
    <Transition in={isShow} timeout={200} unmountOnExit={true} appear={true}>
      {(state) => (
        <Wrapper style={transitionStyles[state]} onClick={() => toggleMenu()}>
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
      )}
    </Transition>
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
  transition: opacity 200ms ease-in-out;
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
  transition: 300ms all cubic-bezier(0.1, 0.59, 0.41, 0.95);
  width: 0px;
  height: 65px;
  position: absolute;
  background: -moz-linear-gradient(0deg, rgba(2, 0, 36, 1) 0%, rgba(22, 44, 59, 1) 25%, rgba(112, 192, 192, 1) 100%);
  background: -webkit-linear-gradient(0deg, rgba(2, 0, 36, 1) 0%, rgba(22, 44, 59, 1) 25%, rgba(112, 192, 192, 1) 100%);
  background: linear-gradient(0deg, rgba(2, 0, 36, 1) 0%, rgba(22, 44, 59, 1) 25%, rgba(112, 192, 192, 1) 100%);
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
