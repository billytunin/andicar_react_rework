import React from 'react'

import backArrowSVG from '../../assets/backArrowFinal.svg'

export default function SVGBackArrow(props: {
  height?: string,
  width?: string,
  className?: string,
  handleClick?: () => void
}) {
  return (
    <img
      src={backArrowSVG}
      style={
        {
          height: props.height || '200px',
          width: props.width || '200px',
          cursor: 'pointer'
        }
      }
      className={props.className || ''}
      onClick={() => { if(props.handleClick) props.handleClick() }}
      alt='Flecha hacia atras'
    />
  )
}