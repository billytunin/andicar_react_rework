interface Producto {
  alto: number
  ancho: number
  largo: number
  archivado: boolean
  categoriaId: string
  codigo: string
  en_oferta: boolean
  id: number
  imagen: string
}

interface ProductoProps {
  producto: Producto
  productIndex: number
}

interface ProductosState {
  productos: Array<Producto>
  pagina: number
  paginado: number
  currentTotal: number
  categoria: string
  productosStatusFilter: productosStatusFilter
  categorias: Array<Categoria>
  modifiedProductos: Array<Producto>
  productoIdsToDelete: Array<number>
  getProductsLoading: boolean
  modificarProductosLoading: boolean
  searchFilter: string
}

/* productosStatusFilter filters products by status.
 * 'archivados' means return only archivados, 'both' means return both activos and archivados, null means return only activos
*/
type productosStatusFilter = 'archivados' | 'both' | null

interface ProductosBackendResponse {
  data: {
    items: Array<Producto>
    total: number
  }
}