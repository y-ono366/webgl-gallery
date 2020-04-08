import * as React from 'react'
import DetailLayout from '@/components/common/detail-layout'
import styled from 'styled-components'

const Usestrict: React.FC = () => {
  React.useEffect(() => {
    return () => {}
  }, [])

  return (
    <DetailLayout>
      <Img src={require('#/usestrict.svg').default}></Img>
    </DetailLayout>
  )
}

const Img = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
`
export default Usestrict
