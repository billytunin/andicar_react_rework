import React from 'react'
import styles from './AdminTools.module.css'
import AdminToolsLeyenda from './AdminToolsLeyenda'
import AdminToolsEstadoFilter from './AdminToolsEstadoFilter'
import AdminToolsActions from './AdminToolsActions'

export default function AdminTools() {
  return (
    <div className={styles.container}>
      <div className={`${styles.mainDivs} ${styles.adminTitle}`}>
        <span>ADMINISTRADOR</span>
      </div>
      <div className={`${styles.mainDivs}`}>
        <AdminToolsLeyenda />
      </div>
      <div className={`${styles.mainDivs} ${styles.filtroDeEstadoContainer}`}>
        <AdminToolsEstadoFilter />
      </div>
      <div className={`${styles.mainDivs}`}>
        <AdminToolsActions />
      </div>
    </div>
  )
}