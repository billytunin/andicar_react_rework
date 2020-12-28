interface Categoria {
  id: number
  titulo: string
}

interface CategoriasBackendResponse {
  data: Array<Categoria>
}