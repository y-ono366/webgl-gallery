import * as React from 'react'
import IndexLayout from '@/components/common/index-layout'
import ThumbnailList from '@/components/index/thumbnail-list'

const items = [
  {
    thumbnail: require('#/thumbnails/image/loading.png').default,
    link: '/loading',
  },
  {
    thumbnail: require('#/thumbnails/image/circle.png').default,
    link: '/circle',
  },
  {
    thumbnail: require('#/thumbnails/image/particle.png').default,
    link: '/particle',
  },
  {
    thumbnail: require('#/thumbnails/image/usestrict2.png').default,
    link: '/usestrict2',
  },
  {
    alt: 'usestrict',
    thumbnail: require('#/thumbnails/usestrict.png').default,
    link: '/usestrict',
  },
  {
    thumbnail: require('#/thumbnails/image/fragmentshader.png').default,
    link: '/fragmentshader',
  },
  {
    thumbnail: require('#/thumbnails/image/slash.png').default,
    link: '/slash',
  },
  {
    thumbnail: require('#/thumbnails/image/lines.png').default,
    link: '/lines',
  },
  {
    thumbnail: require('#/thumbnails/image/samplebox2.png').default,
    link: '/samplebox2',
  },
  {
    thumbnail: require('#/thumbnails/image/samplebox.png').default,
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
