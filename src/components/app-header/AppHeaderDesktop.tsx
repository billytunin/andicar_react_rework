import React from 'react'
import logo from '../../assets/logo.png'

import HeaderNavLink from './HeaderNavLink'
import styles from './AppHeader.module.css'

import Grid from '@material-ui/core/Grid'

export default function AppHeaderDesktop(props: AppHeaderDesktopProps) {
  return (
    <div className={styles.headerContainer}>
      <Grid container>
        <Grid item xs={2}>
          <img src={logo} alt='logo' />
        </Grid>
        <Grid item xs={8}>
          <Grid container>
            {
              props.pathArray.map(
                pathObject => 
                  <Grid item xs={3} key={pathObject.path}>
                    <HeaderNavLink text={pathObject.text} path={pathObject.path} shouldBeExactPath={pathObject.shouldBeExactPath} />
                  </Grid>
              )
            }
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  )
}