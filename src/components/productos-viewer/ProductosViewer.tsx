import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import { getProductsFromState } from '../productos/productosSlice'
import { toggleProductosViewer, productosViewerState, next, prev } from './productosViewerSlice'

import { CDNEdgeUrl } from '../../utils/constants'

import { useDrag } from 'react-use-gesture'

import EnOfertaSpan from '../productos/producto/EnOfertaSpan'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import ArrowForward from '@material-ui/icons/ArrowForward'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Fade from '@material-ui/core/Fade'
import Backdrop from '@material-ui/core/Backdrop'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      outline: 0,
      height: '100%',
      '& img': {
        'max-height': '90vh',
        'max-width': '90vw',
        'border-radius': '10px'
      },
      '& .MuiSvgIcon-root': {
        'font-size': '40px'
      }
    },
    navigationButtons: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      transition: 'background-color 400ms',
      marginLeft: '3vw',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 1)'
      },
      '&.isRightButton': {
        marginLeft: 0,
        marginRight: '3vw',
        float: 'right'
      },
      '&.Mui-disabled': {
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
      }
    },
    closeButton: {
      color: 'white',
      'vertical-align': 'top',
      '& .MuiSvgIcon-root': {
        fontSize: '50px'
      }
    },
    imgGrid: {
      textAlign: 'center',
      '& .imageContainer': {
        position: 'relative',
        display: 'inline'
      }
    }
  })
)

export default function ProductosViewer() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [{ x }, setSpringObj] = useSpring(() => ({ x: 0 }))

  const productos = useSelector(getProductsFromState)
  const { isOpen, productoIndex } = useSelector(productosViewerState)

  const handleClose = () => {
    dispatch(toggleProductosViewer({ isOpen: false }))
  }

  const isFirstProducto = useCallback(() => {
    return productoIndex === 0
  }, [productoIndex])
  const isLastProducto = useCallback(() => {
    return productoIndex === productos.length - 1
  }, [productoIndex, productos])

  const dragBinding = useDrag(({ down, movement: [mx, my] }) => {
    setSpringObj({ x: down ? mx : 0 })
    if (!down && mx < -8 && !isLastProducto()) {
      dispatch(next())
    }
    if (!down && mx > 8 && !isFirstProducto()) {
      dispatch(prev())
    }
  })

  const eventHandler = useCallback((event) => {
    if (event.code === 'ArrowLeft' && !isFirstProducto()) {
      dispatch(prev())
    }
    if (event.code === 'ArrowRight' && !isLastProducto()) {
      dispatch(next())
    }
  }, [dispatch, isFirstProducto, isLastProducto])

  useEffect(() => {
    document.addEventListener('keydown', eventHandler, false);

    return () => {
      document.removeEventListener('keydown', eventHandler, false);
    }
  }, [eventHandler])

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      disableBackdropClick
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={isOpen}>
        <Grid container className={classes.container} alignItems='center'>
          <Grid item xs>
            <Grid container alignItems='center'>
              <Grid item xs={1}>
                <IconButton
                  aria-label="go-left-productos-viewer"
                  className={classes.navigationButtons}
                  onClick={() => dispatch(prev())}
                  disabled={isFirstProducto()}
                >
                  <ArrowBack />
                </IconButton>
              </Grid>
              <Grid item xs className={classes.imgGrid}>
                <animated.div {...dragBinding()} style={{ touchAction: 'none', x }}>
                  <div className='imageContainer'>
                    <img src={CDNEdgeUrl + productos[productoIndex].imagen} alt='juguete' />
                    {productos[productoIndex].en_oferta ? <EnOfertaSpan isOnProductosViewer={true} /> : undefined}
                  </div>
                  <IconButton
                    className={classes.closeButton}
                    aria-label="close-productos-viewer"
                    onClick={handleClose}
                  >
                    <CancelIcon />
                  </IconButton>
                </animated.div>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  aria-label="go-right-productos-viewer"
                  className={classes.navigationButtons + ' isRightButton'}
                  onClick={() => dispatch(next())}
                  disabled={isLastProducto()}
                >
                  <ArrowForward />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  )
}