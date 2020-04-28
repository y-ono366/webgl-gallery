import * as React from 'react'
import DetailLayout from '@/components/common/detail-layout'
import styled from 'styled-components'

const Usestrict: React.FC = () => {
  React.useEffect(() => {
    return () => {}
  }, [])

  return (
    <DetailLayout>
      <Img type="image/svg+xml" data={require('#/images/usestrict.svg').default} width="1000" height="1610" />
    </DetailLayout>
  )
}

const Img = styled.object`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
`
export default Usestrict
