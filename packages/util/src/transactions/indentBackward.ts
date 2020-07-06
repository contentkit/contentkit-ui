import { leftIndent } from 'left-indent'
import { ChangeType } from '../fixtures'
import setEditorStateBlockMap from './setEditorStateBlockMap'
import invariant from 'fbjs/lib/invariant'
import { EditorState, ContentBlock } from 'draft-js'

const indentBackward = (editorState: EditorState, tabSize = 2): EditorState => {
  invariant(!isNaN(tabSize), 'tabSize is not a number')
  const contentState = editorState.getCurrentContent()
  const selectionState = editorState.getSelection()
  const focusKey = selectionState.getFocusKey()
  const blockMap = contentState.getBlockMap()
  const focusBlock = blockMap.get(focusKey)
  const text = focusBlock.getText()
  const offset = selectionState.getFocusOffset()
  const textAfter = text.slice(offset, text.length)
  const textBefore = leftIndent(text.slice(0, offset), 'backward')
  const chars = focusBlock.getCharacterList()
  const focusOffset = textBefore.length
  const blockProperties = {
    text: `${textBefore}${textAfter}`,
    characterList: chars.slice(0, focusOffset).concat(chars.slice(offset, text.length))
  }
  const nextBlockMap = blockMap.set(focusKey, (focusBlock.merge(blockProperties) as ContentBlock))
  return setEditorStateBlockMap(editorState, nextBlockMap, focusKey, textBefore.length)
}

export default indentBackward
