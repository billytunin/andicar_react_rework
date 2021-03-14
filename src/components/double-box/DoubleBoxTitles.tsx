import React from 'react'

import styles from './DoubleBox.module.css'

import Grid from '@material-ui/core/Grid'

export default function DoubleBoxTitles(props: DoubleBoxTitlesProps) {
  return (
    <Grid container spacing={0} className={styles.paneTitleContainer}>
      <Grid item xs={6}>
        <span className={styles.paneTitle}>{props.leftPaneTitle}</span>
      </Grid>
      <Grid item xs={6}>
        <span className={styles.paneTitle}>{props.rightPaneTitle}</span>
      </Grid>
    </Grid>
  )
}