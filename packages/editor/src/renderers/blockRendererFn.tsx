import { ContentBlock } from 'draft-js'
import {
  blockInSelection,
  setSelectionToBlock,
  Block
} from '@contentkit/util'
import DraftImage from './components/DraftImage'
import DraftGist from './components/DraftGist'
import DraftScript from './components/DraftScript'
import DraftVideo from './components/DraftVideo'

const getEmbedProps = (block: ContentBlock, editorState, { getEditorState, setEditorState }: any) => {
  const isCollapsed = editorState.getSelection().isCollapsed()
  const isFocused = blockInSelection(editorState, block.getKey())
  return {
    getEditorState,
    isCollapsed,
    isCollapsedSelection: isCollapsed,
    isFocused,
    setFocusToBlock: () => {
      setEditorState(
        setSelectionToBlock(getEditorState(), block)
      )
    }
  }
}

function blockRendererFn (block: ContentBlock, { getEditorState, setEditorState }: any, components) {
  const blockType = block.getType()
  const editorState = getEditorState()

  if (blockType === Block.IMAGE) {
    return {
      component: components.Image,
      editable: false,
      props: getEmbedProps(block, editorState, { getEditorState, setEditorState })
    }
  }

  if (blockType === Block.VIDEO) {
    return {
      component: components.Video,
      editable: false,
      props: getEmbedProps(block, editorState, { getEditorState, setEditorState })
    }
  }

  if (blockType === Block.GIST) {
    return {
      component: components.Gist,
      editable: false,
      props: getEmbedProps(block, editorState, { getEditorState, setEditorState })
    }
  }

  if (blockType === Block.SCRIPT) {
    return {
      component: components.Script,
      editable: false,
      props: getEmbedProps(block, editorState, { getEditorState, setEditorState })
    }
  }
}


function createBlockRendererFn (decorator) {
  const Components = {
    Image: decorator(DraftImage),
    Video: decorator(DraftVideo),
    Gist: DraftGist,
    Script: DraftScript
  }

  return (block, store) => blockRendererFn(block, store, Components)
}

export default createBlockRendererFn
