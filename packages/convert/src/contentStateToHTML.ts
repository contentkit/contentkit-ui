import stateToHtml from 'draft-js-export-html/lib/stateToHTML'
import pick from 'lodash.pick'
import { ContentState, ContentBlock, Entity as DraftEntity } from 'draft-js'
import { Block, Entity } from '@contentkit/util'
import * as blockConverters from './blockConverters'

type DraftEntityWithRecord = DraftEntity & {
  getData: () => any,
  getType: () => string
}

const HTML_ATTRIBUTES = require('html-element-attributes')

const BLOCK_CONVERTERS = {
  table: Block.TABLE,
  code: Block.CODE,
  video: Block.VIDEO,
  gist: Block.GIST,
  script: Block.SCRIPT,
  image: Block.IMAGE,
  atomic: Block.ATOMIC,
  unstyled: Block.UNSTYLED
}

const createBlockRenderers = (contentState: ContentState) => {
  return Object.keys(BLOCK_CONVERTERS).reduce((a, c) => {
    const blockType = BLOCK_CONVERTERS[c]
    a[blockType] = (contentBlock: ContentBlock) => blockConverters[c](contentState, contentBlock)
    return a
  }, {})
}

const createEntityStyleFn = (contentState: ContentState) => (entity: DraftEntityWithRecord) => {
  const type = entity.getType()
  switch (type) {
    case Entity.IMAGE:
      return {
        attributes: pick(entity.getData(), HTML_ATTRIBUTES.img),
        element: 'img'
      }
    case Entity.LINK:
      const { src, href, url } = entity.getData()
      return {
        attributes: {
          href: href || url || src
        },
        element: 'a'
      }
    default:
      return null
  }
}

function contentStateToHTML (contentState: ContentState) {
  const html = stateToHtml(
    contentState, {
      blockRenderers: createBlockRenderers(contentState),
      entityStyleFn: createEntityStyleFn(contentState)
    })

  return html.replace(/\n{2,}/g, '\n')
}

export default contentStateToHTML
