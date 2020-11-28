import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DEFAULT_PAGINADO } from '../../utils/constants'

import {
  getProductosStatusFilter,
  setProductosStatusFilter,
  setPagina,
  setPaginado
} from './productosSlice'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import styles from './AdminTools.module.css'

export default function AdminTools() {
  const dispatch = useDispatch()
  const productosStatusFilter = useSelector(getProductosStatusFilter)

  const handleProductosStatusFilterChange = (newValue: productosStatusFilter) => {
    if (
      productosStatusFilter === 'both' ||
      (newValue === null && productosStatusFilter === 'archivados') ||
      (newValue === 'archivados' && productosStatusFilter === null)
    ) {
      dispatch(setProductosStatusFilter(newValue))
    } else {
      dispatch(setProductosStatusFilter('both'))
    }

    dispatch(setPagina(1))
    dispatch(setPaginado(DEFAULT_PAGINADO))
  }

  return (
    <div>
      <span className='displayBlock'>ADMINISTRADOR</span>
      <span className='displayBlock'>Leyenda:</span>
      <Grid container spacing={0} alignItems='center' justify='center'>
        <Grid item xs>
          <div className={`${styles.leyendaBox} nonArchivadoBackgroundColor`}></div>
        </Grid>
        <Grid item xs>
          <div className='textAlignCenter'>
            Activo
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={0} alignItems='center' justify='center'>
        <Grid item xs>
          <div className={`${styles.leyendaBox} archivadoBackgroundColor`}></div>
        </Grid>
        <Grid item xs>
          <div className='textAlignCenter'>
            Archivado
          </div>
        </Grid>
      </Grid>
      <span className='displayBlock'>Ver solo:</span>
      <ButtonGroup>
        <Button
          variant='contained'
          color={productosStatusFilter === null ? 'primary' : undefined}
          onClick={() => handleProductosStatusFilterChange(null)}
        >
          Activos
        </Button>
        <Button
          variant='contained'
          color={productosStatusFilter === 'archivados' ? 'primary' : undefined}
          onClick={() => handleProductosStatusFilterChange('archivados')}
        >
          Archivados
        </Button>
      </ButtonGroup>
    </div>
  )
}