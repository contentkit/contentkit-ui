import { ContentState } from 'draft-js'
import { Iterable } from 'immutable'

function getBlockMapKeys (contentState: ContentState, startKey: string, endKey: string): Iterable<number, string> {
  const blockMapKeys = contentState.getBlockMap().keySeq()
  return blockMapKeys
    .skipUntil((key) => key === startKey)
    .takeUntil((key) => key === endKey)
    .concat([endKey])
}

export default getBlockMapKeys
