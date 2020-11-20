import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { userState } from '../../userStateSlice'

import Button from '@material-ui/core/Button'
import Paginador from '../productos/tools/Paginador'
import styles from './AppHeader.module.css'

export default function AppHeader() {
  const { isLoggedIn } = useSelector(userState)

  return (
    <div className={styles.headerContainer}>
      <NavLink to="/" exact>
        <Button variant="contained" color={useRouteMatch({ path: '/', exact: true }) ? 'primary' : 'default'}>
          INICIO
        </Button>
      </NavLink>
      <NavLink to="/productos">
        <Button variant="contained" color={useRouteMatch({ path: '/productos' }) ? 'primary' : 'default'}>
          PRODUCTOS
        </Button>
      </NavLink>
      <NavLink to="/contacto">
        <Button variant="contained" color={useRouteMatch({ path: '/contacto' }) ? 'primary' : 'default'}>
          CONTACTO
        </Button>
      </NavLink>
      <NavLink to="/session">
        <Button variant="contained" color={useRouteMatch({ path: '/session' }) ? 'primary' : 'default'}>
          SESIÓN
        </Button>
      </NavLink>
      {useRouteMatch({ path: '/productos' }) && isLoggedIn ? <Paginador /> : ''}
    </div>
  )
}