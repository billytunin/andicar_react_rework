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

interface ProductoProps extends Producto {
  productIndex: number
}

interface ProductosState {
  productos: Array<Producto>
  pagina: number
  paginado: number
  currentTotal: number
  categoria: string
  archivadosFilter: archivadosFilter
  categorias: Array<Categoria>
}

/* archivadosFilter filters by product: 0 means return only actives, 1 means return only archivados, null means return both */
type archivadosFilter = 0 | 1 | null

interface ProductosBackendResponse {
  data: Array<Producto>
}

interface GetTotalBackendResponse {
  data: number
}