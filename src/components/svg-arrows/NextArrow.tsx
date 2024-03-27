import React from 'react'

import nextArrowSVG from '../../assets/nextArrowFinal.svg'

export default function SVGNextArrow(props: {
  height?: string,
  width?: string,
  className?: string,
  handleClick?: () => void
}) {
  return (
    <img
      src={nextArrowSVG}
      style={
        {
          height: props.height || '200px',
          width: props.width || '200px',
          cursor: 'pointer'
        }
      }
      className={props.className || ''}
      onClick={() => { if(props.handleClick) props.handleClick() }}
      alt='Flecha hacia adelante'
    />
  )
}