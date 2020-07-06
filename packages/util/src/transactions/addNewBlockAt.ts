import { Block } from '../fixtures'
import { ContentBlock, genKey, EditorState } from 'draft-js'
import { Map, List } from 'immutable'
import insertBlocksIntoBlockMap from './insertBlocksIntoBlockMap'
import invariant from 'fbjs/lib/invariant'

function addNewBlockAt (
  editorState: EditorState,
  pivotBlockKey: string,
  newBlockType: string = Block.UNSTYLED,
  initialData: any = {}
): EditorState {
  const content = editorState.getCurrentContent()
  const blockMap = content.getBlockMap()
  const block = blockMap.get(pivotBlockKey)
  invariant(block, `The pivot key - ${pivotBlockKey} is not present in blockMap.`)

  const newBlockKey = genKey()

  const newBlock = new ContentBlock({
    key: newBlockKey,
    type: newBlockType,
    text: '',
    characterList: List(),
    depth: 0,
    data: Map(initialData)
  })

  return insertBlocksIntoBlockMap(editorState, blockMap, [newBlock])
}

export default addNewBlockAt
