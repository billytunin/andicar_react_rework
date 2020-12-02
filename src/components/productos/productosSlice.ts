import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { DEFAULT_PAGINADO } from '../../utils/constants'

const initialState: ProductosState = {
  productos: [],
  pagina: 1,
  paginado: DEFAULT_PAGINADO,
  currentTotal: 0,
  categoria: '',
  productosStatusFilter: null,
  categorias: [],
  modifiedProductos: [],
  productoIdsToDelete: [],
  modificarProductosLoading: false
}

export const productosSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: {
    setProductos: (state, action: PayloadAction<Array<Producto>>) => {
      state.productos = action.payload
    },
    setCurrentTotal: (state, action: PayloadAction<number>) => {
      state.currentTotal = action.payload
    },
    setPagina: (state, action: PayloadAction<number>) => {
      state.pagina = action.payload
      state.modifiedProductos = []
    },
    setPaginado: (state, action: PayloadAction<number>) => {
      state.pagina = 1
      state.modifiedProductos = []
      state.paginado = action.payload
    },
    resetPaginacion: (state) => {
      state.pagina = 1
      state.paginado = DEFAULT_PAGINADO
    },
    setCategoria: (state, action: PayloadAction<string>) => {
      state.categoria = action.payload
    },
    setCategorias: (state, action: PayloadAction<Array<Categoria>>) => {
      state.categorias = action.payload
    },
    setProductosStatusFilter: (state, action: PayloadAction<productosStatusFilter>) => {
      state.productosStatusFilter = action.payload
    },
    addModifiedProducto: (state, action: PayloadAction<Producto>) => {
      const foundIndex = state.modifiedProductos.findIndex(producto => producto.id === action.payload.id)
      if (foundIndex === -1) {
        state.modifiedProductos.push(action.payload)
      } else {
        state.modifiedProductos[foundIndex] = action.payload
      }
    },
    removeModifiedProducto: (state, action: PayloadAction<number>) => {
      const foundIndex = state.modifiedProductos.findIndex(producto => producto.id === action.payload)
      if (foundIndex !== -1) {
        state.modifiedProductos.splice(foundIndex, 1)
      }
    },
    addProductoToDelete: (state, action: PayloadAction<number>) => {
      state.productoIdsToDelete.push(action.payload)
    },
    removeProductoToDelete: (state, action: PayloadAction<number>) => {
      const foundIndex = state.productoIdsToDelete.findIndex(productoId => productoId === action.payload)
      if (foundIndex !== -1) {
        state.productoIdsToDelete.splice(foundIndex, 1)
      }
    },
    resetProductoIdsToDelete: (state) => {
      state.productoIdsToDelete = []
    },
    setModificarProductosLoading: (state, action: PayloadAction<boolean>) => {
      state.modificarProductosLoading = action.payload
    },
    resetState: () => initialState
  }
})

export const {
  setProductos,
  setPagina,
  setPaginado,
  resetPaginacion,
  setCurrentTotal,
  setCategoria,
  setCategorias,
  setProductosStatusFilter,
  resetState,
  addModifiedProducto,
  removeModifiedProducto,
  addProductoToDelete,
  removeProductoToDelete,
  resetProductoIdsToDelete,
  setModificarProductosLoading
} = productosSlice.actions

export const getProductsFromState = (state: RootState) => state.productos.productos
export const getPaginaFromState = (state: RootState) => state.productos.pagina
export const getPaginadoFromState = (state: RootState) => state.productos.paginado
export const getCurrentTotalFromState = (state: RootState) => state.productos.currentTotal
export const getCurrentCategoriaFromState = (state: RootState) => state.productos.categoria
export const getCurrentCategoriasFromState = (state: RootState) => state.productos.categorias
export const getProductosStatusFilter = (state: RootState) => state.productos.productosStatusFilter
export const getModifiedProductos = (state: RootState) => state.productos.modifiedProductos
export const getModificarProductosLoading = (state: RootState) => state.productos.modificarProductosLoading
export const getProductoIdsToDelete = (state: RootState) => state.productos.productoIdsToDelete
export const getIsProductoToDelete = (id: number) => (state: RootState) => {
  const foundIndex = state.productos.productoIdsToDelete.findIndex(productoId => productoId === id)
  return foundIndex !== -1
}
export const getCategoriaById = (id: string) => (state: RootState) => {
  const foundCategoria = state.productos.categorias.find(categoria => categoria.id === id)
  return foundCategoria ? foundCategoria.titulo : ''
}

export default productosSlice.reducer
