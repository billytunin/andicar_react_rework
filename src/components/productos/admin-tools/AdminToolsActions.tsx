import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import request from '../../../utils/request'

import { getModifiedProductos, setModificarProductosLoading } from '../productosSlice'
import { openToast } from '../../toast-alert/toastAlertSlice'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import SaveIcon from '@material-ui/icons/Save'
import AddIcon from '@material-ui/icons/Add'

export default function AdminToolsActions() {
  const dispatch = useDispatch()
  const modifiedProductos = useSelector(getModifiedProductos)

  const handleGuardarCambios = async () => {
    try {
      dispatch(setModificarProductosLoading(true))
      await request.post('/auth/modificarProductos', { productos: modifiedProductos })
      dispatch(openToast({ severity: 'success', text: 'Productos modificados con éxito' }))
    } catch(error) {
      dispatch(openToast({ severity: 'error', text: 'Hubo un error al intentar modificar los productos' }))
      console.log('There was an error at handleGuardarCambios:')
      console.log(error)
    } finally {
      dispatch(setModificarProductosLoading(false))
    }
  }

  return (
    <div>
      <p>Acciones:</p>
      <ButtonGroup orientation='vertical'>
        <Button
          variant='contained'
          color='primary'
          startIcon={<SaveIcon />}
          disabled={modifiedProductos.length === 0}
          onClick={handleGuardarCambios}
        >
          Guardar cambios
        </Button>
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon />}
        >
          Agregar productos
        </Button>
      </ButtonGroup>
    </div>
  )
}