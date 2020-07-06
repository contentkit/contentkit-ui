
import { ContentState, ContentBlock } from 'draft-js'

const convertVideo = (contentState: ContentState, contentBlock: ContentBlock) => {
  const src = contentBlock.getData().get('src')

  return `<video controls="true" preload="auto" width="640" height="360" loop="false" src="${src}"></video>`
}

export default convertVideo
