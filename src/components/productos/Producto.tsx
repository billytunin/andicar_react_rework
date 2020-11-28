import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleProductosViewer } from '../productos-viewer/productosViewerSlice'

import { CDNEdgeUrl } from '../../utils/constants'
import styles from './Producto.module.css'

import { getCategoriaById } from './productosSlice'

export default function Producto(props: ProductoProps) {
  const dispatch = useDispatch()

  return (
    <div className={`${styles.productoContainer} ${props.archivado ? 'archivadoBackgroundColor' : 'nonArchivadoBackgroundColor'}`}>
      <img
        src={CDNEdgeUrl + props.imagen}
        alt={`Articulo ${props.codigo}`}
        onClick={
          () => dispatch(
              toggleProductosViewer({ isOpen: true, productoIndex: props.productIndex })
            )
        }
      />
      <div className={styles.lineInfo}>
        <span>Código:</span>
        <span className="rightAligned">{props.codigo}</span>
      </div>
      <div className={styles.lineInfo}>
        <span>Categoría:</span>
        <span className="rightAligned">{useSelector(getCategoriaById(props.categoriaId))}</span>
      </div>
      <div className={styles.lineInfo}>
        <span>Ancho:</span>
        <span className="rightAligned">{props.ancho} cm</span>
      </div>
      <div className={styles.lineInfo}>
        <span>Alto:</span>
        <span className="rightAligned">{props.alto} cm</span>
      </div>
      <div className={styles.lineInfo}>
        <span>Largo:</span>
        <span className="rightAligned">{props.largo} cm</span>
      </div>
    </div>
  )
}