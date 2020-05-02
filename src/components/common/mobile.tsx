import * as React from 'react'
import styled from 'styled-components'

const Mobile: React.FC = () => {
  return (
    <Wrapper id="mobilepc">
      <TextSection>
        <Text>
          このサイトはデスクトップPCのみ閲覧が可能です。
          <br />
          デスクトップPCからの閲覧をお願いします。
        </Text>
      </TextSection>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0b0b0b;
`
const TextSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;

  @media screen and (max-width: 480px) {
    width: 310px;
    height: 65px;
  }

  @media screen and (min-width: 481px) and (max-width: 1024px) {
    width: 710px;
    height: 160px;
  }
`
const Text = styled.p`
  color: #f0f0f0;
  margin-bottom: 0px;
  @media screen and (max-width: 480px) {
    font-size: 13px;
  }
  @media screen and (min-width: 481px) and (max-width: 1024px) {
    font-size: 30px;
  }
`

export default Mobile
