import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Pic from './Pic'
import MobilePic from './MobilePic'

import { makeStyles, createStyles } from '@material-ui/core/styles'

const picContainerWidth = 1000
const picContainerHeight = 230

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: `${picContainerWidth}px`,
      height: `${picContainerWidth + 30}px`,
      margin: 'auto',
      '& .picContainer': {
        position: 'relative',
        width: `${picContainerWidth}px`,
        height: `${picContainerHeight}px`,
        overflow: 'hidden'
      }
    }
  })
)

export default function Slider() {
  const classes = useStyles()
  const isMobile = window.innerWidth < 769
  const picNumbers = [1, 2, 3, 4]

  return (
    <div className={classes.root}>
      <Carousel autoPlay={false}>
        {picNumbers.map(
          picNumber => isMobile ? <MobilePic key={picNumber} picNumber={picNumber} /> : <Pic key={picNumber} picNumber={picNumber} />
        )}
      </Carousel>
    </div>
  )
}