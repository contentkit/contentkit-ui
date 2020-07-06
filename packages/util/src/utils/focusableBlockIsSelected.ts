
import { EditorState } from 'draft-js'

function focusableBlockIsSelected (editorState: EditorState, blockKeyStore: Set<string>) {
  const selection = editorState.getSelection()
  if (selection.getAnchorKey() !== selection.getFocusKey()) {
    return false
  }
  const content = editorState.getCurrentContent()
  const block = content.getBlockForKey(selection.getAnchorKey())
  return blockKeyStore.has(block.getKey())
}

export default focusableBlockIsSelected
