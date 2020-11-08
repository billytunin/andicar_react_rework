import React from 'react';
import styles from './AndicarSpan.module.css';

export function AndicarSpan() {
  return (
    <span>
      <span className={styles.andiColor}>Andi</span>
      <span className={styles.carColor}>car</span>
    </span>
  )
}