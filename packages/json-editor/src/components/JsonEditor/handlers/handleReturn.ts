import { EditorState, DraftHandleValue } from 'draft-js'
import { HANDLED, NOT_HANDLED } from '@contentkit/util'
import splitBlock from '../modifiers/splitBlock'

function getCurrentIndent (editorState: EditorState) {
  const contentState = editorState.getCurrentContent()
  const selectionState = editorState.getSelection()
  const currentBlock = contentState.getBlockForKey(selectionState.getFocusKey())
  const characters = currentBlock.getText().split('')
  let offset = 0
  while (characters.length) {
    if (characters.shift() === ' ') {
      offset++
    } else {
      break
    }
  }

  return Math.floor(offset / 2)
}

function handleReturn ( 
  evt: any,
  editorState: EditorState,
  { setEditorState }
): DraftHandleValue {
  const selection = editorState.getSelection()

  if (!selection.isCollapsed()) {
    return NOT_HANDLED
  }
  const currentIndent = getCurrentIndent(editorState)

  setEditorState(splitBlock(editorState, currentIndent))
  return HANDLED
}

export default handleReturn
