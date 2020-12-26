import React from 'react'

import styles from './EnOfertaSpan.module.css'

interface EnOfertaSpanProps {
  isOnProductosViewer?: boolean
}

export default function EnOfertaSpan(props: EnOfertaSpanProps) {
  return (
    <div className={`${styles.enOfertaContainer} ${props.isOnProductosViewer ? styles.bottom : ''}`}>
      <span>EN OFERTA</span>
    </div>
  )
}