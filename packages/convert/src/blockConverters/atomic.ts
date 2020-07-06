import { ContentState, ContentBlock } from 'draft-js'

function convertAtomic (contentState: ContentState, contentBlock: ContentBlock) {
  const entityKey = contentBlock.getEntityAt(0)
  if (entityKey) {
    const entity = contentState.getEntity(entityKey)
    const data = entity.getData()
    if (data.tag) {
      return `${data.tag}${data.embed}`
    }
  }
  return undefined
}

export default convertAtomic

