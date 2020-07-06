import { Modifier, SelectionState, EditorState, BlockMap, EditorChangeType } from 'draft-js'
import { ChangeType } from '../fixtures'

function removeInlineStyle (editorState: EditorState, style: string, blockMap: BlockMap): EditorState {
  const currentContent = editorState.getCurrentContent()
  const blocks = blockMap || currentContent.getBlockMap()
  const selection = editorState.getSelection()

  const newContentState = blocks
    .reduce((contentState, block) => {
      block.findStyleRanges(
        char => char.getStyle() !== null,
        (start, end) => {
          contentState = Modifier.removeInlineStyle(
            contentState,
            (SelectionState.createEmpty(block.getKey()).merge({
              focusOffset: end,
              anchorOffset: start
            }) as SelectionState),
            style
          )
        }
      )
      return contentState
    }, currentContent)

  return EditorState.forceSelection(
    EditorState.push(
      editorState,
      newContentState,
      (ChangeType.CHANGE_INLINE_STYLE as EditorChangeType)
    ),
    selection
  )
}

export default removeInlineStyle
