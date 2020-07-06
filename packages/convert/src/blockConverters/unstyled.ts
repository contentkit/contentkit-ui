import { ContentState, ContentBlock } from 'draft-js'

const convertUnstyled = (contentState: ContentState, contentBlock: ContentBlock) => {
  const text = contentBlock.getText()
  if (text === '') {
    return ''
  }
  return `<p>${text}</p>`
}

export default convertUnstyled
