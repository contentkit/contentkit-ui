import { BlockMap } from 'draft-js'

const transform = (key: string, blocks: BlockMap, func: any) => {
  if (!key) return

  const block = blocks.get(key)

  if (!block) return

  blocks.set(key, func(block))
}

export default transform
