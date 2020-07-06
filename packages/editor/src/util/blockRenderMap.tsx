import React from 'react'
import { Map } from 'immutable'
import { Block } from '@contentkit/util'
import { DefaultDraftBlockRenderMap } from 'draft-js'

const CODE_WRAP = <pre className='cke-code-container' />
const OL_WRAP = <ol className='public-DraftStyleDefault-ul' />
const UL_WRAP = <ul className='public-DraftStyleDefault-ul' />

const customBlockRenderMap = Map({

  [Block.UNSTYLED]: {
    element: 'p'
  },
  [Block.BLOCKQUOTE]: {
    element: 'div',
    wrapper: <blockquote />
  },
  [Block.TODO]: {
    element: 'div'
  },
  [Block.IMAGE]: {
    element: 'figure'
  },
  [Block.VIDEO]: {
    element: 'figure'
  },
  [Block.CODE]: {
    element: 'div',
    wrapper: CODE_WRAP
  },
  [Block.OL]: {
    element: 'li',
    wrapper: OL_WRAP
  },
  [Block.UL]: {
    element: 'li',
    wrapper: UL_WRAP
  },
  [Block.TABLE]: {
    element: 'div'
  },
  [Block.GIST]: {
    element: 'div'
  },
  [Block.SCRIPT]: {
    element: 'div'
  }
})

export default DefaultDraftBlockRenderMap.merge(customBlockRenderMap)
