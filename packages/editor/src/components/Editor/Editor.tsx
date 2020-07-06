import React from 'react'
import PropTypes from 'prop-types'
import {
  Editor,
  EditorState,
  ContentBlock,
  CompositeDecorator
} from 'draft-js'
import decorate from 'decorate-component-with-props'
import { getBlockMapKeys, Block, HANDLED, NOT_HANDLED } from '@contentkit/util'

import blockRenderMap from '../../util/blockRenderMap'
import customStyleMap from '../../util/customStyleMap'
import * as handlers from '../../handlers'
import * as renderers from '../../renderers'
import { anchorDecorator, createFocusDecorator, MultiDecorator, PrismDecorator } from '../../decorators'

type CustomEditorProps = {
  onChange: (editorState: EditorState) => void,
  editorState: EditorState,
  spellCheck: boolean,
  placeholder: string,
  keyBindings: any
}

type CustomEditorState = {}

function CustomEditor (props) {
  const {
    editorState,
    onChange,
    plugins,
    spellCheck,
    placeholder,
    keyBindings,
    ...rest
  } = props

  const editorRef : React.RefObject<any> = React.useRef()
  const blockKeyStoreRef : React.RefObject<Set<string>> = React.useRef(new Set())
  const lastContentState = React.useRef(editorState.getCurrentContent())
  const lastSelection = React.useRef(editorState.getSelection())
  const renderer = React.useRef(() => {})

  const setEditorState = (editorState) => {
    const contentState = editorState.getCurrentContent()
    if (!contentState.equals(lastContentState.current)) {
      lastContentState.current = contentState
      return onChange(editorState)
    }
    lastContentState.current = contentState

    const selection = editorState.getSelection()
    if (lastSelection.current && selection.equals(lastSelection.current)) {
      lastSelection.current = editorState.getSelection()
      return onChange(editorState)
    }

    if (lastSelection.current) {
      const lastBlockMapKeys = getBlockMapKeys(contentState, lastSelection.current.getStartKey(), lastSelection.current.getEndKey())
      if (lastBlockMapKeys.some((key) => blockKeyStoreRef.current.has(key))) {
        lastSelection.current = selection
        return onChange(EditorState.forceSelection(editorState, editorState.getSelection()))
      }
    }

    const currentBlockMapKeys = getBlockMapKeys(contentState, selection.getStartKey(), selection.getEndKey())
    if (currentBlockMapKeys.some((key) => blockKeyStoreRef.current.has(key))) {
      lastSelection.current = selection
      return onChange(EditorState.forceSelection(editorState, editorState.getSelection()))
    }

    return onChange(editorState)
  }

  const setEditorStateIfNeeded = (nextEditorState: EditorState) => {
    if (nextEditorState !== editorState) {
      setEditorState(nextEditorState)
      return HANDLED
    }
    return NOT_HANDLED
  }

  const store = {
    getEditorState: () => editorState,
    setEditorState: setEditorState,
    setEditorStateIfNeeded: setEditorStateIfNeeded,
    blockKeyStore: blockKeyStoreRef.current
  }

  React.useEffect(() => {
    editorRef.current.focus()
    // @ts-ignore
    blockKeyStoreRef.current = new Set()
    const decorator = createFocusDecorator({ classes: {}, blockKeyStore: blockKeyStoreRef.current })
    // @ts-ignore
    renderer.current = renderers.createBlockRendererFn(decorator)
  }, [])

  React.useEffect(() => {
    if (!editorState.getDecorator()) {
      const anchor = {
        ...anchorDecorator,
        component: decorate(anchorDecorator.component, store)
      }
      const decorator = new MultiDecorator([
        new CompositeDecorator([anchor]),
        new PrismDecorator()
      ])
      const newEditorState = EditorState.set(editorState, { decorator: decorator })
      onChange(newEditorState)
    }
  }, [editorState])

  const handleReturn = (e: any, editorState: EditorState) => {
    return handlers.handleReturn(e, editorState, store)
  }

  const handleKeyCommand = (command: string, editorState: EditorState, eventTimeStamp: number) => {
    if (keyBindings[command]) {
      return keyBindings[command](command, editorState)
    }
    return handlers.handleKeyCommand(command, editorState, eventTimeStamp, store)
  }

  const handleBeforeInput = (character: string, editorState: EditorState) => {
    return handlers.handleBeforeInput(character, editorState, store)
  }

  const handlePastedText = (text: string, html: string, editorState: EditorState) => {
    return handlers.handlePastedText(text, html, editorState, store)
  }

  const blockRendererFn = (contentBlock: ContentBlock) => {
    // @ts-ignore
    return renderer.current(contentBlock, store)
  }

  const keyBindingFn = (evt) => {
    return handlers.keyBindingFn(evt, store)
  }

  const blockStyleFn = (block) => {
    switch (block.getType()) {
      case Block.UNSTYLED:
        return 'paragraph'
    } 
  }

  return (
    <Editor
      onChange={setEditorState}
      handleReturn={handleReturn}
      handleKeyCommand={handleKeyCommand}
      handlePastedText={handlePastedText}
      handleBeforeInput={handleBeforeInput}
      blockRendererFn={blockRendererFn}
      keyBindingFn={keyBindingFn}
      blockStyleFn={blockStyleFn}
      customStyleMap={customStyleMap}
      blockRenderMap={blockRenderMap}
      spellCheck={spellCheck}
      editorState={editorState}
      placeholder={placeholder}
      ref={editorRef}
      {...rest}
    />
  )
}

export default CustomEditor
