import React from 'react'
import decorateComponentWithProps from 'decorate-component-with-props'
import { RichUtils, EditorState, ContentBlock, ContentState, CharacterMetadata, EntityInstance } from 'draft-js'

const DefaultLink = ({
  children,
  className,
  entityKey,
  getEditorState,
  target
}) => {
  const entity = getEditorState().getCurrentContent().getEntity(entityKey)
  const entityData = entity ? entity.get('data') : undefined
  const href = (entityData && entityData.url) || undefined

  return (
    <a
      className={className}
      title={href}
      href={href}
      target={target}
      rel='noopener noreferrer'
    >
      {children}
    </a>
  )
}

const matchesEntityType = (type: string) => type === 'LINK'

function linkStrategy (contentBlock: ContentBlock, cb, contentState: ContentState) {
  if (!contentState) return
  contentBlock.findEntityRanges((character: CharacterMetadata) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      matchesEntityType(contentState.getEntity(entityKey).getType())
    )
  }, cb)
}

export default {
  strategy: linkStrategy,
  matchesEntityType,
  component: decorateComponentWithProps(DefaultLink, {
    className: 'link',
    target: null
  })
}
