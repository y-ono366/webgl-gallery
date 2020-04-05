import * as React from 'react'
import IndexLayout from '@/components/common/index-layout'
import ThumbnailList from '@/components/index/thumnail-list'

export default class Index extends React.Component<{}> {
  items = [
    {
      thumbnail: require('#/thumbnails/particle2.mp4').default,
      link: '/particle2',
    },
    {
      thumbnail: require('#/thumbnails/particle.mp4').default,
      link: '/particle',
    },
    {
      thumbnail: require('#/thumbnails/pixijs.mp4').default,
      link: '/pixi',
    },
    {
      alt: 'usestrict',
      thumbnail: require('#/thumbnails/usestrict.png').default,
      link: '/usestrict',
    },
    {
      thumbnail: require('#/thumbnails/fragmentshader.mp4').default,
      link: '/fragmentshader',
    },
    {
      thumbnail: require('#/thumbnails/slash.mp4').default,
      link: '/slash',
    },
    {
      thumbnail: require('#/thumbnails/lines.mp4').default,
      link: '/lines',
    },
    {
      thumbnail: require('#/thumbnails/samplebox2.mp4').default,
      link: '/samplebox2',
    },
    {
      thumbnail: require('#/thumbnails/samplebox.mp4').default,
      link: '/samplebox',
    },
  ]
  render(): JSX.Element {
    return (
      <IndexLayout>
        <ThumbnailList items={this.items} />
      </IndexLayout>
    )
  }
}
