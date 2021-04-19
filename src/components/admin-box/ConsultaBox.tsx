import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import styles from './ConsultaBox.module.css'

import { getIsMobileVersion } from '../../userStateSlice'

export default function ConsultaBox(props: ConsultaBoxProps) {
  const isMobileVersion = useSelector(getIsMobileVersion)

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
        {
          isMobileVersion ?
          <div className={styles.mobileConsultaRow}>{props.nombreCompleto}</div> :
          <span className='rightAligned'>{props.nombreCompleto}</span>
        }
      </div>
      <div>
        <span className={styles.caption}>Email</span>
        {
          isMobileVersion ?
          <div className={styles.mobileConsultaRow}>{props.email}</div> :
          <span className='rightAligned'>{props.email}</span>
        }
      </div>
      <div>
        <span className={styles.caption}>Telefono</span>
        {
          isMobileVersion ?
          <div className={styles.mobileConsultaRow}>{props.telefono || '-'}</div> :
          <span className='rightAligned'>{props.telefono || '-'}</span>
        }
      </div>
      <div>
        <span className={styles.caption}>Fecha</span>
        {
          isMobileVersion ?
          <div className={styles.mobileConsultaRow}>{moment(props.fecha).format('DD/MM/YYYY')}</div> :
          <span className='rightAligned'>{moment(props.fecha).format('DD/MM/YYYY')}</span>
        }
      </div>
      <div>
        <span className={styles.caption}>Hora</span>
        {
          isMobileVersion ?
          <div className={styles.mobileConsultaRow}>{moment(props.fecha).format('HH:mm[hs]')}</div> :
          <span className='rightAligned'>{moment(props.fecha).format('HH:mm[hs]')}</span>
        }
      </div>
      <div>
        <p>{props.consulta}</p>
      </div>
    </div>
  )
}