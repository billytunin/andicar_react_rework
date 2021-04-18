import React from 'react'
import { useSelector } from 'react-redux'

import styles from './DoubleBox.module.css'
import { getInitialCheckState } from '../../userStateSlice'

import Slide from '@material-ui/core/Slide';

export default function FancyDoubleBox(props: DoubleBoxProps) {
  const initialCheck = useSelector(getInitialCheckState)

  return (
    <div>
      <Slide
        direction='right'
        in={initialCheck}
        mountOnEnter
        unmountOnExit
        timeout={1000}
      >
        <div className={`${styles.fancyBox} ${styles.fancyBoxOne}`}>
          <div className={`${styles.paneTitleContainer} textAlignLeft`}>
            <span className={`commonBackground ${styles.paneTitle} ${styles.leftFancyPaneTitle}`}>
              {props.titles?.leftPaneTitle}
            </span>
          </div>
          <div className={`commonBackground ${styles.fancyBoxContainer}`}>
            {props.leftPane}
          </div>
        </div>
      </Slide>
      <Slide
        direction='left'
        in={initialCheck}
        mountOnEnter
        unmountOnExit
        timeout={1000}
      >
        <div className={`${styles.fancyBox} ${styles.fancyBoxTwo}`}>
          <div className={styles.paneTitleContainer}>
            <span className={`commonBackground ${styles.paneTitle}`}>
              {props.titles?.rightPaneTitle}
            </span>
          </div>
          <div className={`commonBackground ${styles.fancyBoxContainer}`}>
            {props.rightPane}
          </div>
        </div>
      </Slide>
    </div>
  )
}