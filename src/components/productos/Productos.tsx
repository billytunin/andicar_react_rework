import React from 'react'

import Grid from '@material-ui/core/Grid'
import ProductosGrid from './ProductosGrid'

export function Productos() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={1}>
        <span>testing!</span>
      </Grid>
      <Grid item xs={11}>
        <ProductosGrid />
      </Grid>
    </Grid>
  )
}