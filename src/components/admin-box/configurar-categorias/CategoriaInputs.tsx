import React from 'react'
import { cloneDeep } from 'lodash'

import Grid from '@material-ui/core/Grid'
import CategoriaInput from './CategoriaInput'

interface CategoriaInputsProps {
  categorias: Categoria[]
  modifiedCategorias: Categoria[]
  categoriasToAdd: Categoria[]
  setCategoriasToAdd: (newArray: Categoria[]) => void
  setModifiedCategorias: (newArray: Categoria[]) => void
  VALIDATION_GROUP_NAME: string
}

export default function CategoriaInputs(props: CategoriaInputsProps) {

  const handleOnChange = (categoriaId: number, value: string) => {
    let newArray: Categoria[] = cloneDeep(props.modifiedCategorias)

    if (shouldRemoveModifiedCategoria(categoriaId, value)) {
      const foundCategoriaIndex = props.modifiedCategorias.findIndex(categoriaObj => categoriaObj.id === categoriaId)
      if (foundCategoriaIndex !== -1) {
        newArray.splice(foundCategoriaIndex, 1)
      }
    } else {
      const foundCategoriaIndex = props.modifiedCategorias.findIndex(categoriaObj => categoriaObj.id === categoriaId)
      if (foundCategoriaIndex !== -1) {
        newArray[foundCategoriaIndex] = {
          titulo: value,
          id: categoriaId
        }
      } else {
        newArray.push({
          titulo: value,
          id: categoriaId
        })
      }
    }

    props.setModifiedCategorias(newArray)
  }

  const shouldRemoveModifiedCategoria = (categoriaId: number, value: string) => {
    const foundOriginalCategoriaIndex = props.categorias.findIndex(categoriaObj => categoriaObj.id === categoriaId)
    if (foundOriginalCategoriaIndex !== -1) {
      return props.categorias[foundOriginalCategoriaIndex].titulo === value
    }
  }

  const isModifiedCategoria = (categoriaId: number) => {
    const foundModifiedCategoriaIndex = props.modifiedCategorias.findIndex(categoriaObj => categoriaObj.id === categoriaId)
    return foundModifiedCategoriaIndex !== -1
  }

  const getCategoriaInputValue = (categoriaId: number) => {
    let value = ''
    if ( isModifiedCategoria(categoriaId) ) {
      const foundCategoria = props.modifiedCategorias.find(c => c.id === categoriaId)
      value = foundCategoria ? foundCategoria.titulo : ''
    } else {
      const foundCategoria = props.categorias.find(c => c.id === categoriaId)
      value = foundCategoria ? foundCategoria.titulo : ''
    }

    return value
  }

  const getNewCategoriaInputValue = (categoriaId: number) => {
    const foundCategoria = props.categoriasToAdd.find(c => c.id === categoriaId)
    return foundCategoria ? foundCategoria.titulo : ''
  }

  const handleNewCategoriaChange = (categoriaId: number, value: string) => {
    const newArray: Array<Categoria> = cloneDeep(props.categoriasToAdd)

    const foundCategoriaIndex = props.categoriasToAdd.findIndex(categoriaObj => categoriaObj.id === categoriaId)
    newArray[foundCategoriaIndex].titulo = value

    props.setCategoriasToAdd(newArray)
  }

  return (
    <Grid container>
      {
        props.categorias.map(categoriaObj =>
          <Grid item xs={3} key={categoriaObj.id}>
            <CategoriaInput
              categoriaId={categoriaObj.id}
              handleOnChange={handleOnChange}
              getCategoriaInputValue={getCategoriaInputValue}
              VALIDATION_GROUP_NAME={props.VALIDATION_GROUP_NAME}
            />
          </Grid>
        )
      }
      {
        props.categoriasToAdd.map(categoriaObj =>
          <Grid item xs={3} key={categoriaObj.id}>
            <CategoriaInput
              categoriaId={categoriaObj.id}
              handleOnChange={handleNewCategoriaChange}
              getCategoriaInputValue={getNewCategoriaInputValue}
              VALIDATION_GROUP_NAME={props.VALIDATION_GROUP_NAME}
            />
          </Grid>
        )
      }
    </Grid>
  )
}