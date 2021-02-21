import React from 'react'
import styles from './FancyTitle.module.css'

export default function FancyTitle() {
  return (
    <div className={styles.container}>
      <div className={`${styles.fancyLines} ${styles.left}`}></div>
      <span className={styles.text}>Importadora de Juguetes</span>
      <div className={`${styles.fancyLines} ${styles.right}`}></div>
    </div>
  )
}