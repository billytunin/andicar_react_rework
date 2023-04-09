import React from 'react'
import pic from '../../../assets/slider/mobile/pic.jpg'
import pic2 from '../../../assets/slider/mobile/pic2.jpg'
import pic3 from '../../../assets/slider/mobile/pic3.jpg'
import pic4 from '../../../assets/slider/mobile/pic4.jpg'
import pic5 from '../../../assets/slider/mobile/pic5.jpg'

import styles from './Pic.module.css'

export default function MobilePic(props: PicProps) {
  let picToUse
  switch(props.picNumber) {
    case 2:
      picToUse = pic2
      break
    case 3:
      picToUse = pic3
      break
    case 4:
      picToUse = pic4
      break
    case 5:
      picToUse = pic5
      break
    default:
      picToUse = pic
      break
  }
  return (
    <div className='picContainer'>
      <img src={picToUse} alt='slider-pic' className={styles.image} />
    </div>
  )
}