import React, { useState, useEffect } from 'react'
import Spinner from '../../spinner/Spinner'
import axios from '../../../utils/axios'
import styles from '../AdminBox.module.css'

import UserCredentials from './UserCredentials'

import Grid from '@material-ui/core/Grid'

import Alert from '@material-ui/lab/Alert'

export default function UsersConfig() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)

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
          isLoading ? <Spinner /> :
          users.map((user, index) => <UserCredentials user={user} key={index} arrayIndex={index} finishedSaving={() => getUsers()} />)
        }
      </div>
    </div>
  )
}