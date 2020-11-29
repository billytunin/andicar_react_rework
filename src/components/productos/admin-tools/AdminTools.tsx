import React from 'react'
import AdminToolsLeyenda from './AdminToolsLeyenda'
import AdminToolsEstadoFilter from './AdminToolsEstadoFilter'
import AdminToolsActions from './AdminToolsActions'

export default function AdminTools() {
  return (
    <div>
      <p>ADMINISTRADOR</p>
      <AdminToolsLeyenda />
      <AdminToolsEstadoFilter />
      <AdminToolsActions />
    </div>
  )
}