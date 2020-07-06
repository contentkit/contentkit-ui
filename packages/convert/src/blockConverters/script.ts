import { ContentState, ContentBlock } from 'draft-js'

function convertScript (contentState: ContentState, contentBlock: ContentBlock) {
  const data = contentBlock.getData()
  if (data.get('embed')) {
    return data.get('embed')
  }
  let tag = data.get('tag')
  return tag.endsWith('</script>') ? tag : `${tag}</script>`
}

export default convertScript
