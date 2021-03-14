import React from 'react'
import { useSelector } from 'react-redux'
import { getIsMobileVersion } from '../../userStateSlice'

import styles from './DoubleBox.module.css'

import Grid from '@material-ui/core/Grid'

import MobileDoubleBox from './MobileDoubleBox'
import DoubleBoxTitles from './DoubleBoxTitles'

export default function DoubleBox(props: DoubleBoxProps) {
  const isMobileVersion = useSelector(getIsMobileVersion)
  if (isMobileVersion) {
    return <MobileDoubleBox {...props} />
  }

  const doubleBoxContainerStyle = `${styles.doubleBoxContainer} ${props.titles ? styles.flatTopRightBorderRadius : ''}`
  return (
    <div>
      {props.titles ? <DoubleBoxTitles leftPaneTitle={props.titles.leftPaneTitle} rightPaneTitle={props.titles.rightPaneTitle} /> : null}
      <Grid container spacing={0} className={doubleBoxContainerStyle}>
        <Grid item xs={6} className={`${styles.doubleBoxPane} ${styles.rightBorder}`}>
          {props.leftPane}
        </Grid>
        <Grid item xs={6} className={`${styles.doubleBoxPane}`}>
          {props.rightPane}
        </Grid>
      </Grid>
    </div>
  )
}