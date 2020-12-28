import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { getCurrentCategoriasFromState } from '../productos/productosSlice'
import ValidationInput from '../validation-input/ValidationInput'

import Spinner from '../spinner/Spinner'

const VALIDATION_GROUP_NAME = 'administrarCategoriasModal'

export default function AdministrarCategoriasModalBody(){
  const [isLoading, setIsLoading] = useState(false)
  const categorias = useSelector(getCurrentCategoriasFromState)

  return isLoading ? <Spinner /> : (
    <div>
      {categorias.map(categoriaObj =>
        <div key={categoriaObj.id}>
          <ValidationInput
            id={`${categoriaObj.id}-text-input`}
            label='Titulo'
            value={categoriaObj.titulo}
            validationGroupName={VALIDATION_GROUP_NAME}
            onChange={() => undefined}
          />
          <span>ID: {categoriaObj.id}</span>
        </div>
      )}
    </div>
  )
}