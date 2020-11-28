import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { DEFAULT_PAGINADO } from '../../utils/constants'

const initialState: ProductosState = {
  productos: [],
  pagina: 1,
  paginado: DEFAULT_PAGINADO,
  currentTotal: 0,
  categoria: '',
  archivadosFilter: 0,
  categorias: []
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
    },
    setPaginado: (state, action: PayloadAction<number>) => {
      state.paginado = action.payload
    },
    setCategoria: (state, action: PayloadAction<string>) => {
      state.categoria = action.payload
    },
    setCategorias: (state, action: PayloadAction<Array<Categoria>>) => {
      state.categorias = action.payload
    },
    setArchivadosFilter: (state, action: PayloadAction<archivadosFilter>) => {
      state.archivadosFilter = action.payload
    }
  }
})

export const {
  setProductos,
  setPagina,
  setPaginado,
  setCurrentTotal,
  setCategoria,
  setCategorias,
  setArchivadosFilter
} = productosSlice.actions

export const getProductsFromState = (state: RootState) => state.productos.productos
export const getPaginaFromState = (state: RootState) => state.productos.pagina
export const getPaginadoFromState = (state: RootState) => state.productos.paginado
export const getCurrentTotalFromState = (state: RootState) => state.productos.currentTotal
export const getCurrentCategoriaFromState = (state: RootState) => state.productos.categoria
export const getCurrentCategoriasFromState = (state: RootState) => state.productos.categorias
export const getArchivadosFilter = (state: RootState) => state.productos.archivadosFilter
export const getCategoriaById = (id: string) => (state: RootState) => {
  const foundCategoria = state.productos.categorias.find(categoria => categoria.id === id)
  return foundCategoria ? foundCategoria.titulo : ''
}

export default productosSlice.reducer
