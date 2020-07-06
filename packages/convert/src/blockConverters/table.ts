
import groupBy from 'lodash.groupby'
import { ContentState, ContentBlock } from 'draft-js'

const convertDeprecatedTable = (contentState: ContentState, contentBlock: ContentBlock) => {
  const row = contentBlock.getData().get('row')
  let blockAfter = contentState.getBlockAfter(contentBlock.getKey())
  let blockBefore = contentState.getBlockBefore(contentBlock.getKey())
  let html = ''
  if (blockBefore && blockBefore.getType() !== 'atomic:table') {
    html += `<table>\n<tbody>\n`
  }
  if (blockBefore && blockBefore.getData().get('row') !== row) {
    html += `<tr>\n`
  }
  html += `<td>${contentBlock.getText()}</td>`
  if (
    blockAfter &&
    blockAfter.getData().get('row') !== row
  ) {
    html += `\n</tr>`
  }

  if (!blockAfter || blockAfter.getType() !== 'atomic:table') {
    html += '\n</tbody>\n</table>'
  }
  return html
}

const convertRow = (row) => {
  return row.map(cell => `<td>${cell.text}</td>`).join('\n')
}

function convertTable (contentState: ContentState, contentBlock: ContentBlock) {
  const data = contentBlock.getData()
  if (data.has('row')) return convertDeprecatedTable(contentState, contentBlock)

  const table = data.get('table')
  const rows = groupBy(table, v => v.row)

  const html = Object.values(rows).map(row => {
    return `<tr>\n${convertRow(row)}\n</tr>`
  }).join('\n')

  return `<table>\n${html}\n</table>`
}

export default convertTable
