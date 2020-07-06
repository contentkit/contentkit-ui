
import { ContentState, ContentBlock } from 'draft-js'

const convertToImage = (contentState: ContentState, contentBlock: ContentBlock) => {
  const data = contentBlock.getData()
  const src = data.get('src') || data.get('href') || data.get('url')
  if (!src) return ''
  return `<img src="${src}" />`
}

export default convertToImage
