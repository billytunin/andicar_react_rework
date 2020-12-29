import React from 'react'
import { cloneDeep } from 'lodash'

import CategoriaInput from './CategoriaInput'

const VALIDATION_GROUP_NAME = 'categoriasToAddRows'

interface CategoriasToAddRowsProps {
  categoriasToAdd: Array<Categoria>
  setCategoriasToAdd: (newArray: Array<Categoria>) => void
}

export default function CategoriasToAddRows(props: CategoriasToAddRowsProps) {
  const getCategoriaInputValue = (categoriaId: number) => {
    const foundCategoria = props.categoriasToAdd.find(c => c.id === categoriaId)
    return foundCategoria ? foundCategoria.titulo : ''
  }

  const handleOnChange = (categoriaId: number, value: string) => {
    const newArray: Array<Categoria> = cloneDeep(props.categoriasToAdd)

    const foundCategoriaIndex = props.categoriasToAdd.findIndex(categoriaObj => categoriaObj.id === categoriaId)
    newArray[foundCategoriaIndex].titulo = value

    props.setCategoriasToAdd(newArray)
  }

  return (
    <div>
      {props.categoriasToAdd.map(categoriaObj =>
        <CategoriaInput
          key={categoriaObj.id}
          categoriaId={categoriaObj.id}
          handleOnChange={handleOnChange}
          getCategoriaInputValue={getCategoriaInputValue}
          VALIDATION_GROUP_NAME={VALIDATION_GROUP_NAME}
        />
      )}
    </div>
  )
}