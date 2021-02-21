import React from 'react';
import styles from './AndicarSpan.module.css';

export default function AndicarSpan() {
  return (
    <span className={styles.mainSpan}>
      <span className={styles.andiColor}>Andi</span>
      <span className={styles.carColor}>car</span>
    </span>
  )
}