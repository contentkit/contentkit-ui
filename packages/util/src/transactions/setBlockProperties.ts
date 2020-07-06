import setEditorStateBlockMap from './setEditorStateBlockMap'
import { CharacterMetadata, EditorState, ContentBlock } from 'draft-js'
import { List, Repeat } from 'immutable'

function setBlockProperties (editorState: EditorState, blockProperties: any, focusOffset?: number): EditorState {
  if (blockProperties.text && !blockProperties.characterList) {
    blockProperties.characterList = List(Repeat(new CharacterMetadata(), blockProperties.text.length))
  }
  const contentState = editorState.getCurrentContent()
  const selectionState = editorState.getSelection()
  const focusKey = selectionState.getFocusKey()
  const blockMap = contentState.getBlockMap()
  const focusBlock = blockMap.get(focusKey)
  const nextBlockMap = blockMap.set(focusKey, (focusBlock.merge(blockProperties) as ContentBlock))
  const offset = focusOffset || blockProperties.text.length
  return setEditorStateBlockMap(editorState, nextBlockMap, focusKey, offset)
}

export default setBlockProperties
