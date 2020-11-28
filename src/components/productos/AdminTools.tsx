import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DEFAULT_PAGINADO } from '../../utils/constants'

import {
  getArchivadosFilter,
  setArchivadosFilter,
  setPagina,
  setPaginado
} from './productosSlice'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import styles from './AdminTools.module.css'

export default function AdminTools() {
  const dispatch = useDispatch()
  const archivadosFilter = useSelector(getArchivadosFilter)

  const handleArchivadosFilterChange = (newValue: archivadosFilter) => {
    if (
      archivadosFilter === null ||
      (newValue === 0 && archivadosFilter === 1) ||
      (newValue === 1 && archivadosFilter === 0)
    ) {
      dispatch(setArchivadosFilter(newValue))
    } else {
      dispatch(setArchivadosFilter(null))
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
          color={archivadosFilter === 0 ? 'primary' : undefined}
          onClick={() => handleArchivadosFilterChange(0)}
        >
          Activos
        </Button>
        <Button
          variant='contained'
          color={archivadosFilter === 1 ? 'primary' : undefined}
          onClick={() => handleArchivadosFilterChange(1)}
        >
          Archivados
        </Button>
      </ButtonGroup>
    </div>
  )
}