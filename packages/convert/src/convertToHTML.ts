import contentStateToHTML from './contentStateToHTML'

export function convertToHTML (editorState) {
  const contentState = editorState.getCurrentContent()
  const html = contentStateToHTML(contentState)
  return html
}

export default convertToHTML
