import { SelectionState, EditorState, BlockMap } from 'draft-js'

function setEditorStateBlockMap (editorState: EditorState, blockMap: BlockMap, focusKey: string, focusOffset: number = 0): EditorState {
  const currentContent = editorState.getCurrentContent()
  const selectionAfter = new SelectionState({
    focusKey: focusKey,
    anchorKey: focusKey,
    anchorOffset: focusOffset,
    focusOffset: focusOffset,
    hasFocus: true,
    isBackward: false
  })

  return EditorState.set(
    editorState, {
      currentContent: currentContent.merge({
        blockMap,
        selectionBefore: editorState.getSelection(),
        selectionAfter: selectionAfter
      }),
      selection: selectionAfter
    }
  )
}

export default setEditorStateBlockMap
