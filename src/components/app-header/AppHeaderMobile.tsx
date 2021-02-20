import React from 'react'

import styles from './AppHeader.module.css'

import logo from '../../assets/logo.png'

import Grid from '@material-ui/core/Grid'
import MobileMenu from './MobileMenu'

export default function AppHeaderMobile(props: AppHeaderMobileProps) {
  return (
    <div className={styles.headerContainer}>
      <Grid container>
        <Grid item xs={6}>
          <img src={logo} alt='logo' />
        </Grid>
        <Grid item xs={6}>
          <MobileMenu pathArray={props.pathArray} />
        </Grid>
      </Grid>
    </div>
  )
}