
import { EditorState, RichUtils } from 'draft-js'

function removeLinkAtSelection (editorState: EditorState): EditorState {
  const selection = editorState.getSelection()
  return RichUtils.toggleLink(editorState, selection, null)
}

export default removeLinkAtSelection
