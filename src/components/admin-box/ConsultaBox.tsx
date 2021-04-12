import React, { useState } from 'react'
import moment from 'moment'
import styles from './ConsultaBox.module.css'

export default function ConsultaBox(props: ConsultaBoxProps) {
  const [consultaSelected, setConsultaSelected] = useState(false)

  const selectConsulta = () => {
    const newSelectedValue = !consultaSelected
    if (newSelectedValue) {
      props.addConsultaToSelected(props.id)
    } else {
      props.removeConsultaFromSelected(props.id)
    }

    setConsultaSelected(newSelectedValue)
  }

  const selectedClass = props.showActiveConsultasMode ? styles.containerSelected : styles.containerSelectedForDelete

  return (
    <div
      className={`${styles.container} ${consultaSelected ? selectedClass : ''}`}
      onClick={selectConsulta}
    >
      <div>
        <span className={styles.caption}>Nombre completo</span>
        <span className='rightAligned'>{props.nombreCompleto}</span>
      </div>
      <div>
        <span className={styles.caption}>Email</span>
        <span className='rightAligned'>{props.email}</span>
      </div>
      <div>
        <span className={styles.caption}>Telefono</span>
        <span className='rightAligned'>{props.telefono || '-'}</span>
      </div>
      <div>
        <span className={styles.caption}>Fecha</span>
        <span className='rightAligned'>{moment(props.fecha).format('DD/MM/YYYY')}</span>
      </div>
      <div>
        <span className={styles.caption}>Hora</span>
        <span className='rightAligned'>{moment(props.fecha).format('HH:mm[hs]')}</span>
      </div>
      <div>
        <p>{props.consulta}</p>
      </div>
    </div>
  )
}