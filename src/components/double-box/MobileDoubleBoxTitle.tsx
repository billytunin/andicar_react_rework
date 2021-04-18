import React from 'react'

import styles from './DoubleBox.module.css'

export default function DoubleBoxTitles(props: MobileDoubleBoxTitleProps) {
  return (
    <div className={styles.paneTitleContainer}>
      <span className={`commonBackground ${styles.paneTitle}`}>{props.paneTitle}</span>
    </div>
  )
}