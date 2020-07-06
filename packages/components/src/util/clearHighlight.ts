
import { Modifier, EditorState, SelectionState } from 'draft-js'

function clearHighlight (editorState, selection) {
  const contentState = Modifier.removeInlineStyle(editorState.getCurrentContent(), selection, 'HIGHLIGHT')
  const nextEditorState = EditorState.push(editorState, contentState, 'change-inline-style')
  return nextEditorState
  // return EditorState.forceSelection(nextEditorState, selection)
}

export default clearHighlight