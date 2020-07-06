import getSelectedBlocksMapKeys from './getSelectedBlockMapKeys'
import { EditorState } from 'draft-js'

function blockInSelection (editorState: EditorState, blockKey: string) {
  const selectedBlocksKeys = getSelectedBlocksMapKeys(editorState)
  return selectedBlocksKeys.includes(blockKey)
}

export default blockInSelection
