import React from 'react'
import { useSelector } from 'react-redux'

import { getCurrentCategoriasFromState } from '../productosSlice'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

interface SelectRowAsAdminProps {
  label: string
  value: number
  onChange: (value: number) => void
}

export default function SelectRowAsAdmin(props: SelectRowAsAdminProps) {
  const categorias = useSelector(getCurrentCategoriasFromState)

  return (
    categorias.length === 0 ? <p>Cargando...</p> :
      <TextField
        label={props.label}
        select
        value={props.value}
        onChange={(event) => props.onChange(parseInt(event.target.value))}
        fullWidth
      >
        {categorias.map(categoria => (
          <MenuItem key={categoria.id} value={categoria.id}>
            {categoria.titulo}
          </MenuItem>
        ))}
      </TextField>
  )
}