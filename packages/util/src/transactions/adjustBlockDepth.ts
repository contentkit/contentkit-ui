import adjustBlockDepthForContentState from 'draft-js/lib/adjustBlockDepthForContentState'
import { EditorState, EditorChangeType } from 'draft-js'
import { ChangeType } from '../fixtures'

function adjustBlockDepth (
  editorState: EditorState,
  adjustment: any,
  maxDepth: number
): EditorState {
  const content = adjustBlockDepthForContentState(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    adjustment,
    maxDepth
  )

  return EditorState.push(editorState, content, (ChangeType.ADJUST_DEPTH as EditorChangeType))
}

export default adjustBlockDepth
