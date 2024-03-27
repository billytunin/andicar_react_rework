import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import styles from './FlechasLlamativas.module.css'

import {
    setPagina,
    getPaginaFromState,
    getCurrentTotalFromState,
    getPaginadoFromState
} from '../../productos/productosSlice'

import Grid from '@material-ui/core/Grid'
import SVGBackArrow from '../../svg-arrows/BackArrow'
import SVGNextArrow from '../../svg-arrows/NextArrow'

export default function FlechasLlamativas() {
    const dispatch = useDispatch()

    const currentPagina = useSelector(getPaginaFromState)
    const currentTotal = useSelector(getCurrentTotalFromState)
    const currentPaginado = useSelector(getPaginadoFromState)
    const lastPage = Math.ceil(currentTotal / currentPaginado)

    if (lastPage <= 1) return null

    return (
        <Grid
            container
            spacing={0}
            className={styles.backAndNextContainer}
        >
            <Grid
                item
                xs={12}
                className={`${styles.svgArrowContainerText} textAlignCenter`}
            >
                <Grid
                    container
                    spacing={0}
                    alignItems='center'
                    style={{height: '100%'}}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <span>Sigue descubriendo productos</span>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
                xs={6}
                className={`${styles.svgBackArrowContainer} textAlignRight`}
            >
                {
                    currentPagina <= 1 ?
                        null
                        :
                        <SVGBackArrow
                            height='8rem'
                            width='8rem'
                            className='animationForBackSVGArrow'
                            handleClick={
                                () => dispatch(setPagina(currentPagina - 1))
                            }
                        />
                }
            </Grid>
            <Grid
                item
                xs={6}
                className={styles.svgNextArrowContainer}
            >
                {
                    currentPagina >= lastPage ?
                        null
                        :
                        <SVGNextArrow
                            height='8rem'
                            width='8rem'
                            className='animationForNextSVGArrow'
                            handleClick={
                                () => dispatch(setPagina(currentPagina + 1))
                            }
                        />
                }
            </Grid>
        </Grid>
    )
}