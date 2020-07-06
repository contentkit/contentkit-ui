import { ContentState, ContentBlock } from 'draft-js'

function convertGist (contentState: ContentState, contentBlock: ContentBlock) {
  const data = contentBlock.getData()
  let str = data.get('tag')
  return str.endsWith('</script>') ? str : `${str}</script>`
}

export default convertGist
