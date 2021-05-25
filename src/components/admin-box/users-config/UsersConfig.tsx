import React, { useState, useEffect } from 'react'
import { cloneDeep } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import Spinner from '../../spinner/Spinner'
import axios from '../../../utils/axios'
import styles from '../AdminBox.module.css'

import {
  validationGroupHasErrors,
  setValidationGroupDirtyState,
  shakeInvalids
} from '../../validation-input/validationInputsSlice'

import UserCredentials from './UserCredentials'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save'
import Alert from '@material-ui/lab/Alert'

export default function UsersConfig() {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const VALIDATION_GROUP_NAME = 'userCredentialsForm'
  const formHasErrors = useSelector(validationGroupHasErrors(VALIDATION_GROUP_NAME))

  const [unsavedID, setUnsavedID] = useState(1)
  const [users, setUsers] = useState<User[]>([])
  const [usersToCreate, setUsersToCreate] = useState<User[]>([])
  const [usersToDelete, setUsersToDelete] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const modifyUser = (userObj: User, comesFromCreateMode: boolean) => {
    const currentUsersArray = cloneDeep(comesFromCreateMode ? usersToCreate : users)
    const userToModifyIndex = currentUsersArray.findIndex(userInArray => userInArray.id === userObj.id)
    currentUsersArray[userToModifyIndex] = userObj
    comesFromCreateMode ? setUsersToCreate(currentUsersArray) : setUsers(currentUsersArray)
  }

  const deleteUser = (userId: string | number, comesFromCreateMode: boolean) => {
    if (comesFromCreateMode) {
      removeUserFromCreateList(userId)
    } else {
      // @ts-ignore
      toggleUserFromDeleteList(userId)
    }
  }

  const toggleUserFromDeleteList = (userId: number) => {
    const currentUsersArray = cloneDeep(usersToDelete)
    const foundUserIdIndex = currentUsersArray.findIndex(userIdInArray => userIdInArray === userId)
    if (foundUserIdIndex === -1) {
      currentUsersArray.push(userId)
    } else {
      currentUsersArray.splice(foundUserIdIndex, 1)
    }

    setUsersToDelete(currentUsersArray)
  }

  const removeUserFromCreateList = (userId: string | number) => {
    const currentUsersArray = cloneDeep(usersToCreate)
    const foundUserIndex = currentUsersArray.findIndex(user => user.id === userId)
    if (foundUserIndex !== -1) {
      currentUsersArray.splice(foundUserIndex, 1)
    }

    setUsersToCreate(currentUsersArray)
  }

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

  const resetState = () => {
    setUsersToCreate([])
    setUsersToDelete([])
    setUnsavedID(1)
    getUsers()
  }

  const addUser = () => {
    setUsersToCreate([
      ...usersToCreate,
      {
        id: `UNSAVED_${unsavedID}`,
        user: '',
        password: '',
        priceVisibility: true,
        priceModifier: 1
      }
    ])

    setUnsavedID(unsavedID + 1)
  }

  const save = async () => {
    dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: true }))
    if (formHasErrors) {
      dispatch(shakeInvalids(VALIDATION_GROUP_NAME))
      return
    }

    if(duplicatedUsers()) {
      enqueueSnackbar(
        'Hay nombres de usuarios duplicados',
        { variant: 'error' }
      )
      return
    }

    const promises = users.map(userObj => axios.put('/auth/user', { userObj })).concat(
      usersToCreate.map(userObj => axios.post('/auth/user', { userObj }))
    )

    setIsLoading(true)
    try {
      // First perform create + update
      await Promise.all(promises)

      // Then perform deletes
      await Promise.all(usersToDelete.map(userId => axios.delete('/auth/user', { userId })))

      enqueueSnackbar(
        'Usuarios guardados con éxito',
        { variant: 'success' }
      )
      dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: false }))

      resetState()
    } catch (error) {
      const {
        message = 'Hubo un problema al intentar guardar los usuarios'
      } = axios.getErrorBody(error)
      enqueueSnackbar(
        message,
        { variant: 'error' }
      )
    } finally {
      setIsLoading(false)
    }
  }

  const duplicatedUsers = () => {
    let foundDuplicate = false
    const allUsers = users.concat(usersToCreate)
    allUsers.forEach(userObj => {
      const foundUser = allUsers.find(userInArray => userInArray.id !== userObj.id && userInArray.user === userObj.user)
      if (foundUser) {
        foundDuplicate = true
      }
    })

    return foundDuplicate
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <Alert severity='info'>
        Configure las credenciales (usuario y contraseña) que desee sean usadas para iniciar sesión en el sitio.<br />
        Tenga en cuenta que las sesiones expiran luego de 3 días. Por lo tanto, si usted cambia las credenciales, los clientes que ya estaban logueados aún tendrán su sesión
        activa hasta que expire para ellos. Recién ahi, se les pedirá iniciar sesión nuevamente y deberán utilizar las nuevas credenciales.
      </Alert>
      <div className={`${styles.box} ${styles.usersConfigBox}`}>
        {
          isLoading ? <Spinner /> :
          <div>
            <div className={styles.usersConfigBoxButtonContainer}>
              <Button
                variant='outlined'
                className='smallMarginRight'
                color='primary'
                startIcon={<AddIcon />}
                onClick={addUser}
              >
                Agregar
              </Button>
              <Button
                variant='contained'
                color='primary'
                startIcon={<SaveIcon />}
                onClick={save}
              >
                Guardar cambios
              </Button>
            </div>
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
                Eliminar
              </Grid>
            </Grid>
            {
              users.map(
                (user, index) =>
                <UserCredentials
                  validationGroupName={VALIDATION_GROUP_NAME}
                  user={user}
                  key={index}
                  markedAsDelete={!!usersToDelete.find(userIdInArray => userIdInArray === user.id)}
                  modifyUser={(userObj) => modifyUser(userObj, false)}
                  deleteUser={(userId) => deleteUser(userId, false)}
                />
              )
            }
            {
              usersToCreate.map(
                (user, index) =>
                <UserCredentials
                  validationGroupName={VALIDATION_GROUP_NAME}
                  user={user}
                  key={index}
                  isCreateUser
                  modifyUser={(userObj) => modifyUser(userObj, true)}
                  deleteUser={(userId) => deleteUser(userId, true)}
                />
              )
            }
          </div>
        }
      </div>
    </div>
  )
}