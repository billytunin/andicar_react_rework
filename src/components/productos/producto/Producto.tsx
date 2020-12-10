import React, { useState, useEffect } from 'react'
import { cloneDeep, isEqual } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { toggleProductosViewer } from '../../productos-viewer/productosViewerSlice'
import { userState } from '../../../userStateSlice'

import { CDNEdgeUrl } from '../../../utils/constants'
import styles from './Producto.module.css'

import {
  getCategoriaById,
  getIsProductoToDelete,
  removeModifiedProducto,
  addModifiedProducto,
  addProductoToDelete,
  removeProductoToDelete
} from '../productosSlice'

import RowAsClient from './RowAsClient'
import RowAsAdmin from './RowAsAdmin'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Checkbox from '@material-ui/core/Checkbox';

interface ModificarProductoArguments {
  field: string
  value: string | number | boolean
}

export default function Producto(props: ProductoProps) {
  const dispatch = useDispatch()
  const categoriaName = useSelector(getCategoriaById(props.producto.categoriaId))
  const isProductoToDelete = useSelector(getIsProductoToDelete(props.producto.id))

  const { isAdmin } = useSelector(userState)

  const [unmodifiedProducto] = useState<Producto>(cloneDeep(props.producto))
  const [productoPotencialmenteModificado, setProductoPotencialmenteModificado] = useState<Producto>(cloneDeep(props.producto))
  const [isModified, setIsModified] = useState(false)

  const modificarProducto = ({ field, value }: ModificarProductoArguments) => {
    const newValue = field === 'archivado' ? !value : value
    setProductoPotencialmenteModificado({ ...productoPotencialmenteModificado, [field]: newValue })
  }

  useEffect(() => {
    if (isEqual(productoPotencialmenteModificado, unmodifiedProducto)) {
      setIsModified(false)
      dispatch(removeModifiedProducto(unmodifiedProducto.id))
    } else {
      setIsModified(true)
      dispatch(addModifiedProducto(cloneDeep(productoPotencialmenteModificado)))
    }
  }, [productoPotencialmenteModificado, unmodifiedProducto, dispatch])

  const productoContainerClasses = [styles.productoContainer]
  if(props.producto.archivado) {
    productoContainerClasses.push('archivadoBackgroundColor')
  } else {
    productoContainerClasses.push('nonArchivadoBackgroundColor')
  }
  if(isModified) productoContainerClasses.push('isModifiedBackgroundColor')
  if(isProductoToDelete) productoContainerClasses.push('isMarkedAsDeleteBackgroundColor')

  return (
    <div className={productoContainerClasses.join(' ')}>
      <img
        src={CDNEdgeUrl + props.producto.imagen}
        alt={`Articulo ${props.producto.codigo}`}
        onClick={
          () => dispatch(
              toggleProductosViewer({ isOpen: true, productoIndex: props.productIndex })
            )
        }
      />
      <div className={styles.lineInfo}>
        {
          isAdmin ?
            <RowAsAdmin
              label='Código'
              value={productoPotencialmenteModificado.codigo}
              onChange={(value) => modificarProducto({ field: 'codigo', value })}
            />
            :
            <RowAsClient field='Código' value={props.producto.codigo} />
        }
      </div>
      <div className={styles.lineInfo}>
        {
          isAdmin ?
            <RowAsAdmin
              label='Categoría'
              type='select'
              value={productoPotencialmenteModificado.categoriaId}
              onChange={(value) => modificarProducto({ field: 'categoriaId', value })}
            />
            :
            <RowAsClient field='Categoría' value={categoriaName} />
        }
      </div>
      <div className={styles.lineInfo}>
        {
          isAdmin ?
            <RowAsAdmin
              label='Ancho'
              type='number'
              value={productoPotencialmenteModificado.ancho}
              onChange={(value) => modificarProducto({ field: 'ancho', value })}
            />
            :
            <RowAsClient field='Ancho' value={props.producto.ancho} />
        }
      </div>
      <div className={styles.lineInfo}>
        {
          isAdmin ?
            <RowAsAdmin
              label='Alto'
              type='number'
              value={productoPotencialmenteModificado.alto}
              onChange={(value) => modificarProducto({ field: 'alto', value })}
            />
            :
            <RowAsClient field='Alto' value={props.producto.alto} />
        }
      </div>
      <div className={styles.lineInfo}>
        {
          isAdmin ?
            <RowAsAdmin
              label='Largo'
              type='number'
              value={productoPotencialmenteModificado.largo}
              onChange={(value) => modificarProducto({ field: 'largo', value })}
            />
            :
            <RowAsClient field='Largo' value={props.producto.largo} />
        }
      </div>
      {
        isAdmin ?
          <div className={styles.lineInfo}>
            <FormControlLabel
              control={
                <Switch
                  color='primary'
                  checked={!productoPotencialmenteModificado.archivado}
                  onChange={(event) => modificarProducto({ field: 'archivado', value: event.target.checked })}
                />
              }
              label={productoPotencialmenteModificado.archivado ? 'Archivado' : 'Activo'}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color='secondary'
                  checked={isProductoToDelete}
                  onChange={(event) => event.target.checked ? dispatch(addProductoToDelete(props.producto.id)) : dispatch(removeProductoToDelete(props.producto.id))}
                />
              }
              label='Eliminar'
            />
          </div>
          :
          undefined
      }
    </div>
  )
}