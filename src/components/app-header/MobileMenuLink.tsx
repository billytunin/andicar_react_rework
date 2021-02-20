import React from 'react'

import { NavLink, useRouteMatch } from 'react-router-dom'

import styles from './MobileMenu.module.css'

export default function MobileMenuLink(props: MobileMenuLinkProps) {
  const isActiveStyle = useRouteMatch({ path: props.pathObject.path, exact: props.pathObject.shouldBeExactPath }) ? styles.isActive : ''

  return (
    <div className={styles.mobileMenuLinkContainer}>
      <NavLink
        to={props.pathObject.path}
        exact={props.pathObject.shouldBeExactPath}
        onClick={() => props.closeModal()}
      >
        <div className={`${styles.mobileMenuLink} ${isActiveStyle} ${props.isLastItem ? styles.noBorderBottom : ''}`}>
          {props.pathObject.text}
        </div>
      </NavLink>
    </div>
  )
}