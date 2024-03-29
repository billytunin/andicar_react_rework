import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './BuscadorDeProductos.module.css'

import { getSearchFilter, setSearchFilter } from '../productosSlice'

import BuscadorDeProductosModal from './BuscadorDeProductosModal'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

export default function BuscadorDeProductos(props: BuscadorDeProductosProps) {
  const dispatch = useDispatch()
  const searchFilter = useSelector(getSearchFilter)

  const [searchText, setSearchText] = useState('')

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && searchText) {
      dispatch(setSearchFilter(searchText))
    }
  }

  useEffect(() => {
    setSearchText(searchFilter)
  }, [searchFilter])

  return (
    <div className={styles.container}>
      <TextField
        placeholder='Buscar'
        value={searchText}
        disabled={props.isDisabled}
        onChange={(event) => setSearchText(event.target.value)}
        onKeyPress={handleKeyPress}
        fullWidth={props.fullWidth}
        InputProps={{
          endAdornment:
            <InputAdornment position='end'>
              <IconButton
                className={styles.smallPaddingIcon}
                disabled={props.isDisabled || !searchText}
                onClick={() => dispatch(setSearchFilter(searchText))}
              >
                <SearchIcon />
              </IconButton>
              <BuscadorDeProductosModal isDisabled={props.isDisabled} />
            </InputAdornment>
        }}
      />
    </div>
  )
}