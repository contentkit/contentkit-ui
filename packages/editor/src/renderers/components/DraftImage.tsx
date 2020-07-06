import clsx from 'clsx'
import React, { Component } from 'react'
import { ContentBlock, ContentState, DraftEditorCommand } from 'draft-js'

type DraftImageProps = {
  block: ContentBlock,
  className: string,
  classes: any,
  blockProps: any,
  customStyleMap: any,
  decorator: any,
  forceSelection: boolean,
  offsetKey: string,
  selection: any,
  tree: any,
  contentState: ContentState,
  blockStyleFn: any,
  customStyleFn: any
}

type DraftImageState = {}

export default class DraftImage extends Component<DraftImageProps, DraftImageState> {
  static defaultProps = {
    classes: {
      image: 'image',
      focused: 'focused'
    }
  }
  render () {
    const {
      block,
      className,
      classes = {},
      ...otherProps
    } = this.props
    const {
      blockProps,
      customStyleMap,
      customStyleFn,
      decorator,
      forceSelection,
      offsetKey,
      selection,
      tree,
      contentState,
      blockStyleFn,
      ...elementProps
    } = otherProps
    const combinedClassName = clsx(
      classes.image,
      className,
      { [classes.focused]: blockProps.isFocused }
    )
    const src = block.getData().get('src')
    return (
      <img
        {...elementProps}
        src={src}
        role='presentation'
        className={combinedClassName}
      />
    )
  }
}
