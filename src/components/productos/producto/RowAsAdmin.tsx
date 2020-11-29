import React from 'react'
import { useSelector } from 'react-redux'

import { getCurrentCategoriasFromState } from '../productosSlice'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

type RowAsAdminValueType = string | number

interface RowAsAdminProps {
  label: string
  type?: 'number' | 'select'
  value: RowAsAdminValueType
  onChange: (value: RowAsAdminValueType) => void
}

export default function RowAsAdmin(props: RowAsAdminProps) {
  const categorias = useSelector(getCurrentCategoriasFromState)

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (props.type === 'number') {
      const valueToEmit = parseInt(event.target.value)
      props.onChange(isNaN(valueToEmit) ? 0 : valueToEmit)
    } else {
      props.onChange(event.target.value)
    }
  }

  let textFieldToRender
  if (props.type === 'select') {
    textFieldToRender = categorias.length === 0 ?
      <p>Cargando...</p>
      :
      <TextField
        label={props.label}
        select
        value={props.value}
        onChange={handleValueChange}
        fullWidth
      >
        {categorias.map(categoria => (
          <MenuItem key={categoria.id} value={categoria.id}>
            {categoria.titulo}
          </MenuItem>
        ))}
      </TextField>
  } else {
    textFieldToRender =
      <TextField
        label={props.label}
        type={props.type === 'number' ? 'number' : undefined}
        value={props.value}
        onChange={handleValueChange}
        fullWidth
      />
  }
  return (
    <div>
      {textFieldToRender}
    </div>
  )
}