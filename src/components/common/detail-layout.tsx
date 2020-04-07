import * as React from 'react'
import styled from 'styled-components'

const DetailLayout: React.FC = ({ children }) => <Wrapper>{children}</Wrapper>
const Wrapper = styled.div`
  text-align: center;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
`
export default DetailLayout
