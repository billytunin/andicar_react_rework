import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DEFAULT_PAGINADO } from '../../utils/constants'

import {
  getCurrentCategoriaFromState,
  setCategoria,
  setPagina,
  setPaginado
} from './productosSlice'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

export default function CategoriaSelector() {
  const dispatch = useDispatch()
  const currentCategoria = useSelector(getCurrentCategoriaFromState)

  // TODO: This should come from the BE
  const categorias = [
    {
      displayName: 'Todos',
      value: ''
    },
    {
      displayName: 'Nenes',
      value: 'nenes'
    },
    {
      displayName: 'Nenas',
      value: 'nenas'
    },
    {
      displayName: 'Otros',
      value: 'otros'
    }
  ]

  const changeCategoria = (categoria: string) => {
    dispatch(setCategoria(categoria))
    dispatch(setPagina(1))
    dispatch(setPaginado(DEFAULT_PAGINADO))
  }

  return (
    <ButtonGroup orientation="vertical">
      {categorias.map(
        categoria =>
          <Button
            key={categoria.value}
            onClick={() => changeCategoria(categoria.value)}
            variant="contained"
            color={currentCategoria === categoria.value ? 'primary' : undefined}
          >
            {categoria.displayName}
          </Button>
      )}
    </ButtonGroup>
  )
}