import { EditorState, CharacterMetadata, ContentBlock } from 'draft-js'
import { setEditorStateBlockMap, HANDLED, NOT_HANDLED } from '@contentkit/util'
import { List, Repeat } from 'immutable'
import { OPEN_SCOPE_DELIMETERS, CHARACTER_PAIRS } from '../../../fixtures'

function handleBeforeInput (
  character: string,
  editorState: EditorState,
  { setEditorState }
) {
  if (OPEN_SCOPE_DELIMETERS.includes(character)) {
    const selectionState = editorState.getSelection()
    const focusKey = selectionState.getFocusKey()
    const focusOffset = selectionState.getFocusOffset()
    const contentState = editorState.getCurrentContent()
    const blockMap = contentState.getBlockMap()
    const currentBlock = contentState.getBlockForKey(focusKey)
    const blockText = currentBlock.getText()

    const textBeforeOffset = blockText.slice(0, focusOffset)
    // @ts-ignore
    const textAfterOffset = blockText.slice(focusOffset, currentBlock.getLength())
    const newText = `${textBeforeOffset}${character}${CHARACTER_PAIRS[character]}${textAfterOffset}`
    const newBlockMap = blockMap.set(
      focusKey,
      (currentBlock.merge({
        text: newText,
        characterList: List(Repeat(new CharacterMetadata, newText.length))
      }) as ContentBlock)
    )
    setEditorState(
      setEditorStateBlockMap(editorState, newBlockMap, focusKey, focusOffset + 1)
    )
    return HANDLED
  }

  return NOT_HANDLED
}

export default handleBeforeInput
