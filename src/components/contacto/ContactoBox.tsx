import React from 'react';

import { InformacionDeContacto } from './InformacionDeContacto'
import { Formulario } from './Formulario'
import styles from './ContactoBox.module.css'

interface ContactoBoxProps {
  id?: string
}

export function ContactoBox(props: ContactoBoxProps) {
  const isFormulario = props.id === 'formulario'
  return (
    <div className={`${styles.contactoBox} ${isFormulario ? styles.withBorder : ''}`}>
      {isFormulario ? <Formulario /> : <InformacionDeContacto /> }
    </div>
  )
}