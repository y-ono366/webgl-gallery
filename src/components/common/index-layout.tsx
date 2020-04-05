import * as React from 'react'
import Header from '@/components/common/header'
import styled from 'styled-components'

export default class IndexLayout extends React.Component<{}> {
  render(): JSX.Element {
    return (
      <Wrapper>
        <Header />
        {this.props.children}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div``
