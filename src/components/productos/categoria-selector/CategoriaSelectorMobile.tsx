import React from 'react'

import styles from '../Productos.module.css'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

interface CategoriaSelectorMobileProps {
  categorias: Categoria[]
  currentCategoriaId: number
  changeCategoria: (categoriaId: number) => void
}

export default function CategoriaSelectorMobile(props: CategoriaSelectorMobileProps) {
  return (
    <div className={styles.categoriaSelectorMobile}>
    {
      props.categorias.length === 0 ? <span>Cargando...</span> :
      <TextField
        select
        value={props.currentCategoriaId}
        onChange={(event) => props.changeCategoria(parseInt(event.target.value))}
        fullWidth
      >
        <MenuItem key='todos-key' value={0}>
          Todos
        </MenuItem>
        {props.categorias.map(categoria => (
          <MenuItem key={categoria.id} value={categoria.id}>
            {categoria.titulo}
          </MenuItem>
        ))}
      </TextField>
    }
    </div>
  )
}