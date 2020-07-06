import React from 'react'
import { ContentBlock } from 'draft-js'
import appendStylesheet from 'append-stylesheet'
import clsx from 'clsx'

type EmbeddedGistProps = {
  block: ContentBlock,
  blockProps: {
    focused: boolean
  }
}

type EmbeddedGistState = {
  loading: boolean,
  src: string
}

class EmbeddedGist extends React.Component<EmbeddedGistProps, EmbeddedGistState> {
  state = {
    loading: true,
    src: ''
  }

  static gistCallbackId = 0;
  static nextGistCallback = () => 'embed_gist_callback_' + EmbeddedGist.gistCallbackId++;

  componentDidMount () {
    const src = this.props.block.getData().get('src')
    let gistCallback = EmbeddedGist.nextGistCallback()

    window[gistCallback] = gist => {
      if (this.state.loading) {
        this.setState({
          loading: false,
          src: gist.div
        })
        appendStylesheet(gist.stylesheet)
      }
    }

    let url = src + 'on?callback=' + gistCallback
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    document.head.appendChild(script)
  }

  render () {
    const { blockProps } = this.props
    const focused = blockProps.focused ? 'focused' : 'unfocused'
    const className = clsx('embed', focused)
    return (
      <div className={className}>
        <div
          style={{
            wordWrap: 'normal',
            whiteSpace: 'normal'
          }}
          dangerouslySetInnerHTML={{ __html: this.state.src }}
        />
      </div>
    )
  }
}

export default EmbeddedGist
