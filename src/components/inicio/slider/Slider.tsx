import React from 'react'
import { useSelector } from 'react-redux'

import Carousel from 'react-material-ui-carousel'
import Pic from './Pic'
import MobilePic from './MobilePic'

import { getInitialCheckState, getIsMobileVersion } from '../../../userStateSlice'

import { makeStyles, createStyles } from '@material-ui/core/styles'

const picContainerWidth = 1000
const picContainerHeight = 230
const mobilePicContainerWidth = window.innerWidth - 5
const mobilePicContainerHeight = 120

export default function Slider() {
  const isMobileVersion = useSelector(getIsMobileVersion)

  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        width: `${isMobileVersion ? mobilePicContainerWidth : picContainerWidth}px`,
        height: `${isMobileVersion ? (mobilePicContainerHeight + 30) : (picContainerHeight + 30)}px`,
        margin: 'auto',
        '& .picContainer': {
          position: 'relative',
          width: `${isMobileVersion ? mobilePicContainerWidth : picContainerWidth}px`,
          height: `${isMobileVersion ? mobilePicContainerHeight : picContainerHeight}px`,
          overflow: 'hidden'
        }
      }
    })
  )

  const classes = useStyles()
  const picNumbers = [1, 2, 3, 4]

  // This is a workaround to avoid "Can't perform a React state update on an unmounted component." warning.
  // When App.tsx is loading checking for isValidToken, it seems Carousel component gets rendered and unrendered asynchronously with
  // a timeout as it can be read here: https://github.com/Learus/react-material-ui-carousel/issues/44
  // In order to avoid that, we just render an empty DIV while "initialCheck" is still false
  const initialCheck = useSelector(getInitialCheckState)
  if (!initialCheck) {
    return <div></div>
  }

  return (
    <div className={classes.root}>
      <Carousel interval={8000}>
        {picNumbers.map(
          picNumber => isMobileVersion ? <MobilePic key={picNumber} picNumber={picNumber} /> : <Pic key={picNumber} picNumber={picNumber} />
        )}
      </Carousel>
    </div>
  )
}