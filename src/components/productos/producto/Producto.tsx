import React, { useState, useEffect } from 'react'
import { cloneDeep, isEqual } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { toggleProductosViewer } from '../../productos-viewer/productosViewerSlice'
import { userState } from '../../../userStateSlice'
import { toggleModal } from '../../product-config-por-usuario/productConfigPorUsuarioModalSlice'

import { PHOTOS_URL, PRODUCTS_MODIFICATIONS_VALIDATION_GROUP_NAME } from '../../../utils/constants'
import styles from './Producto.module.css'

import {
  getCategoriaById,
  getIsProductoToDelete,
  removeModifiedProducto,
  addModifiedProducto,
  addProductoToDelete,
  removeProductoToDelete
} from '../productosSlice'

import EnOfertaSpan from './EnOfertaSpan'
import RowAsClient from './RowAsClient'
import TextRowAsAdmin from './TextRowAsAdmin'
import SelectRowAsAdmin from './SelectRowAsAdmin'
import ValidatedFloatNumberField from '../../validated-number-field/ValidatedFloatNumberField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Checkbox from '@material-ui/core/Checkbox'

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
    // TODO: Cambiar esto cuando cambie "archivado" por "activo"
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
        src={PHOTOS_URL + props.producto.imagen}
        alt={`Articulo ${props.producto.codigo}`}
        onClick={
          () => dispatch(
              toggleProductosViewer({ isOpen: true, productoIndex: props.productIndex })
            )
        }
      />
      {props.producto.en_oferta ? <EnOfertaSpan /> : undefined}
      {
        isAdmin ?
          <div>
            <div className={styles.lineInfo}>
              <FormControlLabel
                control={
                  <Switch
                    color='primary'
                    checked={productoPotencialmenteModificado.entrega_inmediata}
                    onChange={(event) => modificarProducto({ field: 'entrega_inmediata', value: event.target.checked })}
                  />
                }
                label='Entrega inmediata'
              />
            </div>
          </div>
        :
        props.producto.entrega_inmediata ?
          <div className={`${styles.rowAsClient} ${styles.entregaInmediata}`}>
            <span>Entrega inmediata</span>
          </div>
        :
        undefined
      }
      <div className={styles.lineInfo}>
        {
          isAdmin ?
            <TextRowAsAdmin
              uniqueId={props.producto.id}
              label='Código'
              value={productoPotencialmenteModificado.codigo}
              onChange={(value) => modificarProducto({ field: 'codigo', value })}
              validationGroupName={PRODUCTS_MODIFICATIONS_VALIDATION_GROUP_NAME}
            />
            :
            <RowAsClient field='Código' value={props.producto.codigo} />
        }
      </div>
      <div className={styles.lineInfo}>
        {
          isAdmin ?
            <ValidatedFloatNumberField
              entityName='producto'
              uniqueId={props.producto.id}
              label='Precio'
              value={productoPotencialmenteModificado.precio !== undefined ? productoPotencialmenteModificado.precio : 0}
              onChange={(value) => modificarProducto({ field: 'precio', value })}
              validationGroupName={PRODUCTS_MODIFICATIONS_VALIDATION_GROUP_NAME}
            />
            :
            props.producto.precio ?
              <RowAsClient field='Precio' value={props.producto.precio} isPriceField />
              :
              undefined
        }
      </div>
      {
        isAdmin ?
          <div>
            <div className={styles.lineInfo}>
              <FormControlLabel
                control={
                  <Switch
                    color='primary'
                    checked={productoPotencialmenteModificado.redondear}
                    onChange={(event) => modificarProducto({ field: 'redondear', value: event.target.checked })}
                  />
                }
                label='Redondear precio'
              />
            </div>
            <div className={`${styles.lineInfo} ${styles.productConfigPorUsuarioButtonContainer}`}>
              <Button 
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => dispatch(toggleModal({ isOpen: true, productId: props.producto.id }))}
              >
                Ver configuración por usuario
              </Button>
            </div>
          </div>
          :
          undefined
      }
      <div className={styles.lineInfo}>
        {
          isAdmin ?
            <SelectRowAsAdmin
              label='Categoría'
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
            <ValidatedFloatNumberField
              entityName='producto'
              uniqueId={props.producto.id}
              label='Ancho'
              value={productoPotencialmenteModificado.ancho}
              onChange={(value) => modificarProducto({ field: 'ancho', value })}
              validationGroupName={PRODUCTS_MODIFICATIONS_VALIDATION_GROUP_NAME}
            />
            :
            null // Cuando habia ancho+alto+largo, iba esto: <RowAsClient field='Ancho' value={props.producto.ancho} />
        }
      </div>
      <div className={styles.lineInfo}>
        {
          isAdmin ?
            <ValidatedFloatNumberField
              entityName='producto'
              uniqueId={props.producto.id}
              label='Alto'
              value={productoPotencialmenteModificado.alto}
              onChange={(value) => modificarProducto({ field: 'alto', value })}
              validationGroupName={PRODUCTS_MODIFICATIONS_VALIDATION_GROUP_NAME}
            />
            :
            null // Cuando habia ancho+alto+largo, iba esto: <RowAsClient field='Alto' value={props.producto.alto} />
        }
      </div>
      <div className={`${styles.lineInfo} ${isAdmin ? styles.smallPaddingBottom : ''} ${isAdmin ? '' : styles.lastLineInfo}`}>
        {
          isAdmin ?
            <ValidatedFloatNumberField
              entityName='producto'
              uniqueId={props.producto.id}
              label='Largo'
              value={productoPotencialmenteModificado.largo}
              onChange={(value) => modificarProducto({ field: 'largo', value })}
              validationGroupName={PRODUCTS_MODIFICATIONS_VALIDATION_GROUP_NAME}
            />
            :
            null // Cuando habia ancho+alto+largo, iba esto: <RowAsClient field='Largo' value={props.producto.largo} />
        }
      </div>
      {
        isAdmin ?
          <div className={`${styles.lineInfo} ${styles.lastLineInfo} ${styles.lightGrey}`}>
            <Grid container spacing={0}>
              <Grid item xs={4}>
                <div className={`${styles.fclContainer} ${styles.lightRightBorder}`}>
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
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={`${styles.fclContainer} ${styles.lightRightBorder}`}>
                  <FormControlLabel
                    control={
                      <Switch
                        color='primary'
                        checked={productoPotencialmenteModificado.en_oferta}
                        onChange={(event) => modificarProducto({ field: 'en_oferta', value: event.target.checked })}
                      />
                    }
                    label='En oferta'
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={styles.fclContainer}>
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
              </Grid>
            </Grid>
          </div>
          :
          undefined
      }
    </div>
  )
}