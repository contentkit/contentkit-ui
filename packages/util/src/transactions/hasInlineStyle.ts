import { EditorState, BlockMap, ContentBlock } from 'draft-js'

function hasInlineStyle (
  editorState: EditorState,
  style: string,
  blockMap: BlockMap
): ContentBlock {

  return (blockMap || editorState.getCurrentContent().getBlockMap())
    .toSeq()
    .find((block: ContentBlock) => Boolean(
      block.getCharacterList().toSeq()
        .find(char => char.hasStyle(style)))
    )
}

export default hasInlineStyle
