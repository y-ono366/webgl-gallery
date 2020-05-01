import * as React from 'react'
import styled from 'styled-components'
import * as THREE from 'three'
import threeIf from '@/interfaces/three'

const Menu: React.FC = () => {
  return (
    <Wrapper>
      <SvgMenu>
        <rect className="border1 border" y="22.52" width="44" height="4.26" rx="1" fill="#1B1B1B" />
        <rect className="border2 border" y="11.26" width="44" height="4.26" rx="1" fill="#1B1B1B" />
        <rect className="border3 border" width="44" height="4.26" rx="1" fill="#1B1B1B" />
      </SvgMenu>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 9;
  width: 55px;
  height: 65px;
  background-color: #f0f0f0;
  text-align: center;
  vertical-align: middle;
`

const SvgMenu = styled.svg.attrs({
  width: '44',
  height: '20',
  viewBox: '0 0 44 27',
  fill: '#0b0b0b',
})`
  margin-top: 23px;
  .border {
    transition: 200ms all ease;
  }
  &:hover {
    .border1 {
      transform-origin: bottom left;
      transform: translate(0px, 0px) rotate(-60deg);
    }
    .border2 {
      transform: translate(0px, 5px);
    }
  }
`

export default Menu
