import React from 'react'
import { useSelector } from 'react-redux'

import { CDNEdgeUrl } from '../../utils/constants'
import styles from './Producto.module.css'

import { getCategoriaById } from './productosSlice'

export function Producto(props: Producto) {
  return (
    <div className={styles.productoContainer}>
      <img src={CDNEdgeUrl + props.imagen} alt={`Articulo ${props.codigo}`} />
      <div className={styles.lineInfo}>
        <span>Código:</span>
        <span className="float-right">{props.codigo}</span>
      </div>
      <div className={styles.lineInfo}>
        <span>Categoría:</span>
        <span className="float-right">{useSelector(getCategoriaById(props.categoriaId))}</span>
      </div>
      <div className={styles.lineInfo}>
        <span>Ancho:</span>
        <span className="float-right">{props.ancho} cm</span>
      </div>
      <div className={styles.lineInfo}>
        <span>Alto:</span>
        <span className="float-right">{props.alto} cm</span>
      </div>
      <div className={styles.lineInfo}>
        <span>Largo:</span>
        <span className="float-right">{props.largo} cm</span>
      </div>
    </div>
  )
}