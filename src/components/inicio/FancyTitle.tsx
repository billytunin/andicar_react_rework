import React from 'react'
import styles from './FancyTitle.module.css'
import './FancyLines.css'

interface FancyTitleProps {
  text: string
}

export default function FancyTitle(props: FancyTitleProps) {
  return (
    <div className={styles.container}>
      <div className='fancyLines left'></div>
      <span className={styles.text}>{props.text}</span>
      <div className='fancyLines right'></div>
    </div>
  )
}