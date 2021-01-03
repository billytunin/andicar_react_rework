import React from 'react'
import { CDNEdgeUrl } from '../../../utils/constants'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import TextRowAsAdmin from './TextRowAsAdmin'
import SelectRowAsAdmin from './SelectRowAsAdmin'
import FloatNumberRowAsAdmin from './FloatNumberRowAsAdmin'

import styles from './Producto.module.css'

interface NewProductoProps {
  producto: NewProducto
  productIndex: number
  modificarNewProducto: ({ value, field, index }: ModificarNewProductoArguments) => void
}

const VALIDATION_GROUP_NAME = 'newProductos'

export default function NewProducto(props: NewProductoProps) {
  return (
    <div className={styles.productoContainer}>
      <img
        src={CDNEdgeUrl + 'juguete452.jpg'}
        alt={`Nuevo Articulo de indice ${props.productIndex}`}
      />
      <div className={styles.lineInfo}>
        <TextRowAsAdmin
          uniqueId={props.productIndex}
          label='Código'
          value={props.producto.codigo}
          onChange={(value) => props.modificarNewProducto({ field: 'codigo', value, index: props.productIndex })}
          validationGroupName={VALIDATION_GROUP_NAME}
        />
      </div>
      <div className={styles.lineInfo}>
        <SelectRowAsAdmin
          label='Categoría'
          value={props.producto.categoriaId}
          onChange={(value) => props.modificarNewProducto({ field: 'categoriaId', value, index: props.productIndex })}
        />
      </div>
      <div className={styles.lineInfo}>
        <FloatNumberRowAsAdmin
          uniqueId={props.productIndex}
          label='Ancho'
          value={props.producto.ancho}
          onChange={(value) => props.modificarNewProducto({ field: 'ancho', value, index: props.productIndex })}
          validationGroupName={VALIDATION_GROUP_NAME}
        />
      </div>
      <div className={styles.lineInfo}>
        <FloatNumberRowAsAdmin
          uniqueId={props.productIndex}
          label='Alto'
          value={props.producto.alto}
          onChange={(value) => props.modificarNewProducto({ field: 'alto', value, index: props.productIndex })}
          validationGroupName={VALIDATION_GROUP_NAME}
        />
      </div>
      <div className={styles.lineInfo}>
        <FloatNumberRowAsAdmin
          uniqueId={props.productIndex}
          label='Largo'
          value={props.producto.largo}
          onChange={(value) => props.modificarNewProducto({ field: 'largo', value, index: props.productIndex })}
          validationGroupName={VALIDATION_GROUP_NAME}
        />
      </div>
      <div className={styles.lineInfo}>
        <FormControlLabel
          control={
            <Switch
              color='primary'
              checked={!props.producto.archivado}
              onChange={(event) => props.modificarNewProducto({ field: 'archivado', value: event.target.checked, index: props.productIndex })}
            />
          }
          label={props.producto.archivado ? 'Archivado' : 'Activo'}
        />
        <FormControlLabel
          control={
            <Switch
              color='primary'
              checked={props.producto.en_oferta}
              onChange={(event) => props.modificarNewProducto({ field: 'en_oferta', value: event.target.checked, index: props.productIndex })}
            />
          }
          label='En oferta'
        />
      </div>
    </div>
  )
}