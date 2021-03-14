import React from 'react'
import AndicarSpan from '../andicar-span/AndicarSpan'

import styles from './Inicio.module.css'

export default function RightPaneText() {
  return (
    <p className={styles.infoText}>
      <AndicarSpan />.com.ar fue desarrollado en el año 2013 con el objetivo de reducir la distancia entre el cliente y la empresa, publicar los productos en la web para una visualizacion mas comoda e inmediata y crear una ruta de acceso directo hacia <AndicarSpan />. Con el advenimiento de la tecnología y los recursos distribuidos de hoy en dia, el desarrollo e implementacion general de un sitio web se transformaron en un pilar fundamental para cualquier emprendimiento.
      <br /><br />
      En el año 2020 trabajamos nuevamente en profundidad con el sitio y sus posibilidades para reconstruirlo y darle una mirada moderna a un emprendimiento veterano.
    </p>
  )
}