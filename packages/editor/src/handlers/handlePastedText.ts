import { Map, List, Repeat } from 'immutable'
import { EditorState, ContentBlock, genKey, CharacterMetadata, EditorChangeType, ContentState, Modifier } from 'draft-js'
import { Syntax, getSyntax, insertBlocksIntoBlockMap, getCurrentBlock, Block, HANDLED, NOT_HANDLED, ChangeType } from '@contentkit/util'
import * as url from 'url'
import fromPairs from 'lodash.frompairs'

export type Attributes = {
  embed?: string,
  tag?: string,
  src?: string
}

const chars = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '\xA0': '&nbsp;',
  '"': '&quot;'
}

export function encodeContent (text: string): string {
  return Object.keys(chars).reduce((acc, key) => {
    return acc.split(key).join(chars[key])
  }, text)
}

export function decodeContent (text: string): string {
  return Object.keys(chars).reduce((acc, key) => {
    return acc.split(chars[key]).join(key)
  }, text)
}

export function getAttributes (match: any[]) {
  const [tag, name, attributes = ''] = match
  let data = attributes.split(/\s(?![\w\s]*")/g)
    .map((attrib: string) => attrib.replace(/["']/g, ''))
    .map((attrib: string) => [
      attrib.split('=')[0],
      attrib.split('=')[1] ? attrib.split('=')[1] : true
    ])
    .filter((attrib: string) => attrib[0] !== '')
  data = fromPairs(data)

  return {
    ...data,
    tag,
    name
  }
}

export function getType ({ src }: Attributes) {
  const host = url.parse(src).host

  switch (host) {
    case 'gist.github.com':
      return 'atomic:gist'
    default:
      return 'atomic:script'
  }
}

export function extractAttributesFromHtml (text: string): Attributes {
  if (!/<script/.test(text)) return
  text = decodeContent(text).trim()
  const RE = /<([^/>\s]+)\s?([^>]+)>/g
  let attributes : Attributes = { embed: undefined }
  let matchArr
  while ((matchArr = RE.exec(text)) !== null) {
    let attrib = getAttributes(matchArr)
    if (attrib.src && attrib.name === 'script') {
      attributes.tag = attrib.tag + '</script>'
      attributes.src = attrib.src
    } else if (!attributes.embed) {
      attributes.embed = text
    }
  }
  return attributes
}

const insertEmbed = (editorState: EditorState, type: string, data: any) => {
  return insertBlocksIntoBlockMap(
    editorState,
    editorState.getCurrentContent().getBlockMap(), [
      new ContentBlock({
        key: genKey(),
        type: type,
        text: ' ',
        // @ts-ignore
        characterList: List(Repeat(new CharacterMetadata(), 1)),
        depth: 0,
        data: Map(data)
      }),
      new ContentBlock({
        key: genKey(),
        type: 'unstyled',
        text: '',
        characterList: List(),
        depth: 0,
        data: Map()
      })
    ]
  )
}

function handlePastedTextForCodeBlock (block: ContentBlock, text: string, html: string, editorState: EditorState) {
  const contentState = editorState.getCurrentContent()
  const syntax = getSyntax(block, contentState)
  const indent = block.getText().match(/^\s*/m)
  const [first, ...rest] = text.split('\n')
  const lines = [first].concat(rest.map(text => `${indent}${text}`))

  const fragmentBlockMap = ContentState.createFromBlockArray(
    lines.map(text => new ContentBlock({
      key: genKey(),
      type: Block.CODE,
      text: text,
      characterList: List(Repeat(new CharacterMetadata(), text.length)),
      data: Map([[Syntax.KEY, syntax]])
    }))
  ).getBlockMap()

  return EditorState.push(
    editorState,
    Modifier.replaceWithFragment(
      contentState,
      editorState.getSelection(),
      fragmentBlockMap
    ),
    (ChangeType.INSERT_FRAGMENT as EditorChangeType)
  )
}


function handlePastedText (text: string, html: string, editorState: EditorState, { getEditorState, setEditorState, setEditorStateIfNeeded }) {
  const attributes = extractAttributesFromHtml(text)

  if (attributes) {
    const type = getType(attributes)
    const newEditorState = insertEmbed(editorState, type, attributes)
    setEditorState(
      EditorState.forceSelection(
        newEditorState,
        newEditorState.getCurrentContent().getSelectionAfter()
      )
    )
    return HANDLED
  }

  const block = getCurrentBlock(editorState)

  if (block.getType() === Block.CODE) {
    return handlePastedTextForCodeBlock(block, text, html, editorState)
  }

  return NOT_HANDLED
}

export default handlePastedText
