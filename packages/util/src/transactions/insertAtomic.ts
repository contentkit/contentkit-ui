import insertBlocksIntoBlockMap from './insertBlocksIntoBlockMap'
import { Map, List, Repeat } from 'immutable'
import { ContentBlock, genKey, CharacterMetadata, EditorState } from 'draft-js'

function insertAtomic (
  editorState: EditorState,
  blockType: string,
  data: any
): EditorState {
  const blockMap = editorState.getCurrentContent().getBlockMap()
  const blocks = [
    new ContentBlock({
      key: genKey(),
      type: blockType,
      text: ' ',
      characterList: List(Repeat(new CharacterMetadata(), 1)),
      depth: 0,
      data: Map(data)
    }),
    new ContentBlock({
      key: genKey(),
      type: 'unstyled',
      text: '',
      characterList: List(),
      depth: 0,
      data: Map()
    })
  ]

  return insertBlocksIntoBlockMap(editorState, blockMap, blocks)
}

export default insertAtomic
