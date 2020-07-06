import { EditorState, CharacterMetadata, ContentBlock } from 'draft-js'
import { insertText, indentForward, setEditorStateBlockMap, HANDLED, NOT_HANDLED, Command } from '@contentkit/util'
import { List, Repeat } from 'immutable'
import { OPEN_SCOPE_DELIMETERS, CHARACTER_PAIRS } from '../../../fixtures'
import { isCharacterPair, DEFAULT_INDENT, pad } from '../../../util'

function onTab (editorState: EditorState) {
  const selection = editorState.getSelection()
  if (selection.isCollapsed()) {
    return insertText(editorState, DEFAULT_INDENT)
  }

  return indentForward(editorState)
}

 function handleKeyCommand (
   command: string,
   editorState: EditorState,
   eventTimeStamp: number,
   { setEditorState }
  ) {
  if (command === Command.BACKSPACE) {
    const selectionState = editorState.getSelection()
    const focusOffset = selectionState.getFocusOffset()
    const focusKey = selectionState.getFocusKey()
    const contentState = editorState.getCurrentContent()
    const blockMap = contentState.getBlockMap()
    const currentBlock = contentState.getBlockForKey(focusKey)
    const text = currentBlock.getText()
    if (isCharacterPair(text.charAt(focusOffset - 1), text.charAt(focusOffset))) {
      const newText = text.slice(0, focusOffset - 1) + text.slice(focusOffset + 1, currentBlock.getLength())
      const newBlockMap = blockMap.set(
        focusKey,
        (currentBlock.merge({
          text: newText,
          characterList: List(Repeat(new CharacterMetadata, newText.length))
        }) as ContentBlock)
      )
      setEditorState(
        setEditorStateBlockMap(editorState, newBlockMap, focusKey, focusOffset - 1)
      )
      return HANDLED
    }
  }

  if (command === Command.TAB) {
    setEditorState(onTab(editorState))
    return HANDLED
  }

  return NOT_HANDLED
}

export default handleKeyCommand