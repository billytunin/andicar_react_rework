import React from 'react'

import UploadImageBox from './UploadImageBox'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'

import TextRowAsAdmin from './TextRowAsAdmin'
import SelectRowAsAdmin from './SelectRowAsAdmin'
import ValidatedFloatNumberField from '../../validated-number-field/ValidatedFloatNumberField'

import styles from './Producto.module.css'

export default function NewProducto(props: NewProductoProps) {
  return (
    <div className={`${styles.productoContainer} ${styles.normalCursor} nonArchivadoBackgroundColor`}>
      <UploadImageBox
        productID={props.producto.id}
        productImagen={props.producto.imagen}
        emitSavedImage={(fileName) => props.modificarNewProducto({ field: 'imagen', value: fileName, id: props.producto.id })}
      />
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
        <ValidatedFloatNumberField
          entityName='producto'
          uniqueId={props.producto.id}
          label='Precio'
          value={props.producto.precio !== undefined ? props.producto.precio : 0}
          onChange={(value) => props.modificarNewProducto({ field: 'precio', value, id: props.producto.id })}
          validationGroupName={props.validationGroupName}
        />
      </div>
      <div className={styles.lineInfo}>
        <FormControlLabel
          control={
            <Switch
              color='primary'
              checked={props.producto.redondear}
              onChange={(event) => props.modificarNewProducto({ field: 'redondear', value: event.target.checked, id: props.producto.id })}
            />
          }
          label='Redondear precio'
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
        <ValidatedFloatNumberField
          entityName='producto'
          uniqueId={props.producto.id}
          label='Ancho'
          value={props.producto.ancho}
          onChange={(value) => props.modificarNewProducto({ field: 'ancho', value, id: props.producto.id })}
          validationGroupName={props.validationGroupName}
        />
      </div>
      <div className={styles.lineInfo}>
        <ValidatedFloatNumberField
          entityName='producto'
          uniqueId={props.producto.id}
          label='Alto'
          value={props.producto.alto}
          onChange={(value) => props.modificarNewProducto({ field: 'alto', value, id: props.producto.id })}
          validationGroupName={props.validationGroupName}
        />
      </div>
      <div className={styles.lineInfo}>
        <ValidatedFloatNumberField
          entityName='producto'
          uniqueId={props.producto.id}
          label='Largo'
          value={props.producto.largo}
          onChange={(value) => props.modificarNewProducto({ field: 'largo', value, id: props.producto.id })}
          validationGroupName={props.validationGroupName}
        />
      </div>
      <div className={`${styles.lineInfo} ${styles.lastLineInfo}`}>
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
      <div className={styles.newProductoRemoverButton}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => props.removerNewProducto(props.producto.id)}
        >
          Remover
        </Button>
      </div>
    </div>
  )
}