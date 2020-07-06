import getBlockMapKeys from './getBlockMapKeys'
import { EditorState } from 'draft-js'
import { Iterable } from 'immutable'

function getSelectedBlocksMapKeys (editorState: EditorState): Iterable<number, string> {
  const selectionState = editorState.getSelection()
  const contentState = editorState.getCurrentContent()
  return getBlockMapKeys(
    contentState,
    selectionState.getStartKey(),
    selectionState.getEndKey()
  )
}

export default getSelectedBlocksMapKeys
