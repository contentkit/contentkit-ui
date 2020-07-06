import React, { Component } from 'react'
import clsx from 'clsx'
import { ContentBlock } from 'draft-js'

const getDisplayName = (WrappedComponent: any) => {
  const component = WrappedComponent.WrappedComponent || WrappedComponent
  return component.displayName || component.name || 'Component'
}

type CreateDecoratorOptions = {
  classes: any,
  blockKeyStore: any
}

type BlockFocusDecoratorBlockProps = {
  isFocused: boolean,
  setFocusToBlock: () => void
}

type BlockFocusDecoratorProps = {
  block: ContentBlock,
  blockProps: BlockFocusDecoratorBlockProps
  className: string
}

const createDecorator = ({ classes, blockKeyStore }: CreateDecoratorOptions) => 
  (WrappedComponent: any) => 
    class BlockFocusDecorator extends Component<BlockFocusDecoratorProps, {}> {
    
      static displayName = `BlockFocus(${getDisplayName(WrappedComponent)})`
      static WrappedComponent = WrappedComponent.WrappedComponent || WrappedComponent

      componentDidMount() {
        blockKeyStore.add(this.props.block.getKey())
      }

      componentWillUnmount() {
        blockKeyStore.delete(this.props.block.getKey())
      }

      onClick = (evt) => {
        evt.preventDefault()
        if (!this.props.blockProps.isFocused) {
          this.props.blockProps.setFocusToBlock()
        }
      }

      render() {
        const { blockProps, className } = this.props
        const { isFocused } = blockProps
        const combinedClassName = isFocused
          ? clsx(className, classes.focused)
          : clsx(className, classes.unfocused)
        return (
          <WrappedComponent
            {...this.props}
            onClick={this.onClick}
            className={combinedClassName}
          />
        )
      }
    }

export default createDecorator
