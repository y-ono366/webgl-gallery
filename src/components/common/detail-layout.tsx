import * as React from 'react'
import styled from 'styled-components'

export default class DetailLayout extends React.Component<{}> {
  render(): JSX.Element {
    return <Wrapper>{this.props.children}</Wrapper>
  }
}

const Wrapper = styled.div``
