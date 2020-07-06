import { Modifier, EditorState } from 'draft-js'

function applyHighlight (editorState, selection) {
  const contentState = Modifier.applyInlineStyle(
    editorState.getCurrentContent(),
    selection,
    'HIGHLIGHT'
  )
  return EditorState.push(
    editorState,
    contentState,
    'change-inline-style'
  )
}

export default applyHighlight
