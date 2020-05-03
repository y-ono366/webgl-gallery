import * as React from 'react'
import styled from 'styled-components'
import Popup from '@/components/common/popup'
import { CSSTransition } from 'react-transition-group'

const Menu: React.FC = () => {
  const [isShow, setIsShow] = React.useState(false)

  const Icon = styled.svg`
    margin-top: 13px;
    rect {
      transition: width 200ms ease;
    }
    &:hover {
      .border1 {
        width: 30px;
      }
      .border2 {
        width: 38px;
      }
      .border3 {
        width: 44px;
      }
    }
  `
  return (
    <Wrapper>
      <CSSTransition in={isShow} timeout={200} classNames="iconanim">
        <IconWrapper onClick={() => setIsShow(!isShow)}>
          <Icon width="46" height="42" viewBox="0 0 46 42" fill="#0b0b0b">
            <rect className="border3 " x="1" y="8.5" width="44" height="4.26" rx="1" fill="#1B1B1B" />
            <rect className="border2 " x="1" y="19.76" width="44" height="4.26" rx="1" fill="#1B1B1B" />
            <rect className="border1 " x="1" y="31.02" width="44" height="4.26" rx="1" fill="#1B1B1B" />
          </Icon>
        </IconWrapper>
      </CSSTransition>
      <Popup isShow={isShow} toggleMenu={() => setIsShow(false)} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .iconanim-enter {
    rect {
      transform-origin: center;
      transition: 200ms all ease;
    }
  }
  .iconanim-enter-active,
  .iconanim-enter-done,
  .iconanim-exit,
  .iconanim-exit-active {
    rect {
      transform-origin: center;
      transition: 200ms all ease;
    }
    .border1,
    .border2,
    .border3 {
      width: 44px;
    }
    .border1 {
      transform: translate(-21px, -7px) rotate(-60deg);
    }
    .border2 {
      transform: translate(0px, 15.67px);
    }
    .border3 {
      transform: translate(1px, 4px) rotate(60deg);
    }
  }
  .iconanim-enter-done {
    pointer-events: none;
  }

  .iconanim-exit-done {
    rect {
      transform-origin: center;
      transition: 200ms all ease;
    }
  }
`
const IconWrapper = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  width: 65px;
  height: 65px;
  z-index: 20;
  background-color: #f0f0f0;
  text-align: center;
  vertical-align: middle;
`

export default Menu
