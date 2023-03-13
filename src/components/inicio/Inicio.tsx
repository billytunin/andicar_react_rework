import React from 'react'
import { useSelector } from 'react-redux'

import { getIsMobileVersion } from '../../userStateSlice'

import styles from './Inicio.module.css'

import FancyTitle from './FancyTitle'
import FancyTitleMobile from './FancyTitleMobile'
import Slider from './slider/Slider'
import DoubleBox from '../double-box/DoubleBox'

// Cree estos PaneText simplemente para no tener que lidiar con todo el texto enorme en este mismo componente
import LeftPaneText from './LeftPaneText'
import RightPaneText from './RightPaneText'

import Grid from '@material-ui/core/Grid'

export default function Inicio() {
  const isMobileVersion = useSelector(getIsMobileVersion)

  return (
    <div className={styles.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} className={styles.paddingTop}>
          {
            isMobileVersion ?
              <FancyTitleMobile />
              :
              <FancyTitle />
          }
        </Grid>
        <Grid item xs={12}>
          <span className={styles.subtitle}>Desde 1990</span>
        </Grid>
        <Grid item xs={12} className={styles.paddingTop}>
          <Slider />
        </Grid>
        <Grid item xs={12} className={`${styles.paddingTop} ${styles.padSides} ${styles.padBottom}`}>
          <DoubleBox
            isFancy={true}
            leftPane={<LeftPaneText />}
            rightPane={<RightPaneText />}
            titles={{ leftPaneTitle: '¿Quienes somos?', rightPaneTitle: 'El sitio web' }}
          />
        </Grid>
      </Grid>
    </div>
  )
}