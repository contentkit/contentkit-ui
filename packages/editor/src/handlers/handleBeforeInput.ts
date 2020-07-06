
import { EditorState, SelectionState, Modifier, EditorChangeType, ContentBlock } from 'draft-js'
import { getCurrentBlock, setBlockProperties, resetBlockWithType, Inline, Block, ChangeType, NOT_HANDLED, HANDLED, BLOCK_TOKENS, INLINE_TOKENS } from '@contentkit/util'
import { List } from 'immutable'

function applyMarkdownStyle (editorState: EditorState, matchArr: any, style: string, character: string) {
  const { index: anchorOffset } = matchArr
  const focusOffset = anchorOffset + matchArr[0].length
  const blockKey = editorState
    .getSelection()
    .getStartKey()
  const wordSelection = SelectionState.createEmpty(blockKey).merge({
    anchorOffset,
    focusOffset
  })
  const capturedText = matchArr[matchArr.length - 1]
  const length = (matchArr[0].length - capturedText.length) / 2
  let newContentState = Modifier.replaceText(
    editorState.getCurrentContent(),
    (wordSelection as SelectionState),
    `${capturedText}${character || ' '}`
  )
  return EditorState.forceSelection(
    EditorState.push(
      editorState,
      Modifier.applyInlineStyle(
        newContentState,
        // @ts-ignore
        (wordSelection as SelectionState).merge({
          anchorOffset: anchorOffset,
          focusOffset: focusOffset - length * 2
        }),
        style
      ),
      (ChangeType.CHANGE_INLINE_STYLE as EditorChangeType)
    ),
    newContentState.getSelectionAfter()
  )
}

const beforeInput = (
  block: ContentBlock,
  editorState: EditorState,
  char: string
) => {
  const selection = editorState.getSelection()
  const focusOffset = selection.getFocusOffset()
  const text = block.getText()
    .slice(0, focusOffset)
  const blockToken = BLOCK_TOKENS.find(tok => tok.regexp.test(text))

  let newEditorState = editorState

  if (blockToken) {
    const length = block.getLength()
    const blockProperties = {
      type: blockToken.type,
      text: block.getText().slice(focusOffset, length)
    }
    return setBlockProperties(editorState, blockProperties)
  }

  const inlineToken = INLINE_TOKENS.find(tok => tok.regexp.test(text))

  if (inlineToken) {
    const matchArr = text.match(inlineToken.regexp)
    newEditorState = applyMarkdownStyle(newEditorState, matchArr, inlineToken.style, char)
  }

  return newEditorState
}


function handleBeforeInput (character: string, editorState: EditorState, { setEditorStateIfNeeded }) {
  const block = getCurrentBlock(editorState)
  const isBeforeInput = character === ' ' && block.getType() !== Block.CODE
  if (isBeforeInput) {
    return setEditorStateIfNeeded(beforeInput(block, editorState, character))
  }
  
  return NOT_HANDLED
}

export default handleBeforeInput
