import { getCurrentBlock } from '../utils'
import { RichUtils, EditorState, DraftInlineStyle } from 'draft-js'

function discardInlineStyles (editorState: EditorState): EditorState {
  let newEditorState = editorState
  const block = getCurrentBlock(editorState)

  if (block.getLength() === 0 || !editorState.getSelection().isCollapsed()) {
    return editorState
  }

  const styles = block.getCharacterList().last().getStyle()

  if (styles.size) {
    newEditorState = styles
      .toSeq()
      .reduce((acc: EditorState, val: string) => RichUtils.toggleInlineStyle(acc, val), newEditorState)
  }
  return newEditorState
}

export default discardInlineStyles
