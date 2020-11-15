import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

const initialState: ProductosState = {
  productos: [],
  pagina: 0,
  paginado: 10
}

export const productosSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: {
    setProductos: (state, action: PayloadAction<Array<Producto>>) => {
      state.productos = action.payload
    },
    setPagina: (state, action: PayloadAction<number>) => {
      state.pagina = action.payload
    },
    setPaginado: (state, action: PayloadAction<number>) => {
      state.paginado = action.payload
    }
  }
})

export const { setProductos, setPagina, setPaginado } = productosSlice.actions

export const getProductsFromState = (state: RootState) => state.productos.productos
export const getPaginaFromState = (state: RootState) => state.productos.pagina
export const getPaginadoFromState = (state: RootState) => state.productos.paginado

export default productosSlice.reducer
