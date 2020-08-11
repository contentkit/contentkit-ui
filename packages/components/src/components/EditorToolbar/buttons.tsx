import React from 'react'
import { Typography } from '@material-ui/core'
import {
  FormatSize,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  InsertLink,
  YouTube,
  Image as FormatImage,
  Code as InsertCode,
  Edit as CodeSyntaxIcon,
  Fullscreen,
  FullscreenExit
} from '@material-ui/icons'
import { Block, Inline } from '@contentkit/util'
import ManageUploads from '../ManageUploads'
import LinkForm from './LinkForm'
import CodeSyntaxForm from './CodeSyntaxForm'

export enum ButtonVariant {
  SUBMENU = 'submenu',

  TOGGLE_INLINE_STYLE = 'toggle_inline_style',
  TOGGLE_BLOCK_TYPE = 'toggle_block_type',
  TOGGLE_ENTITY = 'toggle_entity',

  SET_BLOCK_DATA = 'set_block_data',

  INSERT_BLOCK = 'insert_block',
  ENTER_FULLSCREEN = 'enter_fullscreen',
  EXIT_FULLSCREEN = 'exit_fullscreen'
}

export enum ButtonType {
  INLINE = 'inline',
  BLOCK = 'block',
  ACTION = 'action'
}

export type ToolbarButton = {
  type: ButtonType,
  variant: ButtonVariant,
  Icon: any,

  popover?: boolean
  blockType?: any,
  inlineStyle?: any,
  submenu?: ToolbarButton[],
  component?: any
}

export const buttons = [
  {
    type: ButtonType.INLINE,
    variant: ButtonVariant.TOGGLE_INLINE_STYLE,
    Icon: FormatBold,
    inlineStyle: Inline.BOLD
  },
  {
    type: ButtonType.INLINE,
    variant: ButtonVariant.TOGGLE_INLINE_STYLE,
    Icon: FormatItalic,
    inlineStyle: Inline.ITALIC
  },
  {
    type: ButtonType.INLINE,
    variant: ButtonVariant.TOGGLE_INLINE_STYLE,
    Icon: FormatUnderlined,
    inlineStyle: Inline.UNDERLINE
  },
  {
    popover: true,
    type: ButtonType.INLINE,
    variant: ButtonVariant.TOGGLE_ENTITY,
    Icon: InsertLink,
    component: LinkForm
  },
  {
    type: ButtonType.INLINE,
    variant: ButtonVariant.SUBMENU,
    Icon: FormatSize,
    popover: true,
    submenu: [
      {
        type: ButtonType.INLINE,
        Icon: props => (<Typography>H1</Typography>),
        variant: ButtonVariant.TOGGLE_BLOCK_TYPE,
        blockType: Block.H1
      },
      {
        type: ButtonType.INLINE,
        Icon: props => (<Typography>H2</Typography>),
        variant: ButtonVariant.TOGGLE_BLOCK_TYPE,
        blockType: Block.H2
      },
      {
        type: ButtonType.INLINE,
        Icon: props => (<Typography>H3</Typography>),
        variant: ButtonVariant.TOGGLE_BLOCK_TYPE,
        blockType: Block.H3
      },
      {
        type: ButtonType.INLINE,
        Icon: props => (<Typography>H4</Typography>),
        variant: ButtonVariant.TOGGLE_BLOCK_TYPE,
        blockType: Block.H4
      }
    ]
  },
  {
    type: ButtonType.BLOCK,
    variant: ButtonVariant.TOGGLE_BLOCK_TYPE,
    Icon: InsertCode,
    blockType: Block.CODE
  },
  {
    popover: true,
    type: ButtonType.BLOCK,
    variant: ButtonVariant.SET_BLOCK_DATA,
    Icon: CodeSyntaxIcon,
    blockType: Block.CODE,
    component: CodeSyntaxForm
  },
  {
    type: ButtonType.BLOCK,
    variant: ButtonVariant.TOGGLE_BLOCK_TYPE,
    Icon: FormatListBulleted,
    blockType: Block.UL
  },
  {
    type: ButtonType.BLOCK,
    variant: ButtonVariant.TOGGLE_BLOCK_TYPE,
    Icon: FormatListNumbered,
    blockType: Block.OL
  },
  {
    type: ButtonType.BLOCK,
    variant: ButtonVariant.TOGGLE_BLOCK_TYPE,
    Icon: FormatQuote,
    blockType: Block.BLOCKQUOTE
  },
  {
    popover: true,
    type: ButtonType.BLOCK,
    variant: ButtonVariant.INSERT_BLOCK,
    Icon: FormatImage,
    blockType: Block.IMAGE,
    component: ManageUploads
  },
  {
    popover: true,
    type: ButtonType.BLOCK,
    variant: ButtonVariant.TOGGLE_BLOCK_TYPE,
    Icon: YouTube,
    blockType: Block.VIDEO
  },
  {
    type: ButtonType.ACTION,
    Icon: Fullscreen,
    variant: ButtonVariant.ENTER_FULLSCREEN
  }
]