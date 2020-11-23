import React, { useState, useEffect } from 'react'
import ValidationInput from '../validation-input/ValidationInput'
import Spinner from '../spinner/Spinner'
import request from '../../utils/request'
import { useSelector, useDispatch } from 'react-redux'

import { openToast } from '../toast-alert/toastAlertSlice'

import {
  validationGroupHasErrors,
  setValidationGroupDirtyState,
  shakeInvalids
} from '../validation-input/validationInputsSlice'

import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'
import Alert from '@material-ui/lab/Alert'

const VALIDATION_GROUP_NAME = 'newCredentialsForm'

export default function CredentialsConfig() {
  const dispatch = useDispatch()
  const initialState = {
    user: '',
    pass: ''
  }
  const [newCredentialsData, setNewCredentialsData] = useState(initialState)
  const [currentCredentials, setCurrentCredentials] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCurrentCredentials, setIsLoadingCurrentCredentials] = useState(false)
  const formHasErrors = useSelector(validationGroupHasErrors(VALIDATION_GROUP_NAME))

  const handleNewCredentialsDataChange = (field: string, value: string) => {
    setNewCredentialsData({ ...newCredentialsData, [field]: value })
  }

  const aplicarNuevasCredenciales = async () => {
    dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: true }))
    if (formHasErrors) {
      dispatch(shakeInvalids(VALIDATION_GROUP_NAME))
    } else {
      setIsLoading(true)
      try {
        await request.post('/auth/changeCustomerCredentials', {
          user: newCredentialsData.user,
          pass: newCredentialsData.pass
        })
        dispatch(openToast({ severity: 'success', text: 'Credenciales cambiadas con éxito' }))
        dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: false }))
        setNewCredentialsData(initialState)
      } catch(error) {
        dispatch(openToast({ severity: 'error', text: 'Hubo un problema al intentar cambiar las credenciales. Por favor intente nuevamente' }))
      } finally {
        setIsLoading(false)
        getCurrentCredentials()
      }
    }
  }

  const getCurrentCredentials = async () => {
    setIsLoadingCurrentCredentials(true)
    try {
      const resp: GetCustomerCredentialsBackendResponse = await request.get('/auth/getCustomerCredentials')
      setCurrentCredentials({ user: resp.data.user, pass: resp.data.pass })
    } catch(error) {
      console.log('No se pudieron cargar las credenciales actuales del usuario cliente')
    } finally {
      setIsLoadingCurrentCredentials(false)
    }
  }

  useEffect(() => {
    getCurrentCredentials()
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <Alert severity='info'>
        Configure las credenciales (usuario y contraseña) que desee sean usadas para iniciar sesión como cliente en el sitio.<br />
        Tenga en cuenta que las sesiones expiran luego de 3 días. Por lo tanto, si usted cambia las credenciales, los clientes que ya estaban logueados aún tendrán su sesión
        activa hasta que expire para ellos. Recién ahi, se les pedirá iniciar sesión nuevamente y deberán utilizar las nuevas credenciales.
      </Alert>
      <ValidationInput
        id="user"
        value={newCredentialsData.user}
        validationGroupName={VALIDATION_GROUP_NAME}
        required
        maxlength={25}
        label="Usuario"
        icon={<AccountCircle />}
        fullWidth
        onChange={(value) => handleNewCredentialsDataChange('user', value)}
      />
      <ValidationInput
        id="pass"
        value={newCredentialsData.pass}
        validationGroupName={VALIDATION_GROUP_NAME}
        required
        maxlength={25}
        label="Contraseña"
        icon={<LockIcon />}
        fullWidth
        onChange={(value) => handleNewCredentialsDataChange('pass', value)}
      />
      <Button
        onClick={aplicarNuevasCredenciales}
        variant="contained"
        color="primary"
      >
        Aplicar nuevas credenciales
      </Button>
      <div>
        <span>Credenciales actuales:</span>
        <span>Usuario:</span>
        <span>{isLoadingCurrentCredentials ? '(...)' : currentCredentials.user}</span>
        <span>Contraseña:</span>
        <span>{isLoadingCurrentCredentials ? '(...)' : currentCredentials.pass}</span>
      </div>
    </div>
  )
}