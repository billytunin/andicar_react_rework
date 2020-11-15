interface Producto {
  alto: number
  ancho: number
  largo: number
  archivado: boolean
  categoria: string
  codigo: string
  en_oferta: boolean
  id: number
  imagen: string
}

interface ProductosState {
  productos: Array<Producto>
  pagina: number
  paginado: number
}

interface ProductosBackendResponse {
  data: Array<Producto>
}