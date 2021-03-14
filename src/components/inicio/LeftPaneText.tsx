import React from 'react'
import AndicarSpan from '../andicar-span/AndicarSpan'

import styles from './Inicio.module.css'

export default function LeftPaneText() {
  return (
    <p className={styles.infoText}>
      <AndicarSpan /> es, ante todo, una empresa enteramente familiar. Dio sus comienzos por el año 1970. El puntapie inicial fue Tomás Heller, un inmigrante húngaro que sabía manejarse en el campo del comercio. Comenzó como viajante de juguetes y así comenzó la historia <span className={styles.highlight}>familiar juguetera</span>.<br />
      Hacia 1990 nació <AndicarSpan />, como importadora, hasta nuestros días. Fuimos creciendo, y desarrollando nuevos horizontes. Considerando siempre que nuestro mayor énfasis estuvo y está en brindar <span className={styles.highlight}>el mejor servicio al cliente</span>. Estar siempre en contacto, personalmente, con la necesidad de cada uno de ellos.
      <br /><br />
      Siempre nos dedicamos al mismo rubro: <span className={styles.highlight}>juguetes</span>. Mantenemos la vanguardia ofreciendo novedades, estando pendientes de los cambios en las tendencias y, sobre todo, enfocando nuestra empresa en el feedback con nuestra clientela. Entendiendo sus <span className={styles.highlight}>necesidades</span>, ya que es ella nuestro mayor capital.
    </p>
  )
}