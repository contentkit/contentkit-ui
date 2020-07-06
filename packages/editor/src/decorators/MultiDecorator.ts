import Immutable, { List } from 'immutable'
import { ContentBlock, ContentState } from 'draft-js'

const KEY_SEPARATOR = '-'

class MultiDecorator {
  decorators: List<any>
  constructor (decorators) {
    this.decorators = List(decorators)
  }

  getDecorations (block: ContentBlock, contentState: ContentState) {
    const decorations = new Array(block.getText().length).fill(null)

    this.decorators.forEach((decorator, i) => {
      const subDecorations = decorator.getDecorations(block, contentState)

      subDecorations.forEach((key: string, offset: number) => {
        if (!key) {
          return
        }

        decorations[offset] = i + KEY_SEPARATOR + key
      })
    })

    return Immutable.List(decorations)
  }

  getComponentForKey (key: string) {
    const decorator = this.getDecoratorForKey(key)
    return decorator.getComponentForKey(
      MultiDecorator.getInnerKey(key)
    )
  }

  getPropsForKey (key: string) {
    const decorator = this.getDecoratorForKey(key)
    return decorator.getPropsForKey(
      MultiDecorator.getInnerKey(key)
    )
  }

  getDecoratorForKey (key: string) {
    const parts = key.split(KEY_SEPARATOR)
    const index = Number(parts[0])
    return this.decorators.get(index)
  }

  static getInnerKey (key: string) {
    const parts = key.split(KEY_SEPARATOR)
    return parts.slice(1).join(KEY_SEPARATOR)
  }
}

export default MultiDecorator
