import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import request from '../../utils/request'

import {
  getCurrentCategoriaIdFromState,
  getCurrentCategoriasFromState,
  setCategoria,
  resetPaginacion,
  setCategorias
} from './productosSlice'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Spinner from '../spinner/Spinner'

export default function CategoriaSelector() {
  const dispatch = useDispatch()
  const currentCategoria = useSelector(getCurrentCategoriaIdFromState)
  const categorias = useSelector(getCurrentCategoriasFromState)

  const [isLoadingCategorias, setIsLoadingCategorias] = useState(true)

  useEffect(() => {
    const getCategorias = async () => {
      setIsLoadingCategorias(true)
      try {
        const resp: CategoriasBackendResponse = await request.get('/auth/getCategorias')
        dispatch(setCategorias(resp.data))
      } catch (error) {
        setIsLoadingCategorias(false)
      } finally {
        setIsLoadingCategorias(false)
      }
    }

    getCategorias()
  }, [dispatch])

  const changeCategoria = (categoria: number) => {
    dispatch(setCategoria(categoria))
    dispatch(resetPaginacion())
  }

  if (isLoadingCategorias) {
    return <Spinner />
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