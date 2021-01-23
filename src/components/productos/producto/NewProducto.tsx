import React from 'react'

import UploadImageButton from './UploadImageButton'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'

import TextRowAsAdmin from './TextRowAsAdmin'
import SelectRowAsAdmin from './SelectRowAsAdmin'
import FloatNumberRowAsAdmin from './FloatNumberRowAsAdmin'

import styles from './Producto.module.css'

interface NewProductoProps {
  producto: Producto
  validationGroupName: string
  modificarNewProducto: ({ value, field, id }: ModificarNewProductoArguments) => void
  agregarImagen: (file: File, productID: number) => void
  removerNewProducto: (id: number) => void
}

export default function NewProducto(props: NewProductoProps) {
  return (
    <div className={styles.productoContainer}>
      <UploadImageButton productID={props.producto.id} agregarImagen={(file) => props.agregarImagen(file, props.producto.id)} />
      <div className={styles.lineInfo}>
        <TextRowAsAdmin
          uniqueId={props.producto.id}
          label='Código'
          value={props.producto.codigo}
          onChange={(value) => props.modificarNewProducto({ field: 'codigo', value, id: props.producto.id })}
          validationGroupName={props.validationGroupName}
        />
      </div>
      <div className={styles.lineInfo}>
        <SelectRowAsAdmin
          label='Categoría'
          value={props.producto.categoriaId}
          onChange={(value) => props.modificarNewProducto({ field: 'categoriaId', value, id: props.producto.id })}
        />
      </div>
      <div className={styles.lineInfo}>
        <FloatNumberRowAsAdmin
          uniqueId={props.producto.id}
          label='Ancho'
          value={props.producto.ancho}
          onChange={(value) => props.modificarNewProducto({ field: 'ancho', value, id: props.producto.id })}
          validationGroupName={props.validationGroupName}
        />
      </div>
      <div className={styles.lineInfo}>
        <FloatNumberRowAsAdmin
          uniqueId={props.producto.id}
          label='Alto'
          value={props.producto.alto}
          onChange={(value) => props.modificarNewProducto({ field: 'alto', value, id: props.producto.id })}
          validationGroupName={props.validationGroupName}
        />
      </div>
      <div className={styles.lineInfo}>
        <FloatNumberRowAsAdmin
          uniqueId={props.producto.id}
          label='Largo'
          value={props.producto.largo}
          onChange={(value) => props.modificarNewProducto({ field: 'largo', value, id: props.producto.id })}
          validationGroupName={props.validationGroupName}
        />
      </div>
      <div className={styles.lineInfo}>
        <FormControlLabel
          control={
            <Switch
              color='primary'
              checked={!props.producto.archivado}
              onChange={(event) => props.modificarNewProducto({ field: 'archivado', value: event.target.checked, id: props.producto.id })}
            />
          }
          label={props.producto.archivado ? 'Archivado' : 'Activo'}
        />
        <FormControlLabel
          control={
            <Switch
              color='primary'
              checked={props.producto.en_oferta}
              onChange={(event) => props.modificarNewProducto({ field: 'en_oferta', value: event.target.checked, id: props.producto.id })}
            />
          }
          label='En oferta'
        />
      </div>
      <Button
        variant='contained'
        onClick={() => props.removerNewProducto(props.producto.id)}
      >
        Remover
      </Button>
    </div>
  )
}