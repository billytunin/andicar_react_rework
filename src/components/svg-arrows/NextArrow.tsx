import React from 'react'

import nextArrowSVG from '../../assets/nextArrowFinal.svg'

export default function SVGNextArrow(props: { height?: string, width?: string, className?: string }) {
  return (
    <img
      src={nextArrowSVG}
      style={ {height: props.height || '200px', width: props.width || '200px'} }
      className={props.className || ''}
      alt='Flecha hacia adelante'
    />
  )
}