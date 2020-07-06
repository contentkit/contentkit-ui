import React from 'react'
import Immutable from 'immutable'
import { Block, getSyntax } from '@contentkit/util'
import Prism from 'prismjs'
import { ContentBlock, ContentState } from 'draft-js'
import clsx from 'clsx'
import Token from './components/Token'

import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-scala'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-perl'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-sass'
import 'prismjs/components/prism-graphql'

class PrismDecorator {
  highlighted: { [key: string]: any }
  blockType: Block
  syntax?: string

  constructor (options: any = {}) {
    this.highlighted = {}
    this.syntax = options.syntax || null
    this.blockType = options.blockType || Block.CODE
  }

  getComponentForKey (key: string) {
    return Token
  }

  getPropsForKey = function (key: string) {
    const token = this.highlighted[key]
    return {
      type: token.type,
      length: token.length
    }
  }

  getDecorations (block: ContentBlock, contentState: ContentState) {
    const blockKey = block.getKey()
    const blockText = block.getText()
    const decorations = Array(blockText.length).fill(null)

    if (block.getType() !== this.blockType) {
      return Immutable.List(decorations)
    }

    const syntax = this.syntax || getSyntax(block, contentState)
    // Allow for no syntax highlighting
    if (!syntax) {
      return Immutable.List(decorations)
    }

    // Parse text using Prism
    const grammar = Prism.languages[syntax]
    const tokens = Prism.tokenize(blockText, grammar)
      // @ts-ignore
      .flatMap(tok =>
        Array.isArray(tok.content)
          ? tok.content.map(content => ({ ...tok, content, length: content.length }))
          : tok
      )

    let offset = 0
    let index = 0
    let tokCount = 0
    while (index < tokens.length) {
      let token = tokens[index]
      index++
      if (typeof token !== 'string') {
        const key = `${blockKey}-${tokCount++}`
        this.highlighted[key] = token
        Array.from({ length: token.length }).forEach((_, k) => {
          decorations[offset + k] = key
        })
      }
      offset += token.length
    }

    return Immutable.List(decorations)
  }
}

export default PrismDecorator
