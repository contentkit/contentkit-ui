import React from 'react'
import clsx from 'clsx'
import { ContentBlock } from 'draft-js'

type DraftVideoProps = {
  className: string,
  controls: boolean,
  height: number,
  loop: boolean,
  muted: boolean,
  playsInline: boolean,
  poster: string,
  preload: string,
  width: number,
  block: ContentBlock,
  classes: any,
  blockProps: any
}

class DraftVideo extends React.Component<DraftVideoProps, {}> {
  static defaultProps = {
    controls: true,
    preload: 'auto',
    width: 640,
    height: 360,
    loop: false,
    muted: false,
    poster: undefined,
    classes: {
      video: 'video',
      focused: 'focused'
    }
  }

  render () {
    const {
      className,
      controls,
      height,
      loop,
      muted,
      playsInline,
      poster,
      preload,
      width,
      block,
      classes,
      blockProps
    } = this.props
    const src = block.getData().get('src')
    const combinedClassName = clsx(
      classes.video,
      className,
      { [classes.focused]: blockProps.isFocused }
    )
    return (
      <video
        controls={controls}
        height={height}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        poster={poster}
        preload={preload}
        src={src}
        width={width}
        className={combinedClassName}
      />
    )
  }
}

export default DraftVideo
