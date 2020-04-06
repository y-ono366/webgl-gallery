import * as React from 'react'
import Header from '@/components/common/header'
import styled from 'styled-components'

const IndexLayout: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div``
export default IndexLayout
