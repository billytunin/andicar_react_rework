import React, { useState, useEffect } from 'react'

import styles from './DoubleBox.module.css'

import Slide from '@material-ui/core/Slide';

export default function FancyDoubleBox(props: DoubleBoxProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div>
      <Slide
        direction='right'
        in={isMounted}
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
        in={isMounted}
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