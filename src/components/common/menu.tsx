import * as React from 'react'
import styled from 'styled-components'
import Popup from '@/components/common/popup'
// import { Transition } from 'react-transition-group'

interface StateType {
  showMenu: boolean
}
const Menu: React.FC = () => {
  const toggleMenu = (): void => {
    setState({
      showMenu: !state.showMenu,
    })
  }
  const [state, setState] = React.useState<StateType>({ showMenu: false })

  const Icon = styled.svg`
    margin-top: 13px;

    rect {
      transform-origin: center;
      transition: 200ms all ease;
    }

    &:hover {
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
    }};
  `
  return (
    <Wrapper>
      <IconWrapper onClick={() => toggleMenu()}>
        <Icon width="48" height="42" viewBox="0 0 48 42" fill="#0b0b0b">
          <rect className="border3 border" x="2" y="8.5" width="44" height="4.26" rx="1" fill="#1B1B1B" />
          <rect className="border2 border" x="2" y="19.76" width="44" height="4.26" rx="1" fill="#1B1B1B" />
          <rect className="border1 border" x="2" y="31.02" width="44" height="4.26" rx="1" fill="#1B1B1B" />
        </Icon>
      </IconWrapper>
      <Popup showMenu={state.showMenu} />
    </Wrapper>
  )
}
const Wrapper = styled.div``
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
