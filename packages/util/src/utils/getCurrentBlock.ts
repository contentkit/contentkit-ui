import { EditorState, ContentBlock } from 'draft-js'

function getCurrentBlock (editorState: EditorState): ContentBlock {
  const selectionState = editorState.getSelection()
  const contentState = editorState.getCurrentContent()
  const block = contentState.getBlockForKey(selectionState.getStartKey())
  return block
}

export default getCurrentBlock
