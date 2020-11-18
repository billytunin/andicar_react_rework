import React from 'react';
import styles from './AppFooter.module.css';
import moment from 'moment'
import AndicarSpan from '../andicar-span/AndicarSpan'

export default function AppFooter() {
  return (
    <div className={styles.appFooter}>
      <span>Diseño y desarrollo del sitio web bajo derechos de autor © Copyright {moment().format('YYYY')} <AndicarSpan /></span>
    </div>
  )
}