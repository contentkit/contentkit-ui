import setBlockProperties from './setBlockProperties'
import { Block } from '../fixtures'
import { List } from 'immutable'
import { EditorState } from 'draft-js'

function resetBlockWithType (editorState: EditorState, newType : string = Block.UNSTYLED) {
  return setBlockProperties(editorState, {
    type: newType,
    text: '',
    characterList: List()
  })
}

export default resetBlockWithType
