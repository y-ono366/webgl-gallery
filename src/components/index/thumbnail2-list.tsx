import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import lax from 'lax.js'

type ItemsTypes = {
  items: ItemType[]
}
interface ItemType {
  alt?: string
  thumbnail: string
  link: string
}
const isImage = (thumbnail: string): boolean => /(png|jpg)+$/.test(thumbnail)
const thumbnailRef = React.createRef<HTMLDivElement>()
const Thumbnail2List: React.FC<ItemsTypes> = ({ items }) => {
  React.useEffect(() => {
    lax.setup()

    const updateLax = () => {
      lax.update(window.scrollY)
      window.requestAnimationFrame(updateLax)
    }

    window.requestAnimationFrame(updateLax)
  }, [])
  return (
    <Wrapper>
      <ThumbnailWrapper className="lax" data-lax-translate-x="0 vw, 800 -elw | loop=800 speed=0.5">
        {items.map((item, key) => {
          return (
            <Thumbnail key={key} ref={thumbnailRef}>
              <Link to={item.link}>
                {isImage(item.thumbnail) ? (
                  <img src={item.thumbnail} alt={item.alt} />
                ) : (
                  <video
                    src={item.thumbnail}
                    loop
                    muted
                    onMouseEnter={(e) => onmouse(e)}
                    onMouseLeave={(e) => levemouse(e)}
                  />
                )}
              </Link>
            </Thumbnail>
          )
        })}
      </ThumbnailWrapper>
    </Wrapper>
  )
}
const onmouse = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>): void => {
  e.target instanceof HTMLMediaElement && e.target.play()
}

const levemouse = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>): void => {
  e.target instanceof HTMLMediaElement && e.target.pause()
}

const onScroll = () => {
  const Yscroll: number = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
  thumbnailRef.current.scrollLeft = Yscroll
}

const Wrapper = styled.div`
  display: flex;
`

const ThumbnailWrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0px;
`

const Thumbnail = styled.div`
  border: 2px solid #000000;
  vertical-align: top;

  margin-right: 40px;
  scroll-snap-type: x mandatory;

  img,
  video {
    height: 800px;
    margin: 0 auto;
  }
`
export default Thumbnail2List
