import React from 'react'

import { useSelector } from 'react-redux'

import { getIsMobileVersion } from '../../userStateSlice'

import { NavLink, useRouteMatch } from 'react-router-dom'

import styles from './AppHeader.module.css'

interface HeaderNavLinkProps {
  text: string
  path: string
  shouldBeExactPath?: boolean
}

export default function HeaderNavLink(props: HeaderNavLinkProps) {
  const isMobileVersion = useSelector(getIsMobileVersion)
  const isActiveStyle = useRouteMatch({ path: props.path, exact: props.shouldBeExactPath }) ? styles.isActive : ''
  const smallerFontSizeStyle = isMobileVersion && props.path === '/productos' ? styles.smallerFontSize : ''
  return (
    <div className={styles.navLinkContainer}>
      <NavLink to={props.path} exact={props.shouldBeExactPath}>
        <div
          className={`${styles.headerNavLink} ${isActiveStyle} ${smallerFontSizeStyle}`}
        >
          {props.text}
        </div>
      </NavLink>
    </div>
  )
}