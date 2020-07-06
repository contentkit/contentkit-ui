import React from 'react'
import clsx from 'clsx'
import { ContentBlock } from 'draft-js'

export type Attributes = {
  embed?: string,
  tag?: string,
  src?: string
}

export const appendCss = (css: string): void => {
  const head = document.head
  const style : HTMLStyleElement = document.createElement('style')
  style.type = 'text/css'
  // @ts-ignore
  if (style.styleSheet) {
    // @ts-ignore
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }

  head.appendChild(style)
}

type ScriptProps = {
  block: ContentBlock,
  blockProps: {
    isFocused: boolean
  }
}

type ScriptState = {
  loading: boolean,
}

class DraftScript extends React.Component<ScriptProps, ScriptState> {
  ref: any
  state = {
    loading: true
  }

  componentDidMount () {
    const src = this.props.block.getData().get('src')
    let elem = this.ref
    if (src && this.state.loading) {
      this.setState({loading: false}, () => {
        elem.appendChild(this.createScript(src))
      })
    }
  }

  createScript = src => {
    let tag = document.createElement('script')
    tag.async = false
    tag.src = src
    return tag
  }

  render () {
    const { block, blockProps } = this.props
    let html = block.getData().has('embed')
      ? block.getData().get('embed')
      : undefined
    const focused = blockProps.isFocused ? 'focused' : 'unfocused'
    return (
      <div className={clsx('embed', focused)}>
        {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
        <div
          style={{
            'wordWrap': 'normal',
            'whiteSpace': 'normal'
          }}
          ref={ref => { this.ref = ref }}
        />
      </div>
    )
  }
}

export default DraftScript
