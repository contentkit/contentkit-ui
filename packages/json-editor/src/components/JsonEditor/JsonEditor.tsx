import React from 'react'
import {
  convertToRaw,
  Editor,
  genKey,
  ContentState,
  ContentBlock,
  BlockMap,
  Modifier,
  EditorState,
  DraftHandleValue,
  EditorChangeType,
  CharacterMetadata,
  SelectionState,
  KeyBindingUtil,
  getDefaultKeyBinding,
  DraftBlockType,
  RawDraftEntity
} from 'draft-js'
import { Map, List, Repeat } from 'immutable'
import {
  insertText,
  Block,
  ChangeType,
  HANDLED,
  NOT_HANDLED,
  Command,
  Key
} from '@contentkit/util'
import { MultiDecorator, PrismDecorator } from '@contentkit/editor/lib/decorators'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import * as handlers from './handlers'
import { DialogActions, Toolbar, IconButton, Dialog, DialogContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Close as CloseIcon, Save as SaveIcon } from '@material-ui/icons'
import invariant from 'fbjs/lib/invariant'

export type InlineStyleRange = {
  style: string,
  offset: number,
  length: number
}

export type EntityRange = {
  key: number,
  offset: number,
  length: number,
}

export type RawDraftContentBlock = {
  key?: string,
  type: DraftBlockType,
  text: string,
  depth?: number,
  inlineStyleRanges?: InlineStyleRange[],
  entityRanges?: EntityRange[],
  data?: Object
}

export type RawDraftContentState = {
  blocks: Array<RawDraftContentBlock>,
  entityMap: { [key: string]: RawDraftEntity }
}

const useStyles = makeStyles(theme => ({
  button: {
    color: '#718096'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}))

const CODE_WRAP = <pre className='cke-code-container' />
const blockRenderMap = Map({
  [Block.UNSTYLED]: {
    element: 'div',
    wrapper: CODE_WRAP
  }
})

// @ts-ignore
const prismDecorator = new PrismDecorator({ syntax: 'json', blockType: Block.UNSTYLED })
const decorator = new MultiDecorator([prismDecorator])

function getInitialState(initialEditorState, state) {
  const text = JSON.stringify(convertToRaw(state.getCurrentContent()), null, 2)
  const contentState = ContentState.createFromText(text, '\n')

  let editorState = EditorState.push(initialEditorState, contentState, 'insert-fragment')
  return editorState
}

function JsonEditor(props) {
  const { onClose, onSave } = props
  const classes = useStyles(props)
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())

  const onChange = editorState => {
    setEditorState(editorState)
  }

  const handleReturn = (evt: any, editorState: EditorState): DraftHandleValue => {
    return handlers.handleReturn(evt, editorState, { setEditorState })
  }

  const handleBeforeInput = (character: string, editorState: EditorState) => {
    return handlers.handleBeforeInput(character, editorState, { setEditorState })
  }

  const handleKeyCommand = (command: string, editorState: EditorState, eventTimeStamp: number) => {
    return handlers.handleKeyCommand(command, editorState, eventTimeStamp, { setEditorState })
  }

  const keyBindingFn = (evt) => {
    if (evt.which === Key.SAVE && KeyBindingUtil.hasCommandModifier(evt)) {
      return Command.EDITOR_SAVE
    }

    if (evt.which === Key.BACKSPACE) {
      return Command.BACKSPACE
    }

    if (evt.which === Key.TAB) {
      return Command.TAB
    }

    return getDefaultKeyBinding(evt)
  }

  React.useEffect(() => {
    const nextEditorState = getInitialState(editorState, props.editorState)
    setEditorState(EditorState.set(nextEditorState, { decorator: decorator }))
  }, [])

  const selection = editorState.getSelection()

  const onSaveEditor = () => {
    const text = editorState.getCurrentContent().getPlainText()
    let json
    try {
      json = JSON.parse(text) as RawDraftContentState
    } catch (err) {
      throw err
    }
  
    try {
      invariant(json.entityMap, 'Raw state is missing entity map')
      invariant(Array.isArray(json.blocks), 'Raw state is missing blocks')
      json.blocks.forEach((block: RawDraftContentBlock) => {
        invariant(block.key, 'Raw block malformed')
        invariant(block.type, 'Raw block malformed')
      })
    } catch (err) {
      throw err
    }
    onSave(json)
    onClose()
  }

  return (
    <React.Fragment>
      <DialogContent>
        <Editor
          onChange={onChange}
          editorState={editorState}
          blockRenderMap={blockRenderMap}
          handleReturn={handleReturn}
          handleKeyCommand={handleKeyCommand}
          handleBeforeInput={handleBeforeInput}
          keyBindingFn={keyBindingFn}
        />
      </DialogContent>
      <DialogActions>
        <Toolbar className={classes.toolbar}>
          <IconButton edge='start' color='inherit' onClick={onClose} aria-label="close" className={classes.button}>
            <CloseIcon />
          </IconButton>
          <IconButton edge='start' color='inherit' onClick={onSaveEditor} aria-label="close" className={classes.button}>
            <SaveIcon />
          </IconButton>
        </Toolbar>
      </DialogActions>
    </React.Fragment>
  )
}

export default JsonEditor
