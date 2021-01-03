import React, { useState } from 'react'
import { cloneDeep } from 'lodash'

import NewProducto from '../productos/producto/NewProducto'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'

const PRODUCTO_EMPTY_BODY: NewProducto = {
  imagen: '',
  codigo: '',
  categoriaId: 1,
  ancho: 0,
  alto: 0,
  largo: 0,
  archivado: false,
  en_oferta: false
}

export default function UploadProducts() {
  const [newProducts, setNewProducts] = useState<Array<NewProducto>>([])

  const agregarProducto = () => {
    let currentArray = cloneDeep(newProducts)
    currentArray.push(PRODUCTO_EMPTY_BODY)
    setNewProducts(currentArray)
  }

  const modificarNewProducto = ({ field, value, index }: ModificarNewProductoArguments) => {
    let currentArray = cloneDeep(newProducts)
    // @ts-ignore
    currentArray[index][field] = value
    setNewProducts(currentArray)
  }

  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        startIcon={<AddIcon />}
        onClick={agregarProducto}
      >
        Agregar
      </Button>
      <Grid container spacing={0}>
        {newProducts.map((newProduct, index) =>
          <Grid item xs key={index}>
            <NewProducto
              producto={newProduct}
              productIndex={index}
              modificarNewProducto={modificarNewProducto}
            />
          </Grid>
        )}
      </Grid>
    </div>
  )
}