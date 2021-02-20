import React from 'react'

import { NavLink, useRouteMatch } from 'react-router-dom'

import styles from './AppHeader.module.css'

interface HeaderNavLinkProps {
  text: string
  path: string
  shouldBeExactPath?: boolean
}

export default function HeaderNavLink(props: HeaderNavLinkProps) {
  const isActiveStyle = useRouteMatch({ path: props.path, exact: props.shouldBeExactPath }) ? styles.isActive : ''
  return (
    <div className={styles.navLinkContainer}>
      <NavLink to={props.path} exact={props.shouldBeExactPath}>
        <div
          className={`${styles.headerNavLink} ${isActiveStyle}`}
        >
          {props.text}
        </div>
      </NavLink>
    </div>
  )
}