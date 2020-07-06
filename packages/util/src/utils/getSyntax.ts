import { ContentBlock, ContentState, CharacterMetadata } from 'draft-js'
import { Syntax, Entity } from '../fixtures'

const matchesEntityType = entityType => entityType === 'CODE'

function getSyntax (block: ContentBlock, contentState: ContentState) {
  const entityKey = block.getEntityAt(0)
  if (entityKey) {
    const entity = contentState.getEntity(entityKey)
    if (entity.getType() === Entity.CODE) {
      const entityData = entity.getData()
      if (entityData[Syntax.KEY]) {
        return entityData[Syntax.KEY]
      }
    }
  }

  const data = block.getData()

  if (data.has(Syntax.KEY)) {
    return data.get(Syntax.KEY)
  }

  if (data.has(Syntax.DEPRECATED_KEY)) {
    console.warn(`block.data.${Syntax.DEPRECATED_KEY} is deprecated`)
    return data.get(Syntax.DEPRECATED_KEY)
  }

  return null
}


export default getSyntax
