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

interface ProductosState {
  productos: Array<Producto>
  pagina: number
  paginado: number
  currentTotal: number
  categoria: string,
  categorias: Array<Categoria>
}

interface ProductosBackendResponse {
  data: Array<Producto>
}

interface GetTotalBackendResponse {
  data: number
}