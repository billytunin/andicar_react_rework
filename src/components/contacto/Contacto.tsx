import React from 'react';

import styles from './Contacto.module.css'

import DoubleBox from '../double-box/DoubleBox'
import InformacionDeContacto from './InformacionDeContacto'
import Formulario from './Formulario'

export default function Contacto() {
  return (
    <div className={styles.container}>
      <DoubleBox
        leftPane={<InformacionDeContacto />}
        rightPane={<Formulario />}
      />
    </div>
  )
}