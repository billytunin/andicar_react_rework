import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Paginador from '../productos/tools/Paginador'
import styles from './AppHeader.module.css'

export default function AppHeader() {
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
      <NavLink to="/login">
        <Button variant="contained" color={useRouteMatch({ path: '/login' }) ? 'primary' : 'default'}>
          INGRESAR
        </Button>
      </NavLink>
      {useRouteMatch({ path: '/productos' }) ? <Paginador /> : ''}
    </div>
  )
}