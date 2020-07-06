import React from 'react'
import clsx from 'clsx'

function Token (props) {
  const { type, children } = props
  const className = clsx('prism-token', 'token', type)
  return (
    <span className={className} children={children} />
  )
}

export default Token
