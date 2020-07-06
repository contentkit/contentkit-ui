import { genKey, EditorChangeType, SelectionState, ContentState, ContentBlock, CharacterMetadata, EditorState } from 'draft-js'
import { Map, List, Repeat } from 'immutable'
import { ChangeType, Block } from '@contentkit/util'
import { isCharacterPair, pad } from '../../../util'

function createBlock (text): ContentBlock {
  return new ContentBlock({
    key: genKey(),
    type: Block.UNSTYLED,
    text: text,
    characterList: List(Repeat(new CharacterMetadata(), text.length)),
    depth: 0,
    data: Map()
  })
}

function splitBlock (editorState: EditorState, indent: number) {
  const offset = indent * 2
  const currentContent = editorState.getCurrentContent()
  const blockMap = currentContent.getBlockMap()
  const selection = editorState.getSelection()
  const focusKey = selection.getFocusKey()
  const focusOffset = selection.getFocusOffset()
  const pivotBlock = blockMap.get(focusKey)
  const pivotBlockText = pivotBlock.getText()
  const textBefore = pivotBlockText.slice(0, focusOffset)
  const textAfter = pivotBlockText.slice(focusOffset, pivotBlock.getLength())
  const isBetweenCharacterPair = isCharacterPair(textBefore.charAt(textBefore.length - 1), textAfter.charAt(0))
  const isAtEndOfBlock = focusOffset === pivotBlock.getLength()
  
  const newBlockText = `${pad(offset)}${textAfter}`
  const newBlock = createBlock(newBlockText)
  
  const newBlocks = [newBlock]
  let selectionAfter = new SelectionState({
    focusKey: newBlock.getKey(),
    anchorKey: newBlock.getKey(),
    focusOffset: newBlockText.length,
    anchorOffset: newBlockText.length,
    isBackward: false,
    hasFocus: true
  })

  if (isBetweenCharacterPair) {
    const newFocusBlock = createBlock(pad(offset + 2))
    const newFocusKey = newFocusBlock.getKey()
    newBlocks.unshift(newFocusBlock)
    selectionAfter = (selectionAfter.merge({
      focusKey: newFocusKey,
      anchorKey: newFocusKey,
      focusOffset: offset + 2,
      anchorOffset: offset + 2
    }) as SelectionState)
  }

  const blocksBefore = blockMap.toSeq().takeUntil((v) => v.getKey() === focusKey)
  const blocksAfter = blockMap.toSeq().skipUntil((v) => v.getKey() === focusKey).skip(1)

  const newBlockMap = blocksBefore
    .concat(
      [[
        focusKey,
        (blockMap.get(focusKey).merge({
          text: textBefore,
          characterList: List(Repeat(new CharacterMetadata(), textBefore.length))
        }) as ContentBlock)
      ]],
      newBlocks.map(block => ([block.getKey(), block])),
      blocksAfter
    )
    .toOrderedMap()

  const newContentState = currentContent.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
    selectionAfter: selectionAfter
  })
  
  return EditorState.push(editorState, (newContentState as ContentState), (ChangeType.SPLIT_BLOCK as EditorChangeType))
}

export default splitBlock
