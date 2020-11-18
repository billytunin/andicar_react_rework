import React from 'react'

import Grid from '@material-ui/core/Grid'
import ProductosGrid from './ProductosGrid'
import CategoriaSelector from './CategoriaSelector'

export default function Productos() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={1}>
        <CategoriaSelector />
      </Grid>
      <Grid item xs={11}>
        <ProductosGrid />
      </Grid>
    </Grid>
  )
}