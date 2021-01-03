import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getCurrentCategoriaIdFromState,
  getCurrentCategoriasFromState,
  setCategoria,
  resetPaginacion
} from './productosSlice'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

export default function CategoriaSelector() {
  const dispatch = useDispatch()
  const currentCategoria = useSelector(getCurrentCategoriaIdFromState)
  const categorias = useSelector(getCurrentCategoriasFromState)

  const changeCategoria = (categoria: number) => {
    dispatch(setCategoria(categoria))
    dispatch(resetPaginacion())
  }

  return (
    <ButtonGroup orientation="vertical">
      <Button
        onClick={() => changeCategoria(0)}
        variant="contained"
        color={!currentCategoria ? 'primary' : undefined}
      >
        Todos
      </Button>
      {categorias.map(
        categoria =>
          <Button
            key={categoria.id}
            onClick={() => changeCategoria(categoria.id)}
            variant="contained"
            color={currentCategoria === categoria.id ? 'primary' : undefined}
          >
            {categoria.titulo}
          </Button>
      )}
    </ButtonGroup>
  )
}