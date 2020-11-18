import React from 'react';

import DoubleBox from '../double-box/DoubleBox'
import InformacionDeContacto from './InformacionDeContacto'
import Formulario from './Formulario'

export default function Contacto() {
  return (
    <div>
      <DoubleBox
        leftPane={<InformacionDeContacto />}
        rightPane={<Formulario />}
      />
    </div>
  )
}