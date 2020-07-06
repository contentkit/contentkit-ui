import { EditorState, SelectionState, CharacterMetadata, ContentState, ContentBlock } from 'draft-js'
import { List, Repeat } from 'immutable'

export function selectBlock (block: ContentBlock) {
  const selection = SelectionState
    .createEmpty(block.getKey())
    .merge({
      anchorOffset: 0,
      focusOffset: block.getLength()
    })
  return selection
}

export function getBlockMapKeys (contentState: ContentState, startKey: string, endKey: string) {
  const blockMapKeys = contentState.getBlockMap().keySeq()
  return blockMapKeys
    .skipUntil((key) => key === startKey)
    .takeUntil((key) => key === endKey)
    .concat([endKey])
}

export function getSelectedBlocksMap (editorState: EditorState) {
  const selectionState = editorState.getSelection()
  const contentState = editorState.getCurrentContent()
  return getBlockMapKeys(
    contentState,
    selectionState.getStartKey(),
    selectionState.getEndKey()
  )
}

function indentForward (editorState: EditorState, tabSize: number = 2): EditorState {
  const selection = editorState.getSelection()
  const startKey = selection.getStartKey()
  const endKey = selection.getEndKey()
  const contentState = editorState.getCurrentContent()
  const blockMap = contentState.getBlockMap()
  const keys = blockMap.keySeq()
    .skipUntil((key) => key === startKey)
    .takeUntil((key) => key === endKey)
    .concat([endKey])
  
  const nextBlockMap = blockMap.withMutations(blocks => {
    keys.forEach(key => {
      blocks.set(
        key,
        (blocks.get(key).merge({
          text: `  ${blocks.get(key).getText()}`,
          characterList: List(Repeat(new CharacterMetadata(), tabSize)).concat(blocks.get(key).getCharacterList())
        })
      ) as ContentBlock)
    })
  })

  const selectionAfter = new SelectionState({
    focusKey: endKey,
    anchorKey: startKey,
    anchorOffset: Math.max(0, selection.getStartOffset() - tabSize),
    focusOffset: Math.max(0, selection.getEndOffset() + tabSize),
    hasFocus: true,
    isBackward: false
  })

  const nextContentState = contentState.merge({
    blockMap: nextBlockMap,
    selectionBefore: editorState.getSelection(),
    selectionAfter: selectionAfter
  })

  const nextEditorState = EditorState.push(
    editorState,
    (nextContentState as ContentState),
    'insert-characters'
  )

  return EditorState.forceSelection(
    nextEditorState,
    selectionAfter
  )
}

export default indentForward
