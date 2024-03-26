import React from 'react'

import backArrowSVG from '../../assets/backArrowFinal.svg'

export default function SVGBackArrow(props: { height?: string, width?: string, className?: string }) {
  return (
    <img
      src={backArrowSVG}
      style={ {height: props.height || '200px', width: props.width || '200px'} }
      className={props.className || ''}
      alt='Flecha hacia atras'
    />
  )
}