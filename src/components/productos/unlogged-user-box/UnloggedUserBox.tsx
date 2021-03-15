import React from 'react'

import styles from './UnloggedUserBox.module.css'

import NavigationButton from '../../navigation-button/NavigationButton'

interface UnloggedUserBoxProps {
  message: string
}

export default function UnloggedUserBox(props: UnloggedUserBoxProps) {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <span>{props.message}</span>
      </div>
      <NavigationButton text='INICIAR SESIÓN' url ='/session' />
    </div>
  )
}