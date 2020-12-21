import React from 'react'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import ProductosGridBody from './ProductosGridBody'
import PaginadorProductos from '../paginador/PaginadorProductos'
import BuscadorDeProductos from './buscador-de-productos/BuscadorDeProductos'

const useStyles = makeStyles(() =>
  createStyles({
    productosTools: {
      height: '6vh',
      backgroundColor: 'white'
    },
    productosGrid: {
      height: '82vh',
      flexGrow: 1,
      'overflow-y': 'scroll'
    }
  })
)

export default function ProductosGrid() {
  const classes = useStyles()

  return (
    <div>
      <Grid container spacing={0} className={classes.productosTools}>
        <Grid item xs>
          <PaginadorProductos />
        </Grid>
        <Grid item xs>
          <BuscadorDeProductos />
        </Grid>
      </Grid>
      <div className={classes.productosGrid}>
        <ProductosGridBody />
      </div>
    </div>
  )
}