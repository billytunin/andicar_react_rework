import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getIsMobileVersion } from '../../../userStateSlice'

import {
  getCurrentCategoriaIdFromState,
  getCurrentCategoriasFromState,
  setCategoria,
  resetPaginacion
} from './../productosSlice'

import CategoriaSelectorButton from './CategoriaSelectorButton'
import CategoriaSelectorMobile from './CategoriaSelectorMobile'

export default function CategoriaSelector() {
  const dispatch = useDispatch()
  const isMobileVersion = useSelector(getIsMobileVersion)
  const currentCategoria = useSelector(getCurrentCategoriaIdFromState)
  const categorias = useSelector(getCurrentCategoriasFromState)

  const changeCategoria = (categoria: number) => {
    dispatch(setCategoria(categoria))
    dispatch(resetPaginacion())
  }

  if (isMobileVersion) {
    return (
      <CategoriaSelectorMobile
        categorias={categorias}
        currentCategoriaId={currentCategoria}
        changeCategoria={changeCategoria}
      />
    )
  }

  return (
    <div>
      <div>
        <CategoriaSelectorButton
          onClick={() => changeCategoria(0)}
          isActive={!currentCategoria}
        >
          Todos
        </CategoriaSelectorButton>
      </div>
      {categorias.map(
        categoria =>
          <div key={categoria.id}>
            <CategoriaSelectorButton
              onClick={() => changeCategoria(categoria.id)}
              isActive={currentCategoria === categoria.id}
            >
              {categoria.titulo}
            </CategoriaSelectorButton>
          </div>
      )}
    </div>
  )
}