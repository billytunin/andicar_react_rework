import React from 'react'

import styles from './AdminBox.module.css'

import AdminBoxPanel from './AdminBoxPanel'

import UsersConfig from './users-config/UsersConfig'
import ConsultasList from './ConsultasList'
import ConfigurarCategorias from './configurar-categorias/ConfigurarCategorias'
import UploadProducts from './upload-products/UploadProducts'

export default function AdminBox() {
  const panels = [
    {
      text: 'Configurar Usuarios',
      component: <UsersConfig />
    },
    {
      text: 'Configurar Categorias',
      component: <ConfigurarCategorias />
    },
    {
      text: 'Cargar Productos',
      component: <UploadProducts />
    },
    {
      text: 'Ver Consultas',
      component: <ConsultasList />
    }
  ]

  return (
    <div className={styles.root}>
      {
        panels.map(panelObj =>
          <AdminBoxPanel key={panelObj.text} text={panelObj.text}>
            {panelObj.component}
          </AdminBoxPanel>
        )
      }
    </div>
  )
}