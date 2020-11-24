import React from 'react'
import moment from 'moment'
import styles from './ConsultaBox.module.css'

export default function ConsultaBox(props: Consulta) {
  return (
    <div className={styles.container}>
      <div>
        <span>Nombre completo</span>
        <span className='rightAligned'>{props.nombreCompleto}</span>
      </div>
      <div>
        <span>Email</span>
        <span className='rightAligned'>{props.email}</span>
      </div>
      <div>
        <span>Telefono</span>
        <span className='rightAligned'>{props.telefono}</span>
      </div>
      <div>
        <span>Fecha y hora</span>
        <span className='rightAligned'>{moment(props.fecha).format('DD/MM/YYYY')}</span>
      </div>
      <div>
        <span>Hora</span>
        <span className='rightAligned'>{moment(props.fecha).format('HH:mm[hs]')}</span>
      </div>
      <div>
        <p>Consulta</p>
        <p>{props.consulta}</p>
      </div>
    </div>
  )
}