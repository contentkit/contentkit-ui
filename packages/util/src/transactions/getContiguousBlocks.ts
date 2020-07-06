import { getCurrentBlock } from '../utils'
import { EditorState, ContentBlock, BlockMap } from 'draft-js'
import { Iterable } from 'immutable'

export function getWrappedBlocksAfter (editorState: EditorState, block: ContentBlock): Iterable<string, ContentBlock> {
  const contentState = editorState.getCurrentContent()
  let blockMap = contentState.getBlockMap()
  return blockMap
    .toSeq()
    // @ts-ignore
    .skipUntil((b: ContentBlock, k: string) => k === block.getKey())
    .rest()
    // @ts-ignore
    .takeUntil((b: ContentBlock) => b.getType() !== block.getType())
}

export function getWrappedBlocksBefore (editorState: EditorState, block: ContentBlock): Iterable<string, ContentBlock> {
  const contentState = editorState.getCurrentContent()
  let blockMap = contentState.getBlockMap()
  return blockMap
    .toSeq()
    .reverse()
    // @ts-ignore
    .skipUntil((b: ContentBlock, k: string) => k === block.getKey())
    // @ts-ignore
    .takeUntil((b: ContentBlock) => b.getType() !== block.getType())
    .reverse()
    .butLast()
}

export default function getContiguousBlocks (editorState: EditorState): BlockMap  {
  const block = getCurrentBlock(editorState)
  const blocksBefore = getWrappedBlocksBefore(editorState, block)
  const blocksAfter = getWrappedBlocksAfter(editorState, block)
  const newBlockMap = blocksBefore.concat(
    [[block.getKey(), block]],
    blocksAfter
  ).toOrderedMap()
  return newBlockMap
}
