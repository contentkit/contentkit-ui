import { EditorState } from 'draft-js'
 
function getCurrentEntityKey (editorState: EditorState): string {
  const selection = editorState.getSelection()
  const anchorKey = selection.getAnchorKey()
  const contentState = editorState.getCurrentContent()
  const anchorBlock = contentState.getBlockForKey(anchorKey)
  // @ts-ignore
  const offset = selection.anchorOffset
  // @ts-ignore
  const index = selection.isBackward ? offset - 1 : offset

  return anchorBlock.getEntityAt(index)
}

export default getCurrentEntityKey