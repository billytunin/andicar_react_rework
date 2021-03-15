import React from 'react'

import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'

import styles from './NavigationButton.module.css'

interface NavigationButtonProps {
  url: string
  text: string
}

export default function NavigationButton(props: NavigationButtonProps) {
  return (
    <NavLink to={props.url} className={styles.noTextDecoration}>
      <Button variant="contained" color='primary'>
        {props.text}
      </Button>
    </NavLink>
  )
}