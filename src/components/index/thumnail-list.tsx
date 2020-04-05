import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface ItemsTypes {
  items: ItemType[]
}
interface ItemType {
  alt?: string
  thumbnail: string
  link: string
}

export default class ThumbnailList extends React.Component<ItemsTypes> {
  isImage(thumbnail: string): boolean {
    return /(png|jpg)+$/.test(thumbnail)
  }
  render(): JSX.Element {
    return (
      <Wrapper>
        {this.props.items.map((item, key) => {
          if (this.isImage(item.thumbnail)) {
            return (
              <Thumbnail>
                <Link to={item.link}>
                  <img key={key} src={item.thumbnail} alt={item.alt} />
                </Link>
              </Thumbnail>
            )
          } else {
            return (
              <Thumbnail>
                <Link to={item.link}>
                  <video key={key} src={item.thumbnail} loop muted />
                </Link>
              </Thumbnail>
            )
          }
        })}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  width: 1280px;
`

const Thumbnail = styled.div`
  margin: 2px 2px 0px;
  video,
  img {
    width: 291.24px;
    height: 180px;
  }
`
