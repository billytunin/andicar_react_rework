import React from 'react'

import ValidationInput from '../validation-input/ValidationInput'

import InputAdornment from '@material-ui/core/InputAdornment'

import styles from './ConfigurarCategorias.module.css'

interface CategoriaInputProps {
  handleOnChange: (categoriaId: number, value: string) => void
  getCategoriaInputValue: (categoriaId: number) => string
  categoriaId: number
  VALIDATION_GROUP_NAME: string
}

export default function CategoriaInput(props: CategoriaInputProps) {
  return (
    <div>
      <ValidationInput
        id={`${props.categoriaId}-text-input`}
        label='Titulo'
        required={true}
        maxlength={40}
        value={props.getCategoriaInputValue(props.categoriaId)}
        validationGroupName={props.VALIDATION_GROUP_NAME}
        onChange={(value) => props.handleOnChange(props.categoriaId, value)}
        customInputProps={{
          endAdornment: 
          (
            <InputAdornment position="end">
              <span className={styles.idCaption}>ID: {props.categoriaId}</span>
            </InputAdornment>
          )
        }}
      />
    </div>
  )
}