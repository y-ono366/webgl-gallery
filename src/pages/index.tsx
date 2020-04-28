import * as React from 'react'
import IndexLayout from '@/components/common/index-layout'
import ThumbnailList from '@/components/index/thumbnail-list'

const items = [
  {
    thumbnail: require('#/images/loading.png').default,
    link: '/loading',
  },
  {
    thumbnail: require('#/images/circle.png').default,
    link: '/circle',
  },
  {
    thumbnail: require('#/images/particle.png').default,
    link: '/particle',
  },
  {
    thumbnail: require('#/images/usestrict2.png').default,
    link: '/usestrict2',
  },
  {
    alt: 'usestrict',
    thumbnail: require('#/images/usestrict.png').default,
    link: '/usestrict',
  },
  {
    thumbnail: require('#/images/fragmentshader.png').default,
    link: '/fragmentshader',
  },
  {
    thumbnail: require('#/images/slash.png').default,
    link: '/slash',
  },
  {
    thumbnail: require('#/images/lines.png').default,
    link: '/lines',
  },
  {
    thumbnail: require('#/images/samplebox2.png').default,
    link: '/samplebox2',
  },
  {
    thumbnail: require('#/images/samplebox.png').default,
    link: '/samplebox',
  },
]

const Index: React.FC = () => {
  React.useEffect(() => {}, [])
  return (
    <IndexLayout>
      <ThumbnailList items={items} />
    </IndexLayout>
  )
}
export default Index
