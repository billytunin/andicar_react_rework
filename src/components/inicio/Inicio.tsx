import React from 'react'

import FancyTitle from './FancyTitle'
import Slider from './slider/Slider'
import DoubleBox from '../double-box/DoubleBox'

// Cree estos PaneText simplemente para no tener que lidiar con todo el texto enorme en este mismo componente
import LeftPaneText from './LeftPaneText'
import RightPaneText from './RightPaneText'

import logo from '../../assets/logo.png'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      textAlign: 'center',
      '& .paneText': {
        textAlign: 'left',
        'line-height': 1.5,
        'margin-top': 0,
        '& .highlight': {
          color: 'rgba(185, 10, 10, 0.85)'
        }
      }
    },
    subtitle: {
      fontSize: '1.5rem'
    }
  })
)

export default function Inicio() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <img src={logo} alt='logo' />
        </Grid>
        <Grid item xs={12}>
          <FancyTitle text='Importadora de Juguetes' />
        </Grid>
        <Grid item xs={12}>
          <h3 className={classes.subtitle}>30 años</h3>
        </Grid>
        <Grid item xs={12}>
          <Slider />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <span>¿Quienes somos?</span>
            </Grid>
            <Grid item xs={6}>
              <span>El sitio web</span>
            </Grid>
            <Grid item xs={12}>
              <DoubleBox
                leftPane={<LeftPaneText />}
                rightPane={<RightPaneText />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}