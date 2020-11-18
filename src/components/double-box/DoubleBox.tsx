import React from 'react'
import styles from './DoubleBox.module.css'

import Grid from '@material-ui/core/Grid'

interface DoubleBoxProps {
  leftPane: JSX.Element,
  rightPane: JSX.Element,
  rightPaneHasBorder?: boolean
}

export default function DoubleBox(props: DoubleBoxProps) {
  return (
    <Grid container spacing={0} className={styles.doubleBoxContainer}>
      <Grid item xs={6} className={`${styles.doubleBoxPane} ${props.rightPaneHasBorder ? '' : styles.rightBorder}`}>
        {props.leftPane}
      </Grid>
      <Grid item xs={6} className={`${styles.doubleBoxPane} ${props.rightPaneHasBorder ? styles.leftBorder : ''}`}>
        {props.rightPane}
      </Grid>
    </Grid>
  )
}