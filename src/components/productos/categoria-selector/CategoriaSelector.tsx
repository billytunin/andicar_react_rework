import { cloneDeep } from 'lodash'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from './CategoriaSelector.module.css'

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

  const [sortedCategorias, setSortedCategorias] = useState<Categoria[]>([])

  useEffect(() => {
    const clonedCategorias = cloneDeep(categorias)
    setSortedCategorias(
      clonedCategorias.sort(sortCategoriasFunction)
    )
  }, [categorias])

  const changeCategoria = (categoria: number) => {
    dispatch(setCategoria(categoria))
    dispatch(resetPaginacion())
  }

  const sortCategoriasFunction = (a: Categoria, b: Categoria) => {
    if (a.titulo.toLowerCase() > b.titulo.toLowerCase()) {
      return 1
    }
    if (b.titulo.toLowerCase() > a.titulo.toLowerCase()) {
      return -1
    }
    return 0
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
      <div className={styles.bottomBorder}>
        <CategoriaSelectorButton
          onClick={() => changeCategoria(0)}
          isActive={!currentCategoria}
        >
          Todos
        </CategoriaSelectorButton>
      </div>
      {sortedCategorias.map(
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