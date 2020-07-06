
import Prism from 'prismjs'
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
import { Block, getSyntax } from '@contentkit/util'


const convertCode = (contentState, contentBlock) => {
  const blockKey = contentBlock.getKey()

  const data = contentBlock.getData()
  const text = contentBlock.getText()
  const syntax = getSyntax(contentBlock, contentState)
  const hasSyntax = Boolean(syntax)
  const blockBefore = contentState.getBlockBefore(blockKey)
  const blockAfter = contentState.getBlockAfter(blockKey)
  const blockMap = contentState.getBlockMap()

  let html = ''

  if (
    (blockBefore && blockBefore.getType() !== Block.CODE) ||
    contentState.getFirstBlock().getKey() === blockKey ||
    (blockBefore.getType() !== Block.CODE && blockAfter.getType() !== Block.CODE)
  ) {
    const blocks = blockMap.toSeq()
      .skipUntil(v => v.getKey() === blockKey)
      .takeUntil(v => v.getType() !== Block.CODE)

    const properties = hasSyntax
      ? ` class="language-${syntax}"`
      : ''
    html += `<pre><code${properties}>`
    const text = blocks.map(v => v.getText()).join('\n')
    html += hasSyntax
      ? Prism.highlight(text, Prism.languages[syntax], syntax)
      : text
    html += `</code></pre>`
    return html
  }

  return ''
}

export default convertCode
