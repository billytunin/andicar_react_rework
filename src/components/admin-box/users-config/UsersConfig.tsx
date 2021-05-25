import React, { useState, useEffect } from 'react'
import ValidationInput from '../../validation-input/ValidationInput'
import Spinner from '../../spinner/Spinner'
import axios from '../../../utils/axios'
import styles from '../AdminBox.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'

import UserCredentials from './UserCredentials'

import {
  validationGroupHasErrors,
  setValidationGroupDirtyState,
  shakeInvalids
} from '../../validation-input/validationInputsSlice'

import Grid from '@material-ui/core/Grid'

import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'
import Alert from '@material-ui/lab/Alert'

const VALIDATION_GROUP_NAME = 'usersForm'

export default function UsersConfig() {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const formHasErrors = useSelector(validationGroupHasErrors(VALIDATION_GROUP_NAME))

  // const handleNewCredentialsDataChange = (field: string, value: string) => {
  //   setNewCredentialsData({ ...newCredentialsData, [field]: value })
  // }

  // const aplicarNuevasCredenciales = async () => {
  //   dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: true }))
  //   if (formHasErrors) {
  //     dispatch(shakeInvalids(VALIDATION_GROUP_NAME))
  //   } else {
  //     setIsLoading(true)
  //     try {
  //       await axios.post('/auth/changeCustomerCredentials', {
  //         user: newCredentialsData.user,
  //         pass: newCredentialsData.pass
  //       })
  //       enqueueSnackbar(
  //         'Credenciales cambiadas con éxito',
  //         { variant: 'success' }
  //       )
  //       dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: false }))
  //       setNewCredentialsData(initialState)
  //     } catch(error) {
  //       enqueueSnackbar(
  //         'Hubo un problema al intentar cambiar las credenciales. Por favor intente nuevamente',
  //         { variant: 'error' }
  //       )
  //     } finally {
  //       setIsLoading(false)
  //       getUsers()
  //     }
  //   }
  // }

  const getUsers = async () => {
    setIsLoading(true)
    try {
      const resp: GetUsersBackendResponse = await axios.get('/auth/users')
      setUsers(resp.data)
    } catch(error) {
      console.log('Hubo un error al intentar cargar los usuarios')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <Alert severity='info'>
        Configure las credenciales (usuario y contraseña) que desee sean usadas para iniciar sesión en el sitio.<br />
        Tenga en cuenta que las sesiones expiran luego de 3 días. Por lo tanto, si usted cambia las credenciales, los clientes que ya estaban logueados aún tendrán su sesión
        activa hasta que expire para ellos. Recién ahi, se les pedirá iniciar sesión nuevamente y deberán utilizar las nuevas credenciales.
      </Alert>
      <div className={`${styles.box} ${styles.usersConfigBox}`}>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            Usuario
          </Grid>
          <Grid item xs={3}>
            Contraseña
          </Grid>
          <Grid item xs>
            Precios visibles
          </Grid>
          <Grid item xs>
            Modificador de precio
          </Grid>
          <Grid item xs>
          </Grid>
        </Grid>
        {
          users.map((user, index) => <UserCredentials user={user} key={index} arrayIndex={index} />)
        }
      </div>
    </div>
  )
}