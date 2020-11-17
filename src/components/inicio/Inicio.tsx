import React from 'react'

import FancyTitle from './FancyTitle'
import Slider from './slider/Slider'

import logo from '../../assets/logo.png'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: 'center'
    },
    subtitle: {
      fontSize: '1.5rem'
    }
  })
)

export function Inicio() {
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
      </Grid>
    </div>
  )
}