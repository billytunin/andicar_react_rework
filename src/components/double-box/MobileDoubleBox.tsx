import React from 'react'
import styles from './DoubleBox.module.css'

import MobileDoubleBoxTitle from './MobileDoubleBoxTitle'

import Grid from '@material-ui/core/Grid'

export default function MobileDoubleBox(props: DoubleBoxProps) {
  const doubleBoxContainerStyle = `${styles.doubleBoxContainer} ${props.titles ? styles.flatTopRightBorderRadius : ''}`

  return (
    <div>
      <Grid container spacing={0}>
        {props.titles ? <MobileDoubleBoxTitle paneTitle={props.titles.leftPaneTitle} /> : null}
        <Grid item xs={12} className={doubleBoxContainerStyle}>
          {props.leftPane}
        </Grid>
      </Grid>
      <Grid container spacing={0} className={styles.verticalSpace}>
        {props.titles ? <MobileDoubleBoxTitle paneTitle={props.titles.rightPaneTitle} /> : null}
        <Grid item xs={12} className={doubleBoxContainerStyle}>
          {props.rightPane}
        </Grid>
      </Grid>
    </div>
  )
}