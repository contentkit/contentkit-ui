import { EditorState, ContentState, ContentBlock, EditorChangeType } from 'draft-js'

function updateDataOfBlock (editorState: EditorState, block: ContentBlock, newData: any): EditorState {
  const contentState = editorState.getCurrentContent()
  const newBlock = block.merge({
    data: newData
  })
  const newContentState = contentState.merge({
    blockMap: contentState.getBlockMap().set(block.getKey(), (newBlock as ContentBlock))
  })
  return EditorState.push(editorState, (newContentState as ContentState), ('change-block-data' as EditorChangeType))
}

export default updateDataOfBlock
